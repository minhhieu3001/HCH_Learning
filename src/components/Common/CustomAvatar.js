import {View, Text} from 'react-native';
import React from 'react';
import {Avatar} from '@rneui/themed';

export default function CustomAvatar({text, size, url}) {
  let lastName = '';
  let firstName = '';
  if (!url && text) {
    firstName = text.split(' ').slice(0, -1).join(' ');
    lastName = text.split(' ').slice(-1).join(' ');
  }
  if (url == null || url == '' || typeof url == 'undefined') {
    return (
      <Avatar
        size={size}
        rounded
        title={!text ? 'NA' : `${firstName[0]}${lastName[0]}`}
        containerStyle={{backgroundColor: '#018ABE', alignSelf: 'center'}}
      />
    );
  } else {
    return (
      <Avatar
        size={size}
        rounded
        source={{
          uri: url,
        }}
        containerStyle={{backgroundColor: '#3d4db7', alignSelf: 'center'}}
      />
    );
  }
}
