import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import Point from '../../components/Common/Point';
import {hideTabNav} from '../../redux/slice/tabNavSlice';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Common/Loading';
import {HEIGHT} from '../../constant/dimentions';

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
        `${BASE_URL}/notification/getNotifications?page=${page}&size=10&types=0,9,12`,
        config,
      )
      .then(res => {
        setLoading(false);
        if (res.data.code == 0) {
          if (!notifications) {
            setNotifications(res.data.object.notificationDBS);
          } else {
            setNotifications(
              notifications.concat(res.data.object.notificationDBS),
            );
          }
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng! Vui lòng thử lại');
        }
      });
  };

  const handleLoadMore = () => {
    setLoading(true);
    setPage(page + 1);
  };

  const renderFooter = () => {
    return loading ? (
      <View>
        <ActivityIndicator size={50} color="#82C6D0" />
      </View>
    ) : null;
  };

  const handleNavigation = item => {
    if (item.typeNotification == 0) {
      navigation.navigate('detail-question-screen', {
        questionId: item.questionId,
      });
    }
    // if (item.typeNotification == 9) {
    //   navigation.navigate('detail-screen', {teacherId: id});
    // }
  };

  const handleTime = time => {
    const date = new Date(time);
    const now = new Date();

    if (date.getDate() == now.getDate() && date.getMonth() == now.getMonth()) {
      return `${date.getHours()}:${date.getMinutes()}`;
    } else {
      return `${date.getDate()}/Th${date.getMonth() + 1}`;
    }
  };

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);

  useEffect(() => {
    if (loading == true) {
      getNotifications();
    }
  }, [loading, page]);

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
      <View>
        <View style={{margin: 10, height: HEIGHT - 70}}>
          {!notifications ? (
            <Loading />
          ) : notifications.length == 0 ? (
            <Text style={{fontSize: 16, alignSelf: 'center', marginTop: 10}}>
              Không có thông báo
            </Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={notifications}
              style={{
                alignSelf: 'center',
                paddingTop: 10,
                paddingBottom: 30,
                width: '100%',
              }}
              renderItem={item => {
                return (
                  <Pressable
                    key={item.item.sendTime}
                    onPress={() => handleNavigation(item.item)}
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      borderRadius: 15,
                      justifyContent: 'center',
                      marginBottom: 5,
                    }}>
                    <Text style={{marginBottom: 10}}>Thông báo</Text>
                    <Text style={{fontSize: 16, color: 'black'}}>
                      {item.item.typeNotification == 0
                        ? `Bạn có câu trả lời mới từ giáo viên ${item.item.humanDTO.realName} !`
                        : item.item.typeNotification == 9
                        ? 'Bạn sắp đến thời gian học với giáo viên!'
                        : item.item.typeNotification == 12
                        ? 'Báo cáo của bạn đã được chấp thuận!'
                        : item.item.typeNotification == 13
                        ? 'Báo cáo của bạn đã bị từ chối!'
                        : ''}
                    </Text>
                    <View
                      style={{
                        marginTop: 10,
                      }}>
                      <Text>{handleTime(item.item.sendTime)}</Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={item => item.id}
              ListFooterComponent={renderFooter()}
              onEndReached={() => {
                handleLoadMore();
              }}
              onEndReachedThreshold={0.5}
            />
          )}
          {/* <View style={{height: 10}}></View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D6E8EE',
    width: '100%',
    height: HEIGHT,
  },
  settingTop: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
});
