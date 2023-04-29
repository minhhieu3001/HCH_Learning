import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-big-calendar';
import Point from '../../components/Common/Point';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {useState} from 'react';
import {useEffect, useCallback} from 'react';
import 'dayjs/locale/vi';
import ModalPopup from '../../components/Common/ModalPopup';

export default function CalendarScreen({navigation, route}) {
  const {teacherId} = route.params;

  const [events, setEvents] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [event, setEvent] = useState(null);

  const darkTheme = {
    palette: {
      primary: {
        main: '#018ABE',
        contrastText: 'black',
      },
      gray: {
        100: '#cccccc',
        200: '#cccccc',
        300: '#cccccc',
        500: 'black',
        800: 'black',
      },
    },
  };

  const renderHeaderForMonthView = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}>
          Tháng {month} {year}
        </Text>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            CN
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T2
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T3
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T4
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T5
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T6
          </Text>
          <Text
            style={{
              width: WIDTH / 7,
              padding: 5,
              borderTopWidth: 1,
              borderRightWidth: 0.5,
              borderColor: 'gray',
              borderLeftWidth: 0.5,
              borderBottomWidth: 0.5,
              textAlign: 'center',
              color: 'black',
            }}>
            T7
          </Text>
        </View>
      </View>
    );
  };

  const handleDateChange = useCallback(([start, end]) => {
    setDate(start);
  }, []);

  const getEvents = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/schedule/getSchedules?page=0&size=100&sortType=132132132132&id=${teacherId}`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          const listEvent = [];
          res.data.object.teacherScheduleList.map(item => {
            const event = {
              title: 'Đã có lớp',
              start: new Date(item.scheduleTime),
              end: new Date(item.endTime),
            };
            listEvent.push(event);
          });
          setEvents(listEvent);
        }
      });
  };

  const handlePressEvent = event => {
    setShowModal(true);
    setEvent(event);
  };

  const convertTime = time => {
    const data = new Date(time);
    return `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}  ${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View style={{height: HEIGHT}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 55,
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={30}
            style={{color: '#018ABE', alignSelf: 'center', paddingRight: 10}}
          />
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 25,
              color: 'black',
            }}>
            Lịch dạy
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      {!events ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={{marginTop: 10}}>
          <ModalPopup visible={showModal}>
            <Pressable
              style={{width: '100%', height: '100%'}}
              onPress={() => {
                setShowModal(false);
                setEvent(null);
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '80%',
                  top: '30%',
                  marginLeft: '10%',
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}>
                  Thời gian buổi học
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 10,
                  }}>
                  <Text style={{fontSize: 16, color: 'black'}}>Bắt đầu: </Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {convertTime(event?.start)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginBottom: 20,
                  }}>
                  <Text style={{fontSize: 16, color: 'black'}}>Kết thúc: </Text>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {convertTime(event?.end)}
                  </Text>
                </View>
              </View>
            </Pressable>
          </ModalPopup>
          <Calendar
            events={events}
            height={HEIGHT - 100}
            style={{paddingBottom: 10}}
            hourStyle={{fontSize: 14, color: 'black'}}
            showTime={true}
            theme={darkTheme}
            mode="month"
            locale="vi"
            weekDayHeaderHighlightColor="black"
            renderHeaderForMonthView={renderHeaderForMonthView}
            onChangeDate={handleDateChange}
            onPressEvent={handlePressEvent}
          />
        </View>
      )}
    </View>
  );
}
