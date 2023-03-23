import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import Point from '../../components/Common/Point';
import {hideTabNav} from '../../redux/slice/tabNavSlice';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen({navigation}) {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getNotifications = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/notification/getNotifications?page=0&size=10&sortType=aaa`,
        config,
      )
      .then(res => {
        console.log(res.data.object);
      });
  };

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.settingTop}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="keyboard-backspace"
            size={30}
            style={{color: '#018ABE', alignSelf: 'center', paddingLeft: 10}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              marginLeft: 10,
              alignSelf: 'center',
            }}>
            Thông báo
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6E8EE',
    width: '100%',
    height: '100%',
  },
  settingTop: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
});
