import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';
import Point from '../Common/Point';
import {Badge} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setCount} from '../../redux/slice/notificationSlice';

export default function HomeTop({navigation}) {
  const dispatch = useDispatch();

  const count = useSelector(state => {
    return state.notification.notiCount;
  });

  const handleClick = () => {
    dispatch(setCount(0));
    const data = JSON.stringify(0);
    AsyncStorage.setItem('notiCount', data);
  };

  return (
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
      <Pressable
        style={{alignSelf: 'center'}}
        onPress={() => {
          navigation.navigate('noti-screen');
          handleClick();
        }}>
        <Icon
          name="bell-outline"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center'}}
        />
        {count == 0 || !count ? (
          <></>
        ) : (
          <Badge
            status="error"
            containerStyle={{position: 'absolute', top: -4, right: -4}}
            value={count <= 10 ? count : '10+'}
          />
        )}
      </Pressable>
      <Point navigation={navigation} />
    </View>
  );
}
