import {View, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar} from '@rneui/themed';
import {WIDTH} from '../../constant/dimentions';

export default function TeacherMessage({type, msg}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      <Avatar
        size={25}
        rounded
        title="US"
        containerStyle={{backgroundColor: '#3d4db7', alignSelf: 'flex-end'}}
      />
      {type == 'typing' ? (
        <View
          style={{
            backgroundColor: '#f2f2f2',
            width: 60,
            borderRadius: 10,
            marginLeft: 15,
          }}>
          <Icon
            name="dots-horizontal"
            size={40}
            style={{color: 'gray', alignSelf: 'center'}}
          />
        </View>
      ) : type == 'teacher_message' ? (
        <View
          style={{
            maxWidth: WIDTH - 130,
            marginLeft: 10,
            backgroundColor: '#f2f2f2',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 15,
          }}>
          <Text style={{fontSize: 16, color: 'black'}}>{msg}</Text>
        </View>
      ) : (
        <View
          style={{
            maxWidth: WIDTH - 130,
            marginLeft: 10,
            backgroundColor: '#f2f2f2',
            borderRadius: 15,
            paddingLeft: 5,
            paddingRight: 5,
          }}>
          <Image
            source={require('../../assets/images/background.png')}
            resizeMode="center"
            style={{width: WIDTH - 140}}
          />
        </View>
      )}
    </View>
  );
}
