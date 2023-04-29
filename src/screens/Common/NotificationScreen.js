import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
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
        `${BASE_URL}/notification/getNotifications?page=0&size=10&types=0,9,12`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setNotifications(res.data.object.notificationDBS);
        }
      });
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
      <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{margin: 10}}>
          {!notifications ? (
            <></>
          ) : (
            notifications.map((item, index) => {
              return (
                <Pressable
                  key={item.sendTime}
                  onPress={() => handleNavigation(item)}
                  style={{
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 15,
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}>
                  <Text style={{marginBottom: 10}}>Thông báo</Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {item.typeNotification == 0
                      ? `Bạn có câu trả lời mới từ giáo viên ${item.humanDTO.realName} !`
                      : item.typeNotification == 9
                      ? 'Bạn sắp đến thời gian học với giáo viên!'
                      : item.typeNotification == 12
                      ? 'Báo cáo của bạn đã được chấp thuận!'
                      : item.typeNotification == 13
                      ? 'Báo cáo của bạn đã bị từ chối!'
                      : ''}
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                    }}>
                    <Text>{handleTime(item.sendTime)}</Text>
                  </View>
                </Pressable>
              );
            })
          )}
          <View style={{height: 60}}></View>
        </ScrollView>
      </View>
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
