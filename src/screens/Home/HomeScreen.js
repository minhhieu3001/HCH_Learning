import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/RankTop3';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch, useSelector} from 'react-redux';
import MenuPopup from '../../components/Common/MenuPopup';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import Loading from '../../components/Common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {setData} from '../../redux/slice/pointSlice';
import {hideTabNav, showTabNav} from '../../redux/slice/tabNavSlice';
import {setCount} from '../../redux/slice/notificationSlice';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const [allTeachers, setAllTeachers] = useState([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [recommendTeachers, setRecommendTeachers] = useState([]);

  const getFavoriteTeachers = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=15&tab=2`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setFavoriteTeachers(res.data.object.teacherResponses);
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng favorite!');
        }
      });
  };

  const getRecommendTeachers = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=10&searchByClasses=&searchBySubjects=&tab=1`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRecommendTeachers(res.data.object.teacherResponses);
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng recommend!');
        }
      });
  };

  const getAllTeacher = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=12&tab=3`,
        config,
      )
      .then(res => {
        if (res.data.code === 0) {
          setAllTeachers(res.data.object.teacherResponses);
        }
      });
  };

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (dif < 0 || currentOffset == 0) {
      dispatch(showTabNav(true));
    } else {
      dispatch(hideTabNav(false));
    }
    this.offset = currentOffset;
  };

  const visibleMenuPopup = useSelector(state => {
    return state.menuPopUp.visibleMenuPopup;
  });

  const getPoint = async () => {
    const data = await AsyncStorage.getItem('user');
    const point = JSON.parse(data).point;
    dispatch(setData(point));
  };

  const getNotiCount = async () => {
    const data = await AsyncStorage.getItem('notiCount');
    const notiCount = JSON.parse(data);
    dispatch(setCount(notiCount));
  };

  useEffect(() => {
    console.log('aaaaaaaaaaaaaaaaa', visibleMenuPopup);
    getPoint();
    getNotiCount();
    getAllTeacher();
    getFavoriteTeachers();
    getRecommendTeachers();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getPoint();
      getNotiCount();
      dispatch(showTabNav(true));
      getAllTeacher();
      getFavoriteTeachers();
      getRecommendTeachers();
    }, []),
  );

  return (
    <View style={styles.container}>
      <MenuPopup show={visibleMenuPopup} navigation={navigation} />
      <HomeTop navigation={navigation} />
      {!allTeachers || !favoriteTeachers || !recommendTeachers ? (
        <Loading />
      ) : (
        <ScrollView
          onScroll={e => {
            onScroll(e);
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <ListFavorite
            navigation={navigation}
            teachers={
              !favoriteTeachers || favoriteTeachers.length == 0
                ? recommendTeachers
                : favoriteTeachers
            }
            type={
              !favoriteTeachers || favoriteTeachers.length == 0
                ? 'recommend'
                : 'favorite'
            }
          />
          <AllTeachers navigation={navigation} allTeachers={allTeachers} />
          <Rank navigation={navigation} />
          <Question navigation={navigation} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
});
