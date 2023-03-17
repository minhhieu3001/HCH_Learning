import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from '../../components/Common/Rate';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import {
  BASE_URL,
  TEACHER_OFFLINE,
  TEACHER_ONLINE,
} from '../../constant/constants';
import Loading from '../../components/Common/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPopup from '../../components/Common/ModalPopup';
import {Avatar} from '@rneui/themed';
import CustomAvatar from '../../components/Common/CustomAvatar';
import messaging from '@react-native-firebase/messaging';
import Point from '../../components/Common/Point';

const Item = ({text}) => {
  return (
    <View
      style={{
        paddingStart: 8,
        paddingEnd: 8,
        paddingTop: 2,
        paddingBottom: 2,
        borderWidth: 1,
        minWidth: 50,
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 5,
        alignItems: 'center',
      }}>
      <Text>{text}</Text>
    </View>
  );
};

const DetailScreen = ({route, navigation}) => {
  const {teacherId} = route.params;

  const reviews = [
    {
      star: 5,
      userName: 'Hieu',
      time: '2022/12/12',
      content: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      star: 4,
      userName: 'Hien',
      time: '2022/11/11',
      content: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      star: 3,
      userName: 'Cuong',
      time: '2023/02/03',
      content: '',
    },
  ];

  const [teacher, setTeacher] = useState();
  const [favorite, setFavorite] = useState(null);

  const [time, setTime] = useState(null);
  const [showRequestCall, setShowRequestCall] = useState(false);
  const [counting, setCounting] = useState(false);

  const [rtcToken, setRtcToken] = useState(null);
  const [channel, setChanel] = useState(null);

  const getDetailTeacher = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/session/teacher/getTeacherById?teacherId=${teacherId}`,
        config,
      )
      .then(res => {
        console.log(res.data.object);
        if (res.data.code === 0) {
          setTeacher(res.data.object);
          if (res.data.object.favTeacher == false) {
            setFavorite(false);
          } else setFavorite(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const favoriteTeacher = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${BASE_URL}/ums/session/student/favTeacher?teacherId=${teacherId}`,
        null,
        config,
      )
      .then(res => {
        console.log(res.data);
        setFavorite(true);
      });
  };

  const deleteFavoriteTeacher = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${BASE_URL}/ums/session/student/unFavTeacher?teacherId=${teacherId}`,
        null,
        config,
      )
      .then(res => {
        setFavorite(false);
      });
  };

  const requestCall = async navigation => {
    setTime(90);
    setShowRequestCall(true);
    setCounting(true);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      toId: teacherId,
      callOption: 1,
    };
    axios.post(`${BASE_URL}/call`, data, config).then(res => {
      if (res.data.code == 0) {
        setChanel(res.data.object.chanel);
        setRtcToken(res.data.object.token);
      }
    });
    if (time != 0 && time != null) {
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('fcm message call', remoteMessage);
      // if (remoteMessage.data.type == 1) {
      //   MessageNotification();
      // }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let timer;
    if (counting && time > 0) {
      timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (counting && time === 0) {
      setCounting(false);
      setShowRequestCall(false);
    }
    return () => clearInterval(timer);
  }, [counting, time]);

  useEffect(() => {
    getDetailTeacher();
  }, []);

  return (
    <View style={styles.container}>
      {!teacher ? (
        <></>
      ) : (
        <View>
          <ModalPopup visible={showRequestCall}>
            <View
              style={{
                borderWidth: 1,
                height: 200,
                backgroundColor: 'white',
                width: '80%',
                top: HEIGHT / 2 - 120,
                alignSelf: 'center',
                justifyContent: 'center',
                borderColor: 'gray',
                borderRadius: 20,
              }}>
              {teacher.avaPath ? (
                <Avatar
                  rounded
                  size={50}
                  source={{uri: teacher.avaPath}}
                  containerStyle={{alignSelf: 'center'}}
                />
              ) : (
                <Avatar
                  rounded
                  size={50}
                  source={require('../../assets/images/images.png')}
                  containerStyle={{alignSelf: 'center'}}
                />
              )}
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  alignSelf: 'center',
                }}>{`Đang chờ giáo viên ${teacher.realName} phản hồi`}</Text>
              <Text style={{fontSize: 30, color: 'red', alignSelf: 'center'}}>
                {time}
              </Text>
              <Pressable
                style={{alignSelf: 'center', marginTop: 10}}
                onPress={() => {
                  setShowRequestCall(false);
                  setCounting(false);
                }}>
                <Text style={{fontSize: 18}}>Hủy bỏ</Text>
              </Pressable>
            </View>
          </ModalPopup>
        </View>
      )}
      <View style={styles.header}>
        <Icon
          name="keyboard-backspace"
          size={30}
          style={{color: '#018ABE', paddingTop: 10, paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Point navigation={navigation} />
      </View>
      {!teacher ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../../assets/images/background.png')}
              style={styles.background}
              resizeMode="cover"
            />
            {/* <Image
              // source={require('../../assets/images/images.png')}
              source={{
                uri: 'https://bookstoreimages.s3.amazonaws.com/avatar/e6ca763a56cba495bb76ae4df7bed3f3.jpg',
              }}
              style={styles.avatar}
              resizeMode="cover"
              /> */}
            <View style={styles.avatar}>
              <CustomAvatar
                text={teacher.realName}
                size={150}
                url={teacher.avaPath}
              />
            </View>
            {favorite ? (
              <Pressable
                style={styles.addFavorite}
                onPress={() => deleteFavoriteTeacher()}>
                <Icon name="check" size={24} style={{color: '#018ABE'}} />
                <Text
                  style={{fontSize: 16, color: '#018ABE', fontWeight: '500'}}>
                  Đã yêu thích
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.addFavorite}
                onPress={() => favoriteTeacher()}>
                <Icon name="plus" size={24} />
                <Text style={{fontSize: 16}}>Yêu thích</Text>
              </Pressable>
            )}
          </View>
          <View style={styles.userInfo}>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
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
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: '600',
                textAlign: 'center',
              }}>
              {teacher.realName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
              }}>
              <Rate starNumber={teacher.reviewAvg} isChoose={false} size={14} />
              <Text style={{fontSize: 14, color: '#e68a00', paddingStart: 5}}>
                {teacher.reviewAvg}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 24,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="chat-processing-outline" size={14} />
                <Text> {teacher.priceChat}p/1 kí tự</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 20,
                  justifyContent: 'center',
                }}>
                <Icon name="phone-outline" size={14} />
                <Text> {teacher.priceCall}p/1 phút</Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              }}></View>
            <View style={styles.classAndSubect}>
              <View style={styles.class}>
                <Text style={{fontSize: 18, color: 'black', width: 120}}>
                  Lớp
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: WIDTH,
                    flex: 1,
                  }}>
                  <View
                    style={{
                      paddingStart: 8,
                      paddingEnd: 8,
                      paddingTop: 2,
                      paddingBottom: 2,
                      borderWidth: 1,
                      minWidth: 50,
                      borderRadius: 15,
                      marginHorizontal: 5,
                      marginVertical: 5,
                      alignItems: 'center',
                    }}>
                    <Text>{teacher.course}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.subject}>
                <Text style={{fontSize: 18, color: 'black', width: 120}}>
                  Môn học
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: WIDTH,
                    flex: 1,
                  }}>
                  {teacher?.subjects.map((item, index) => {
                    return <Item text={item} key={index} />;
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.introduction}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
                marginLeft: 10,
                color: '#02457A',
              }}>
              Tự giới thiệu của giáo viên
            </Text>
            <View style={styles.viewShadow}>
              <Text>
                {teacher.introduceMySelf
                  ? teacher.introduceMySelf
                  : 'Chưa có lời giới thiệu'}
              </Text>
              <View style={{borderBottomWidth: 0.5, height: 20}}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <Icon
                  name="facebook"
                  size={18}
                  style={{alignSelf: 'center', paddingTop: 8}}
                />
              </View>
            </View>
          </View>

          <View style={styles.introduction}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
                marginLeft: 10,
                color: '#02457A',
              }}>
              Đánh giá về giáo viên
            </Text>
            <View style={styles.viewShadow}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                    Đánh giá
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate('reviews-screen')}
                    style={{flexDirection: 'row'}}>
                    <Text style={{color: '#018ABE', fontSize: 14}}>
                      Xem tất cả
                    </Text>
                    <Icon
                      name="chevron-right"
                      size={16}
                      style={{color: '#018ABE', alignSelf: 'center'}}
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingBottom: 10,
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray',
                  }}>
                  <View>
                    <Text style={{fontSize: 50, color: 'black'}}>4.8</Text>
                    <Text
                      style={{
                        color: 'black',
                        alignSelf: 'center',
                        fontSize: 20,
                      }}>
                      /5
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>1</Text>
                        <Image
                          source={require('../../assets/images/star_filled.png')}
                          style={{width: 14, height: 14}}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>2</Text>
                        <Image
                          source={require('../../assets/images/star_filled.png')}
                          style={{width: 14, height: 14}}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>3</Text>
                        <Image
                          source={require('../../assets/images/star_filled.png')}
                          style={{width: 14, height: 14}}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>4</Text>
                        <Image
                          source={require('../../assets/images/star_filled.png')}
                          style={{width: 14, height: 14}}
                          resizeMode="cover"
                        />
                      </View>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>5</Text>
                        <Image
                          source={require('../../assets/images/star_filled.png')}
                          style={{width: 14, height: 14}}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                    <View>
                      <Progress.Bar
                        progress={0.9}
                        width={150}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 6, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={0.9}
                        width={150}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={0.9}
                        width={150}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={0.9}
                        width={150}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={0.9}
                        width={150}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  {reviews.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          marginVertical: 3,
                          paddingBottom: 5,
                          paddingLeft: 5,
                          paddingRight: 5,
                          borderRadius: 10,
                          paddingTop: 5,
                        }}>
                        <Rate
                          starNumber={item.star}
                          isChoose={false}
                          size={14}
                        />
                        <Text style={{fontSize: 16, color: 'black'}}>
                          {item.content}
                        </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 5,
                          }}>
                          <Text style={{fontSize: 16, color: 'black'}}>
                            {item.userName}
                          </Text>
                          <Text>{item.time}</Text>
                        </View>
                        <View
                          style={{
                            borderBottomWidth: 0.3,
                            borderBottomColor: 'gray',
                            height: 10,
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
          <View style={{height: 20}}></View>
        </ScrollView>
      )}
      <View style={{height: 55, backgroundColor: 'white'}}></View>
      {!teacher ? (
        <></>
      ) : (
        <View style={styles.bottomView}>
          <Pressable
            onPress={() =>
              navigation.navigate('chat-detail-screen', {
                teacherId: teacher.id,
                teacherName: teacher.realName,
                teacherStatus: teacher.status,
                teacherPath: teacher.avaPath,
              })
            }
            style={{
              flexDirection: 'row',
              borderRadius: 30,
              backgroundColor: '#D6E8EE',
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: WIDTH / 2 - 20,
            }}>
            <Icon
              name="chat-processing-outline"
              size={30}
              style={{color: '#02457A', alignSelf: 'center'}}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#02457A',
                marginLeft: 5,
                alignSelf: 'center',
              }}>
              Nhắn tin
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              if (teacher.status == TEACHER_ONLINE) {
                // requestCall(navigation);
                navigation.navigate('call-screen');
              } else if (teacher.status == TEACHER_OFFLINE) {
                Alert.alert(
                  'Thông báo',
                  'Giáo viên đang ngoại tuyến không thể thực hiện cuộc gọi',
                );
              } else
                Alert.alert('Thông báo', 'Giáo viên đang có cuộc gọi khác');
            }}
            style={{
              flexDirection: 'row',
              borderRadius: 30,
              borderWidth: teacher.status !== TEACHER_ONLINE ? 2 : 0,
              borderStyle:
                teacher.status !== TEACHER_ONLINE ? 'dashed' : 'solid',
              backgroundColor:
                teacher.status !== TEACHER_ONLINE ? 'white' : '#D6E8EE',
              borderColor:
                teacher.status !== TEACHER_ONLINE ? 'gray' : '#02457A',
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              width: WIDTH / 2 - 20,
            }}>
            <Icon
              name="phone"
              size={30}
              style={{
                color: teacher.status !== TEACHER_ONLINE ? 'gray' : '#02457A',
              }}
            />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 5,
                color: teacher.status !== TEACHER_ONLINE ? 'gray' : '#02457A',
              }}>
              Gọi điện
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
  header: {
    flexDirection: 'row',
    width: WIDTH,
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingEnd: 10,
  },
  profileImageContainer: {
    height: 180,
    width: WIDTH,
  },
  background: {
    height: 180,
    width: WIDTH,
    borderBottomWidth: 2,
  },
  avatar: {
    height: 150,
    width: 150,
    position: 'absolute',
    bottom: -55,
    left: 15,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: 'gray',
  },
  addFavorite: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 35,
    paddingStart: 20,
    paddingEnd: 20,
    position: 'absolute',
    bottom: -15,
    borderRadius: 20,
    right: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  userInfo: {
    marginTop: 60,
    padding: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  bottomView: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'white',
    height: 70,
    width: WIDTH,
    bottom: 0,
    justifyContent: 'space-between',
    paddingStart: 10,
    paddingEnd: 10,
  },
  classAndSubect: {
    marginTop: 10,
  },
  class: {
    flexDirection: 'row',
  },
  subject: {
    flexDirection: 'row',
  },
  introduction: {
    marginTop: 20,
    elevation: 3,
  },
  viewShadow: {
    backgroundColor: 'white',
    width: WIDTH - 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
  timelineTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
