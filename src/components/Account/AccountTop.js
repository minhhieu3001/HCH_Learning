import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Point from '../Common/Point';

export default function AccountTop({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 55,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingRight: 10,
      }}>
      <Text
        style={{color: 'black', fontSize: 25, left: 10, alignSelf: 'center'}}>
        Tài khoản
      </Text>
      <Point navigation={navigation} />
    </View>
  );
}
