import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;

export default function HomeTop() {
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
        style={{color: '#82cd', paddingTop: 10, paddingLeft: 10}}
        onPress={() => {}}
      />
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.5,
          height: 30,
          top: 10,

          paddingTop: 5,
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 20,
        }}>
        <Text>1234P</Text>

        <Icon
          name="plus-circle-outline"
          size={20}
          style={{marginLeft: 5, color: '#82dc'}}
        />
      </View>
      <Icon
        name="dots-vertical"
        size={30}
        style={{color: '#82cd', paddingTop: 10, paddingRight: 10}}
        onPress={() => {}}
      />
    </View>
  );
}
