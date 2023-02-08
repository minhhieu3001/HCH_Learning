import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {WIDTH, HEIGHT} from '../../constant/dimentions';

const Loading = () => {
  return (
    <View
      style={{
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: 'white',
      }}>
      <Image
        source={require('../../assets/images/loading.gif')}
        style={{
          width: 300,
          height: 300,
          position: 'absolute',
          top: HEIGHT / 2 - 200,
          left: WIDTH / 2 - 150,
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default Loading;
