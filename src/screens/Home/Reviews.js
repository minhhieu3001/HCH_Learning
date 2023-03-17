import {View, Text} from 'react-native';
import React from 'react';
import {WIDTH} from '../../constant/dimentions';
import Point from '../../components/Common/Point';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Reviews({navigation}) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: WIDTH,
          height: 55,
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingEnd: 10,
          paddingStart: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => navigation.goBack()}
            size={32}
            name="keyboard-backspace"
            style={{alignSelf: 'center', color: '#018ABE'}}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              alignSelf: 'center',
              paddingLeft: 10,
            }}>
            Nhận xét
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
    </View>
  );
}
