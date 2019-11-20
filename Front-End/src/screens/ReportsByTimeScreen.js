import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  BackHandler,
  Modal
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppStyles } from '../AppStyles';
import { SwipeListView } from 'react-native-swipe-list-view';
import { connect } from 'react-redux';

export default class ReportsByTimeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      mode: 'date',
      showStart: false,
      showEnd: false,
      listViewData: ["ojinh", "whii", "OWEJFIO", "QOJEIfwh", "qjehwfi"],
      getReportedSubmitted: false,
      modalVisible: false
    }
  }

  setStartDate = (event, startDate) => {
    startDate = startDate || this.state.startDate;
    this.setState({
      showStart: !this.state.showStart,
      startDate,
    });
  }

  setEndDate = (event, endDate) => {
    endDate = endDate || this.state.endDate;
    this.setState({
      showEnd: !this.state.showEnd,
      endDate,
    });
  }

  show = (mode, dateType) => {
    if (dateType === "start") {
      this.setState({
        showStart: true,
        mode: mode,
      });
    }
    else {
      this.setState({
        showEnd: true,
        mode: mode,
      });
    }

  }

  datepicker = (dateType) => {
    this.show('date', dateType);
  }

  timepicker = (dateType) => {
    this.show('time', dateType);
  }

  getReport = () => {
    this.setState({
      getReportedSubmitted: true
    })
  }

  toggleUserScanDetail = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }


  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = async () => {
    await this.props.navigation.goBack();
  };

  render() {
    const { showStart, showEnd, startDate, endDate, mode, getReportedSubmitted, modalVisible } = this.state;
    return (
      <View>
        {!getReportedSubmitted && <View>
          <View>
            <Text style={{ textAlign: "center", color: "#800020", fontWeight: "bold", fontSize: 20 }}>Select start date and time</Text>
            <View style={{ display: "flex", flexDirection: "row", margin: 3, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => { this.datepicker("start") }} style={{ textAlign: "left", borderWidth: 2, borderColor: "lightgray", padding: 3 }}>
                <Text>
                  Show date picker
              </Text>
              </TouchableOpacity>
              <Text style={{ paddingRight: "3%" }}>
                {startDate.toDateString()}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", margin: 3, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => { this.timepicker("start") }} style={{ textAlign: "left", borderWidth: 2, borderColor: "lightgray", padding: 3 }}>
                <Text>
                  Show time picker
            </Text>
              </TouchableOpacity>
              <Text style={{ paddingRight: "3%" }}>
                {startDate.toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <Text style={{ textAlign: "center", color: "#800020", fontWeight: "bold", fontSize: 20 }}>Select end date and time</Text>
          <View style={{ display: "flex", flexDirection: "row", margin: 3, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => { this.datepicker("end") }} style={{ textAlign: "left", borderWidth: 2, borderColor: "lightgray", padding: 3 }}>
              <Text>
                Show date picker
              </Text>
            </TouchableOpacity>
            <Text style={{ paddingRight: "3%" }}>
              {endDate.toDateString()}
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", margin: 3, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => { this.timepicker("end") }} style={{ textAlign: "left", borderWidth: 2, borderColor: "lightgray", padding: 3 }}>
              <Text>
                Show time picker
            </Text>
            </TouchableOpacity>
            <Text style={{ paddingRight: "3%" }}>
              {endDate.toLocaleTimeString()}
            </Text>
          </View>
          <TouchableOpacity style={styles.ButtonContainer} onPress={this.getReport}>
            <Text style={{ color: "white", textAlign: "center" }}>Get Report</Text>
          </TouchableOpacity>
        </View>

        }
        {getReportedSubmitted && <SwipeListView
          data={this.state.listViewData}
          keyExtractor={(data, rowMap) => rowMap.toString()}
          renderItem={(data, rowMap) => (
            <TouchableOpacity>
              <View style={styles.rowFront}>
                <Text style={{ color: "white" }} onPress={this.toggleUserScanDetail}>
                  I am {data.item} in a SwipeListView
                </Text>
              </View>
            </TouchableOpacity>
          )}

        />}
        {showStart && <DateTimePicker value={startDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={this.setStartDate}
        />
        }
        {showEnd && <DateTimePicker value={endDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={this.setEndDate}
        />
        }
        {modalVisible && <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.toggleUserScanDetail}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{
              justifyContent: 'center', alignItems: 'center', width: "80%",
              height: "30%", borderRadius: 50,
              borderWidth: 1, padding: 10, margin: 10, backgroundColor: "grey"
            }}>
              <Text style={{ color: "white" }}>Hello World!</Text>
            </View>
          </View>
        </Modal>
        }
      </View>

    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: '#800020',
  },
  buttonTouchable: {
    padding: 16,
  },
  ButtonContainer: {
    width: 250,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    margin: "10%",
    alignSelf: "center"
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#800020',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    marginBottom: "4%",
    marginTop: "3%"
  },
});