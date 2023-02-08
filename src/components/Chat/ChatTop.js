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
      <View style={{flexDirection: 'row'}}>
        <Point />
        <Icon
          name="trash-can-outline"
          size={30}
          style={{
            color: '#018ABE',
            alignSelf: 'center',
            marginRight: 10,
            marginLeft: 10,
          }}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}
