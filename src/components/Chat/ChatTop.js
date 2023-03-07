import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';
import Point from '../Common/Point';

export default function ChatTop({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: WIDTH,
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
      <Point />
    </View>
  );
}
