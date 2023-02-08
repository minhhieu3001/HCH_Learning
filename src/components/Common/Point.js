import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Point() {
  return (
    <Pressable
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        alignSelf: 'center',
      }}>
      <Text style={{alignSelf: 'center'}}>1234P</Text>

      <Icon
        name="plus-circle"
        size={20}
        style={{marginLeft: 5, color: '#018ABE', alignSelf: 'center'}}
      />
    </Pressable>
  );
}
