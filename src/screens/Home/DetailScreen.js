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
import CustomAvatar from '../../components/Common/CustomAvatar';
import messaging from '@react-native-firebase/messaging';
import Point from '../../components/Common/Point';
import socket from '../../service/socket';
import {useFocusEffect} from '@react-navigation/native';
import {Press} from 'hammerjs';

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

  const [teacher, setTeacher] = useState();
  const [favorite, setFavorite] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [time, setTime] = useState(null);
  const [showRequestCall, setShowRequestCall] = useState(false);
  const [counting, setCounting] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [inputReview, setInputReview] = useState(null);
  const [starReview, setStarReview] = useState(0);
  const [showReport, setShowReport] = useState(false);
  const [reportTitle, setReportTitle] = useState(null);
  const [reportContent, setReportContent] = useState(null);

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
        console.log(res.data);
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

  const requestCall = async () => {
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
    const data_user = await AsyncStorage.getItem('user');
    const user = JSON.parse(data_user);
    axios.post(`${BASE_URL}/call`, data, config).then(res => {
      if (res.data.code == 0) {
        AsyncStorage.setItem('cname', res.data.object.chanel);
        const rtcToken = JSON.stringify(res.data.object.token);
        AsyncStorage.setItem('rtcToken', rtcToken);
        const time = JSON.stringify(res.data.object.timeLimit);
        AsyncStorage.setItem('timeCall', time);
        socket.emit('seen', {
          to: teacherId,
          senderId: user.id,
          senderName: user.realName,
          senderAvatar: user.avaPath,
          type: '2',
        });
      } else {
        Alert.alert('Thông báo', 'Bạn không đủ point để thực hiện cuộc gọi');
      }
    });
  };

  const getShowReview = async () => {
    const data = await AsyncStorage.getItem('review');
    if (data != null) {
      if (data == 'true') {
        setShowReview(true);
      } else setShowReview(false);
    } else setShowReview(false);
  };

  const pushReview = async review => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(`${BASE_URL}/ums/reviewTeacher/createReviews`, review, config)
      .then(res => {
        if (res.data.code == 0) {
          AsyncStorage.setItem('review', 'false');
        }
      });
  };

  const getReview = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/reviewTeacher/getReviews?teacherId=${teacherId}&page=0&size=5`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setReviews(res.data.object.reviewResponses);
        }
      });
  };

  const filterStar = star => {
    if (reviews) {
      if (reviews.length == 0) return 0;
      return (
        reviews.filter(item => item.reviewTeacher.star == star).length /
        reviews.length
      );
    }
  };

  const convertTime = longTime => {
    const time = new Date(longTime);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}  ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  };

  const handlePushReport = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    if (reportTitle != null && reportContent != null) {
      const data = {
        toId: teacherId,
        title: reportTitle,
        value: reportContent,
      };
      axios.post(`${BASE_URL}/ums/report`, data, config).then(res => {
        if (res.data.code == 0) {
          setShowReport(false);
          Alert.alert(
            'Thông báo',
            'Báo cáo của bạn đã được hệ thống chuyển cho quản trị viên xác nhận.',
          );
        }
      });
    } else {
      Alert.alert('Thông báo', 'Vui lòng không bỏ trống');
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('fcm message call', remoteMessage);
      if (remoteMessage.data.type == '5') {
        setTimeout(() => {
          setCounting(false);
          setShowRequestCall(false);
          navigation.navigate('call-screen', {teacherId: teacherId});
        }, 2000);
      }
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
    getShowReview();
    getDetailTeacher();
    getReview();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getShowReview();
    }, []),
  );

  useEffect(() => {
    socket.on('receiveCancelCall', data => {
      console.log(data);
      setCounting(false);
      setShowRequestCall(false);
      setCancel(true);
    });
  }, []);

  useEffect(() => {
    if (cancel) {
      Alert.alert('Thông báo', 'Giáo viên đã từ chối cuộc gọi');
      setCancel(false);
    }
  }, [cancel]);

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
              <CustomAvatar
                text={teacher.realName}
                url={teacher.avaPath}
                size={50}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  alignSelf: 'center',
                  padding: 10,
                  textAlign: 'center',
                }}>{`Đang chờ giáo viên ${teacher.realName} phản hồi`}</Text>
              <Text style={{fontSize: 30, color: 'red', alignSelf: 'center'}}>
                {time}
              </Text>
              <Pressable
                style={{alignSelf: 'center', marginTop: 10}}
                onPress={() => {
                  socket.emit('cancelCall', {
                    to: teacherId,
                  });
                  setShowRequestCall(false);
                  setCounting(false);
                }}>
                <Text style={{fontSize: 18}}>Hủy bỏ</Text>
              </Pressable>
            </View>
          </ModalPopup>
          <ModalPopup visible={showReview}>
            <View
              style={{
                width: '80%',
                backgroundColor: 'white',
                top: 200,
                left: '10%',
                padding: 10,
              }}>
              <View style={{}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon
                    onPress={() => {
                      setShowReview(false);
                      AsyncStorage.setItem('review', 'false');
                    }}
                    name="close"
                    size={30}
                    style={{alignSelf: 'center', color: 'red'}}
                  />
                </View>
              </View>
              <View style={{}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Rate
                    numberStar={0}
                    isChoose={true}
                    size={24}
                    setData={setStarReview}
                  />
                </View>

                <TextInput
                  placeholder="Viết nhận xét về giáo viên"
                  multiline={true}
                  style={{
                    borderWidth: 1,
                    marginTop: 5,
                    borderRadius: 15,
                    padding: 10,
                  }}
                  onChangeText={text => setInputReview(text)}
                  numberOfLines={4}
                />
              </View>

              <Pressable
                onPress={() => {
                  setShowReview(false);
                  if (starReview != 0 && inputReview != null) {
                    const newReview = {
                      teacherId: teacher.id,
                      star: starReview,
                      content: inputReview,
                    };
                    pushReview(newReview);
                  } else {
                    Alert.alert(
                      'Thông báo',
                      'Bạn phải chọn số sao và nhập nội dung đánh giá',
                    );
                  }
                }}
                style={{
                  marginTop: 30,
                  textAlign: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  height: 40,
                  backgroundColor: '#82C6D0',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    top: '10%',
                  }}>
                  Xác nhận
                </Text>
              </Pressable>
            </View>
          </ModalPopup>
          <ModalPopup visible={showReport}>
            <View
              style={{
                backgroundColor: 'white',
                width: '80%',
                alignSelf: 'center',
                top: 180,
                borderRadius: 15,
              }}>
              <View style={{padding: 10}}>
                <Icon
                  onPress={() => {
                    setShowReport(false);
                    setReportTitle(null);
                    setReportContent(null);
                  }}
                  name="close"
                  size={24}
                  style={{marginLeft: 'auto'}}
                />
                <TextInput
                  style={{
                    borderWidth: 1,
                    margin: 10,
                    borderRadius: 15,
                    padding: 10,
                    fontSize: 14,
                  }}
                  placeholder="Chủ đề"
                  onChangeText={text => setReportTitle(text)}
                />
                <TextInput
                  style={{
                    borderWidth: 1,
                    margin: 10,
                    borderRadius: 15,
                    padding: 10,
                    fontSize: 14,
                  }}
                  placeholder="Nội dung báo cáo"
                  numberOfLines={5}
                  multiline={true}
                  onChangeText={text => setReportContent(text)}
                />
              </View>
              <Pressable
                style={{
                  height: 45,
                  backgroundColor: '#018ABE',
                  justifyContent: 'center',
                }}
                onPress={() => handlePushReport()}>
                <Text
                  style={{fontSize: 18, color: 'white', alignSelf: 'center'}}>
                  Xác nhận
                </Text>
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
            <Icon
              onPress={() => {
                navigation.navigate('calendar-screen', {teacherId: teacherId});
              }}
              name="calendar-month"
              size={30}
              style={{
                marginTop: 30,
                marginLeft: 'auto',
                marginRight: 40,
                color: 'black',
              }}
            />
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
                margin: 5,
              }}>
              <Rate starNumber={teacher.star} isChoose={false} size={20} />

              <Text style={{fontSize: 20, color: '#e68a00', marginLeft: 10}}>
                {teacher.star}
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
                    onPress={() =>
                      navigation.navigate('reviews-screen', {
                        star: teacher.star,
                        teacherId: teacherId,
                      })
                    }
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
                  <View style={{paddingLeft: 20}}>
                    <Text style={{fontSize: 50, color: 'black'}}>
                      {!teacher.star ? 0 : teacher.star}
                    </Text>
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
                        progress={filterStar(1)}
                        width={120}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 6, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={filterStar(2)}
                        width={120}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={filterStar(3)}
                        width={120}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={filterStar(4)}
                        width={120}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                      <Progress.Bar
                        progress={filterStar(5)}
                        width={120}
                        height={6}
                        color="#cccc00"
                        style={{marginTop: 11, marginLeft: 5, marginRight: 5}}
                      />
                    </View>
                    {!reviews ? (
                      <></>
                    ) : (
                      <View>
                        <Text style={{marginLeft: 'auto'}}>
                          {filterStar(1) * 100} %
                        </Text>
                        <Text style={{marginLeft: 'auto'}}>
                          {filterStar(2) * 100} %
                        </Text>
                        <Text style={{marginLeft: 'auto'}}>
                          {filterStar(3) * 100} %
                        </Text>
                        <Text style={{marginLeft: 'auto'}}>
                          {filterStar(4) * 100} %
                        </Text>
                        <Text style={{marginLeft: 'auto'}}>
                          {filterStar(5) * 100} %
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View>
                  {!reviews ? (
                    <></>
                  ) : reviews.length == 0 ? (
                    <></>
                  ) : (
                    reviews.map((item, index) => {
                      return (
                        <View
                          key={item.reviewTeacher.id}
                          style={{
                            marginVertical: 3,
                            paddingBottom: 5,
                            paddingLeft: 5,
                            paddingRight: 5,
                            borderRadius: 10,
                            paddingTop: 5,
                          }}>
                          <View style={{marginBottom: 5}}>
                            <Rate
                              starNumber={item.reviewTeacher.star}
                              isChoose={false}
                              size={16}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 18,
                              color: 'black',
                              marginBottom: 5,
                            }}>
                            {item.reviewTeacher.content}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingTop: 5,
                            }}>
                            <Text style={{fontSize: 16}}>
                              {item.studentDTO.realName}
                            </Text>
                            <Text>
                              {convertTime(item.reviewTeacher.createTime)}
                            </Text>
                          </View>
                          <View
                            style={{
                              borderBottomWidth:
                                index == reviews.length - 1 ? 0 : 0.3,
                              borderBottomColor: 'gray',
                              height: 10,
                            }}
                          />
                        </View>
                      );
                    })
                  )}
                </View>
              </View>
            </View>
          </View>
          <Pressable
            onPress={() => setShowReport(true)}
            style={{
              backgroundColor: '#ff3333',
              margin: 10,
              padding: 10,
              height: 45,
            }}>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'white',
                fontWeight: '500',
              }}>
              Báo cáo
            </Text>
          </Pressable>
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
                avaUrl: teacher.avaPath,
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
                requestCall();
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
    marginTop: 70,
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
