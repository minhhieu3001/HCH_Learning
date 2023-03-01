import {View, StyleSheet, ScrollView, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/RankTop3';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';
import MenuPopup from '../../components/Common/MenuPopup';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import Loading from '../../components/Common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const [allTeachers, setAllTeachers] = useState([]);

  const getAllTeacher = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios
      .get(`${BASE_URL}/ums/getTeachers?page=0&size=8&sort=time_login`, config)
      .then(res => {
        if (res.data.code === 0) {
          setAllTeachers(res.data.object);
        }
      });
  };

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (dif < 0 || currentOffset == 0) {
      dispatch(showTabNav());
    } else {
      dispatch(hideTabNav());
    }
    this.offset = currentOffset;
  };

  const visibleMenuPopup = useSelector(state => {
    return state.visibleMenuPopup;
  });

  useEffect(() => {
    getAllTeacher();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabNav());
      getAllTeacher();
    }, []),
  );

  return (
    <View style={styles.container}>
      <MenuPopup
        show={visibleMenuPopup.visibleMenuPopup}
        navigation={navigation}
      />
      <HomeTop navigation={navigation} />
      {!allTeachers ? (
        <Loading />
      ) : (
        <ScrollView
          onScroll={e => {
            onScroll(e);
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <ListFavorite navigation={navigation} />
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
