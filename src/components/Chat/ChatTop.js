import {View, Text} from 'react-native';
import React from 'react';
import Point from '../Common/Point';

export default function ChatTop({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 55,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingEnd: 10,
      }}>
      <Text
        style={{
          alignSelf: 'center',
          left: 25,
          fontSize: 25,
          color: 'black',
        }}>
        Tin nhắn
      </Text>
      <Point navigation={navigation} />
    </View>
  );
}
