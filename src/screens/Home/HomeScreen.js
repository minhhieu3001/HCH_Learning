import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import HomeTop from '../../components/Home/HomeTop';
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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TEACHER_OFFLINE, TEACHER_ONLINE} from '../../constant/constants';
import CustomAvatar from '../../components/Common/CustomAvatar';
import socket from '../../service/socket';

const Item = ({teacher, press}) => {
  return (
    <Pressable
      onPress={() => press(teacher.id)}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 120,
        height: 70,
        padding: 5,
        marginRight: 10,
        elevation: 2,
        shadowColor: 'gray',
      }}>
      <CustomAvatar text={teacher.realName} size={60} url={teacher.avaPath} />
      <View style={{paddingLeft: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.realName}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === TEACHER_ONLINE
                ? 'check-circle'
                : teacher.status === TEACHER_OFFLINE
                ? 'timer-off'
                : 'clock'
            }
            color={
              teacher.status === TEACHER_ONLINE
                ? 'green'
                : teacher.status === TEACHER_OFFLINE
                ? 'red'
                : '#ff6600'
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                teacher.status === TEACHER_ONLINE
                  ? 'green'
                  : teacher.status === TEACHER_OFFLINE
                  ? 'red'
                  : '#ff6600',
            }}>
            {teacher.status === TEACHER_ONLINE
              ? 'Trực tuyến'
              : teacher.status === TEACHER_OFFLINE
              ? 'Ngoại tuyến'
              : 'Đang trong cuộc gọi'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Header = ({navigation, fav}) => {
  return (
    <Icon
      onPress={() =>
        navigation.navigate('list-teacher', {tab: fav == true ? 2 : 1})
      }
      name="plus-circle-outline"
      size={70}
      style={{paddingLeft: 10, paddingRight: 10, color: 'white'}}
    />
  );
};

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const [allTeachers, setAllTeachers] = useState([]);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [recommendTeachers, setRecommendTeachers] = useState([]);
  const [rankDays, setRankDays] = useState([]);
  const [rankWeeks, setRankWeeks] = useState([]);
  const [rankMonths, setRankMonths] = useState([]);

  const visibleMenuPopup = useSelector(state => {
    return state.menuPopUp.visibleMenuPopup;
  });

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

  const getFavoriteTeachers = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=30&tab=2`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          if (!res.data.object) {
            setFavoriteTeachers([]);
          } else {
            setFavoriteTeachers(res.data.object.teacherResponses);
          }
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
        `${BASE_URL}/ums/getTeachers/getTeacher?page=0&size=20&searchByClasses=&searchBySubjects=&tab=1`,
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

  const navigateToDetailScreen = id => {
    dispatch(hideTabNav(false));
    navigation.navigate('detail-screen', {teacherId: id});
  };

  const getRankDays = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=1&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRankDays(res.data.object);
        }
      });
  };

  const getRankWeeks = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=2&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRankWeeks(res.data.object);
        }
      });
  };

  const getRankMonths = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=3&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRankMonths(res.data.object);
        }
      });
  };

  const connectSocket = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    socket.emit('add-user', user.id);
  };

  useEffect(() => {
    getPoint();
    getNotiCount();
    getAllTeacher();
    getFavoriteTeachers();
    getRecommendTeachers();
    connectSocket();
    getRankDays();
    getRankMonths();
    getRankWeeks();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getNotiCount();
      dispatch(showTabNav(true));
      getAllTeacher();
      getFavoriteTeachers();
      if (favoriteTeachers.length == 0) {
        getRecommendTeachers();
      }
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
          <LinearGradient
            style={{width: WIDTH}}
            colors={['#4dccfe', '#b3d8e5']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 20, color: 'white', fontWeight: '800'}}>
                {favoriteTeachers.length != 0
                  ? 'Giáo viên yêu thích'
                  : 'Giáo viên đề xuất'}
              </Text>
              <Pressable
                style={{alignSelf: 'center', flexDirection: 'row'}}
                onPress={() => {
                  dispatch(hideTabNav(false));
                  navigation.navigate('list-teacher', {
                    tab: favoriteTeachers.length != 0 ? 2 : 1,
                  });
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Xem thêm
                </Text>
                <Icon
                  name="chevron-right"
                  size={24}
                  color="white"
                  style={{alignSelf: 'center'}}
                />
              </Pressable>
            </View>
            <FlatList
              data={
                favoriteTeachers.length == 0
                  ? recommendTeachers
                  : favoriteTeachers
              }
              renderItem={({item}) => (
                <Item teacher={item} press={navigateToDetailScreen} />
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => (
                <Header
                  navigation={navigation}
                  fav={favoriteTeachers.length == 0 ? false : true}
                />
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{paddingTop: 15, paddingBottom: 15}}
            />
          </LinearGradient>
          <AllTeachers navigation={navigation} allTeachers={allTeachers} />
          <Rank
            navigation={navigation}
            rankDays={rankDays}
            rankWeeks={rankWeeks}
            rankMonths={rankMonths}
          />
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
