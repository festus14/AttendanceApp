import React, { Component } from 'react';
import {
  Text,
  View,
  BackHandler,
  DrawerLayoutAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { HomeHeader } from '../components/Headers/HomeHeader';
import Drawer from '../navigations/sideDrawer';
import { connect } from 'react-redux';
import { logOut } from '../actions/AuthAction';
import { getScanLogsPerUser, getAllRoles } from "../actions/index";
import { ActivityIndicator } from 'react-native-paper';
import { NavigationEvents } from 'react-navigation';
import moment from 'moment';
import { getErrorMessage } from '../actions/errorMessages';
import { getToken } from "../actions/AuthAction";
import { getRolesById } from "../actions/getDetailsById";
import AuthLoadingScreen from './AuthLoadingScreen';

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(logOut()),
    getLogsPerUser: (formData) => {
      let param = formData.from + "&to=" + formData.to + "&user_id=" + formData.user_id + "&param="
      return dispatch(getScanLogsPerUser(null, 'logs/user_logs/?from=' + param, 'get'))
    },
    getCreatedRoles: () => {
      return dispatch(getAllRoles('roles', "get"))
    },
    getUser: () => {
      return dispatch(getToken());
    }
  }
}

const mapStateToProps = state => ({
  userLogs: state.getUserScanLogs,
  allRoles: state.getRoles,
  user: state.authReducer.user
})

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
      userInfo: {},
      refreshing: false,
      componentJustMounted: false,
      hasGenRights: false,
      hasOtherRights: false
    };
  }

  componentHasMounted = async () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    let roles = await this.props.getCreatedRoles();
    let user = await this.props.getUser();
    let formData = {
      "from": new Date("Sat Jan 03 1970 10:10:00 GMT+0100 (WAT)").getTime(),
      "to": new Date().getTime(),
      "user_id": this.props.user.id
    }

    if (roles) {
      let userLog = await this.props.getLogsPerUser(formData);
      if (userLog) {
        this.setState({
          ...this.props.userLogs.userScanLogs
        })
        this.isAGenerator();
      }
      else {
        alert("An error occured while starting application: " + "\n" + "\n" + getErrorMessage(this.props.userLogs.error))
      }
    }
    else {
      alert("An error occured while starting application: " + "\n" + "\n" + getErrorMessage(this.props.allRoles.error))
    }
    this.setState({
      componentJustMounted: true
    });
  }

  async componentDidMount() {
    if (!this.state.componentJustMounted) {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBackButtonClick,
      );

      let roles = await this.props.getCreatedRoles();
      let user = await this.props.getUser();
      console.log(this.props.user, "wajev;o")
      let formData = {
        from: new Date(' Sat Jan 03 1970 00:00:00 GMT+0100 (WAT)').getTime(),
        to: new Date().getTime(),
        user_id: this.props.user.id,
      };

      if (roles) {
        let userLog = await this.props.getLogsPerUser(formData);
        console.log(this.props.allRoles, this.props.userLogs.userScanLogs)
        if (userLog) {
          this.setState({
            ...this.props.userLogs.userScanLogs
          })
          this.isAGenerator();
        }
        else {
          alert("An error occured while starting application: " + "\n" + "\n" + getErrorMessage(this.props.userLogs.error))
        }
      }
      else {
        alert("An error occured while starting application: " + "\n" + "\n" + getErrorMessage(this.props.allRoles.error))
      }
      this.setState({
        componentJustMounted: true
      });
    }
  }


  capitalizeFirstLetter = input => {
    let result = input.charAt(0).toUpperCase() + input.slice(1);
    return result;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack();
  };

  toggleDrawer = async () => {
    let roles = await this.props.getCreatedRoles();
    if (roles) {
      // console.log(this.props.allRoles, "all")
      if (this.state.drawerOpen) {
        this.refs['DRAWER'].closeDrawer();
        this.setState({
          drawerOpen: false,
        });
      } else {
        this.refs['DRAWER'].openDrawer();
        this.setState({
          drawerOpen: true,
        });
      }
    }
  };

  isAGenerator = () => {
    let user_roles = getRolesById(this.props.user.roleIds, this.props.allRoles.appRoles);
    if (user_roles.includes("GENERATOR")) {
      this.setState({ hasGenRights: true })
    }
    else if (user_roles.length > 0 && !user_roles.includes("GENERATOR")) {
      this.setState({ hasOtherRights: true })
    }
  }


  waitForRefresh = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentHasMounted();
    this.waitForRefresh(3000).then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={{justifyContent: 'center', flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            colors={['#800020']}
          />
        }>
        <NavigationEvents onWillFocus={this.componentHasMounted} />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition="left"
            style={{flex: 1, zIndex: 1000}}
            ref={'DRAWER'}
            renderNavigationView={() => {
              return (
                <Drawer
                  propss={this.props}
                  roles={this.props.allRoles}
                  hasGenRights={this.state.hasOtherRights}
                />
              );
            }}>
            <HomeHeader
              onLeftPress={this.toggleDrawer}
              componentProps={this.props}
            />
          </DrawerLayoutAndroid>
          {this.props.userLogs.success && (
            <View
              style={{
                width: '100%',
                backgroundColor: '#800020',
                alignSelf: 'center',
                position: 'absolute',
                marginHorizontal: '15%',
                marginBottom: '10%',
                borderRadius: 20,
                paddingLeft: '3%',
                paddingRight: '3%',
                paddingTop: '5%',
                paddingBottom: '10%',
                zIndex: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  textAlign: 'center',
                  borderBottomColor: 'white',
                  borderBottomWidth: 0.5,
                  paddingBottom: '2%',
                  fontWeight: 'bold',
                  marginBottom: '5%',
                  marginTop: '10%',
                  marginLeft: '4%',
                  marginRight: '4%',
                }}>
                {this.capitalizeFirstLetter(
                  this.props.userLogs.userScanLogs.user.firstName,
                ) +
                  ' ' +
                  this.capitalizeFirstLetter(
                    this.props.userLogs.userScanLogs.user.lastName,
                  )}
              </Text>
              {this.state.hasOtherRights && (
                <View style={{padding: '5%', marginTop: '5%'}}>
                  <Text
                    style={{fontSize: 14, marginBottom: '3%', color: 'white'}}>
                    {'Number of Days Absent: ' +
                      this.props.userLogs.userScanLogs.absentDays}
                  </Text>
                  <Text
                    style={{fontSize: 14, marginBottom: '3%', color: 'white'}}>
                    {'Number of Days Present: ' +
                      this.props.userLogs.userScanLogs.presentDays}
                  </Text>
                  <Text
                    style={{fontSize: 14, marginBottom: '3%', color: 'white'}}>
                    {'Number of Hours Worked: ' +
                      this.props.userLogs.userScanLogs.hours}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: '3%',
                        color: 'white',
                      }}>
                      {this.props.userLogs.userScanLogs.daysSinceResumption > 0
                        ? 'Percentage present: ' +
                          Math.round(
                            (this.props.userLogs.userScanLogs.presentDays /
                              this.props.userLogs.userScanLogs
                                .daysSinceResumption) *
                              100,
                          ) +
                          '%'
                        : 'Percentage present: ' + 0 + '%'}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 14,
                        marginBottom: '3%',
                        color: 'white',
                      }}>
                      {this.props.userLogs.userScanLogs.daysSinceResumption > 0
                        ? 'Percentage absent: ' +
                          Math.round(
                            (this.props.userLogs.userScanLogs.absentDays /
                              this.props.userLogs.userScanLogs
                                .daysSinceResumption) *
                              100,
                          )
                        : 'Percentage absent: ' + 0 + '%'}
                    </Text>
                  </View>
                  <Text
                    style={{fontSize: 14, marginBottom: '3%', color: 'white'}}>
                    {this.props.userLogs.userScanLogs.inside
                      ? 'Current Location: In office'
                      : 'Current Location: Out of office'}
                  </Text>
                  <Text
                    style={{fontSize: 14, marginBottom: '3%', color: 'white'}}>
                    {this.props.userLogs.userScanLogs.lastLog === null
                      ? 'Last sign time: You have never been present'
                      : 'Last sign time: ' +
                        moment(
                          this.props.userLogs.userScanLogs.lastLog.createdAt,
                        ).toString()}
                  </Text>
                </View>
              )}
              {this.state.hasGenRights && (
                <View>
                  <Text style={{color: 'white', fontSize: 20}}>
                    Generates the barcode.
                  </Text>
                </View>
              )}
            </View>
          )}
          {this.props.userLogs.loading && (
            <View
              style={{justifyContent: 'center', flex: 1, position: 'absolute'}}>
              <ActivityIndicator
                size="large"
                style={{flex: 1, marginHorizontal: '40%'}}
                color="#800020"
              />
            </View>
          )}
          {this.props.userLogs.error !== null &&
            this.props.userLogs.loading === false &&
            this.props.userLogs.error !== undefined && (
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 0,
                  position: 'absolute',
                  margin: '10%',
                }}>
                <Text
                  style={{
                    fontSize: 21,
                    color: '#800020',
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {getErrorMessage(this.props.userLogs.error.toString()) +
                    ', please try again.'}
                </Text>
              </View>
            )}
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
