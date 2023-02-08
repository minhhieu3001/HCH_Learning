import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Point from '../Common/Point';

const WIDTH = Dimensions.get('window').width;

export default function AccountTop() {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: WIDTH,
        height: 55,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingRight: 10,
      }}>
      <Text
        style={{color: 'black', fontSize: 25, left: 10, alignSelf: 'center'}}>
        Tài khoản
      </Text>
      <Point />
    </View>
  );
}
