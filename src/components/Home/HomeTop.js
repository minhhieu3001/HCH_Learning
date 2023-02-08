import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';
import Point from '../Common/Point';

export default function HomeTop({navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: WIDTH,
        height: 55,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <Icon
        name="bell-outline"
        size={30}
        style={{color: '#018ABE', alignSelf: 'center', paddingLeft: 10}}
        onPress={() => {}}
      />
      <Point />
      <Icon
        name="dots-vertical"
        size={30}
        style={{color: '#018ABE', alignSelf: 'center', paddingRight: 10}}
        onPress={() => {}}
      />
    </View>
  );
}
