import {View, Text, Image} from 'react-native';
import React from 'react';
import {WIDTH} from '../../constant/dimentions';

export default function UserMessage({type, seen, msg}) {
  return (
    <View style={{marginBottom: 10}}>
      {type == 'user_message' ? (
        <View
          style={{
            maxWidth: WIDTH - 130,
            marginLeft: 'auto',
            backgroundColor: '#018ABE',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 15,
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>{msg}</Text>
        </View>
      ) : (
        <View
          style={{
            maxWidth: WIDTH - 130,
            marginLeft: 'auto',
            backgroundColor: '#018ABE',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 15,
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
