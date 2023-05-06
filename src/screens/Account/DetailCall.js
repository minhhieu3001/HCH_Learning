import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';

export default function DetailCall({navigation, route}) {
  const {id, time} = route.params;

  const getRecord = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${BASE_URL}/call/history/getById?callId=${id}`, config)
      .then(res => {
        if (res.data.code == 0) {
          setUrl(res.data.object.filePath);
        }
      });
  };

  useEffect(() => {
    console.log(time);
    getRecord();
  }, []);

  const [pause, setPause] = useState(true);
  const [url, setUrl] = useState(null);
  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={styles.top}>
        <Icon
          onPress={() => navigation.goBack()}
          name="keyboard-backspace"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center', paddingRight: 10}}
        />
        <Text style={{alignSelf: 'center', fontSize: 16, color: 'black'}}>
          Thời gian: {time}{' '}
        </Text>
      </View>
      <Pressable
        style={{
          padding: 5,
          width: '100%',
          height: '100%',
          backgroundColor: '#D6E8EE',
        }}
        onPress={() => setPause(false)}>
        {pause || !url ? (
          <Image
            source={require('../../assets/images/play.png')}
            style={{width: '90%', height: 100, alignSelf: 'center', top: '35%'}}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{
              uri: url,
            }}
            style={{
              width: '100%',
              height: '94%',
              alignSelf: 'center',
            }}
            resizeMode="contain"
            controls={true}
            poster="https://i.imgur.com/kdnT7nn.png"
          />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    backgroundColor: 'white',
    paddingRight: 10,
    paddingStart: 10,
  },
});
