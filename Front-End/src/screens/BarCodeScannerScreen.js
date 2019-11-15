import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  BackHandler,
  Linking,
} from 'react-native';
import {AppStyles} from '../AppStyles';
import {connect} from 'react-redux';

export default class BarCodeScanner extends Component {
  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err),
    );
  };
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

  _signOutAsync = async () => {
    // await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>
          This is the BarCode Scanner page{' '}
        </Text>{' '}
        <View style={styles.scannerBox}></View>{' '}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: 'black',
    marginTop: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    marginBottom: 20,
  },
  leftTitle: {
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 20,
  },
  loginContainer: {
    width: 250,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
    textAlign: 'center',
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  body: {
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text,
  },
  scannerBox: {
    marginTop: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    width: '80%',
    height: '50%',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
