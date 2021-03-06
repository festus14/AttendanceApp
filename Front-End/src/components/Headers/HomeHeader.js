import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AppStyles } from '../../utility/AppStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomeHeader = ({ onLeftPress }) => {
  return (
    <View style={[styles.container]}>
      <View style={{ width: "30%", marginLeft: '3%', marginRight: "10%", alignContent:"center" }}>
        <TouchableOpacity style={{width: "30%", marginLeft: '3%',
            marginVertical: "18%",
            marginRight: '30%'}}
          onPress={onLeftPress}
        >
          <Icon style={{
            textAlign: 'left', fontSize: 25}}
            name="align-justify" size={40} color="grey" ></Icon>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: '4.5%',
          fontWeight: 'bold',
          color: '#800020',
          fontSize: 20,
        }}>
        Home
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    borderWidth: 2,
    borderColor: 'lightgrey',
    display: 'flex',
    flexDirection: 'row',
    width: "100%"
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
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
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
});
