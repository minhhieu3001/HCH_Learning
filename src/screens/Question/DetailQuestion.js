import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showQuestionNav} from '../../redux/slice/questionTabSlice';
import Point from '../../components/Common/Point';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import CustomAvatar from '../../components/Common/CustomAvatar';
import ImageQuestion from '../../components/Question/ImageQuestion';

export default function DetailQuestion({route, navigation}) {
  const dispatch = useDispatch();
  const {questionId} = route.params;

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [student, setStudent] = useState(null);
  const [resolve, setResolve] = useState(null);

  const convertTime = longTime => {
    const time = new Date(longTime);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}  ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  };

  const getQuestion = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(`${BASE_URL}/post/detail?id=${questionId}`, config).then(res => {
      if (res.data.code == 0) {
        console.log(res.data.object.questionDetail);
        setQuestion(res.data.object.questionDetail);
        setAnswers(res.data.object.teacherAnswerResponses);
        setStudent(res.data.object.studentDTO);
        setResolve(res.data.object.questionDetail.resolve);
      }
    });
  };

  const handleChooseBestAnswer = item => {
    Alert.alert(
      'Thông báo',
      'Bạn sẽ chọn câu trả lời này là câu trả lời hay nhất và sẽ không thể chọn lại. Bạn chắc chắn chứ?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Xác nhận', onPress: () => handleBestAnswer(item)},
      ],
    );
  };

  const handleBestAnswer = async item => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      answerId: item.id,
    };
    axios.put(`${BASE_URL}/post/pickBestAnswer`, data, config).then(res => {
      if (res.data.code == 0) {
        const newList = answers.filter(answer => answer.id != item.id);
        item.bestAnswer = true;
        newList.unshift(item);
        setAnswers(newList);
      } else if (res.data.code == 9) {
        Alert.alert(
          'Thông báo',
          'Không phải câu hỏi của bạn nên bạn không thể lựa chọn câu trả lời hay nhất',
        );
      } else {
        Alert.alert('Thông báo', 'Lỗi mạng! Vui lòng thử lại');
      }
    });
  };

  const handlePressResolve = () => {
    if (!answers || answers.length == 0) {
      Alert.alert(
        'Thông báo',
        'Chưa có câu trả lời, không thể kết thúc câu hỏi!',
      );
    } else if (answers[0].bestAnswer == false) {
      Alert.alert(
        'Thông báo',
        'Chưa có câu trả lời hay nhất, không thể kết thúc câu hỏi!',
      );
    } else {
      Alert.alert(
        'Thông báo',
        'Bạn sẽ kết thúc câu hỏi này. Bạn chắc chắn chứ',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Xác nhận', onPress: () => handleResolve()},
        ],
      );
    }
  };

  const handleResolve = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .put(
        `${BASE_URL}/post/resolve`,
        {
          questionId: question.id,
        },
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setResolve(true);
        } else if (res.data.code == 9) {
          Alert.alert(
            'Thông báo',
            'Không phải câu hỏi của bạn nên bạn không thể kết thúc nó',
          );
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng! Vui lòng thử lại');
        }
      });
  };

  const handleOpenLink = async url => {
    await Linking.openURL(url);
  };

  useEffect(() => {
    getQuestion();
  }, []);
  return (
    <View style={{backgroundColor: '#D6E8EE', height: '100%'}}>
      <View style={styles.top}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Icon
            name="keyboard-backspace"
            size={35}
            style={{color: '#018ABE', left: 10, alignSelf: 'center'}}
            onPress={() => {
              navigation.goBack();
              dispatch(showQuestionNav(true));
            }}
          />
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              left: 15,
              fontSize: 20,
            }}>
            Chi tiết câu hỏi
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10}}>
        {!question ? (
          <></>
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              padding: 10,
              elevation: 6,
              shadowColor: 'gray',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <Text
                style={{
                  borderRadius: 5,
                  height: 20,
                  paddingLeft: 5,
                  paddingRight: 5,
                  backgroundColor: '#82c0de',
                  color: 'white',
                }}>
                {question.subject} - {question.course}
              </Text>
              <Pressable onPress={() => handlePressResolve()}>
                <Text
                  style={{
                    borderRadius: 5,
                    height: 20,
                    paddingLeft: 5,
                    paddingRight: 5,
                    backgroundColor: resolve === true ? '#82c0de' : 'white',
                    color: resolve === true ? 'white' : 'black',
                    borderWidth: resolve === true ? 0 : 1,
                  }}>
                  {resolve == false ? 'Chưa giải quyết' : 'Đã giải quyết'}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                marginBottom: 5,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 18,
                  color: 'black',
                  paddingBottom: 2,
                  fontWeight: '400',
                  marginBottom: 10,
                }}
                numberOfLines={5}>
                {question.content}
              </Text>
              {!question.imgUrls ? (
                <Text>{question.imgUrls}</Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {question.imgUrls.map((item, index) => {
                    return <ImageQuestion url={item} key={index} />;
                  })}
                </ScrollView>
              )}

              <Pressable onPress={() => handleOpenLink(question.filePaths[0])}>
                {!question.filePaths ? (
                  <></>
                ) : (
                  <Text
                    style={{
                      marginBottom: 10,
                      padding: 5,
                      borderBottomColor: 'gray',
                      borderTopColor: 'gray',
                      borderTopWidth: 0.5,
                      borderBottomWidth: 0.5,
                    }}>
                    {question.filePaths[0].substring(
                      question.filePaths[0].lastIndexOf('/') + 1,
                    )}
                  </Text>
                )}
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontSize: 15, marginRight: 15, alignSelf: 'center'}}>
                  {!student ? '' : student.realName}
                </Text>
                <Text style={{fontSize: 13, alignSelf: 'center'}}>
                  {convertTime(question.createTime)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 5,
                }}>
                <Icon
                  name="comment-text-outline"
                  size={18}
                  style={{
                    marginRight: 5,
                    alignSelf: 'center',
                    color: '#018ABE',
                  }}
                />
                <Text style={{color: 'black'}}>
                  {!answers ? 0 : answers.length}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          {!answers || answers.length == 0 ? (
            <></>
          ) : answers[0].bestAnswer == false ? (
            <></>
          ) : (
            <View
              style={{
                backgroundColor: '#d9c8fc',
                paddingBottom: 20,
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                  marginTop: 5,
                }}>
                Câu trả lời hay nhất
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  marginTop: 10,
                  borderRadius: 15,
                  padding: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <CustomAvatar
                      size={35}
                      rounded
                      text={answers[0].teacherDTO.realName}
                      url={answers[0].teacherDTO.avaPath}
                      containerStyle={{alignSelf: 'center'}}
                    />
                    <View style={{marginLeft: 8, alignSelf: 'center'}}>
                      <Text style={{fontSize: 15, color: 'black'}}>
                        {answers[0].teacherDTO.realName}
                      </Text>
                      <Text style={{fontSize: 12}}>
                        {convertTime(answers[0].createTime)}
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require('../../assets/images/bestAnswer.png')}
                    style={{height: 60, width: 60, top: -5}}
                    resizeMode="contain"
                  />
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 16, color: 'black'}}>
                    {answers[0].content}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
        <View style={{paddingStart: 10, paddingEnd: 10}}>
          {!answers ? (
            <ActivityIndicator size="large" />
          ) : answers.length == 0 ? (
            <View style={{alignSelf: 'center', marginTop: 50}}>
              <Text style={{fontSize: 16}}>
                Hiện tại chưa có câu trả lời nào
              </Text>
            </View>
          ) : (
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 20, color: '#0066cc'}}>
                Các câu trả lời
              </Text>
              <View>
                {answers.map((item, index) => {
                  if (item.bestAnswer == false) {
                    return (
                      <View
                        key={item.id}
                        style={{
                          backgroundColor: 'white',
                          marginTop: 10,
                          borderRadius: 15,
                          padding: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <CustomAvatar
                              size={35}
                              rounded
                              text={item.teacherDTO.realName}
                              url={item.teacherDTO.avaPath}
                              containerStyle={{alignSelf: 'center'}}
                            />
                            <View style={{marginLeft: 8}}>
                              <Text style={{fontSize: 15, color: 'black'}}>
                                {item.teacherDTO.realName}
                              </Text>
                              <Text style={{fontSize: 12}}>
                                {convertTime(item.createTime)}
                              </Text>
                            </View>
                          </View>
                          {answers[0].bestAnswer == true ? (
                            <></>
                          ) : (
                            <Pressable
                              onPress={() => {
                                handleChooseBestAnswer(item);
                              }}>
                              <Text
                                style={{
                                  borderWidth: 0.8,
                                  borderRadius: 5,
                                  paddingEnd: 3,
                                  paddingStart: 3,
                                }}>
                                Chọn là hay nhất
                              </Text>
                            </Pressable>
                          )}
                        </View>
                        <View style={{marginTop: 10}}>
                          <Text style={{fontSize: 16, color: 'black'}}>
                            {item.content}
                          </Text>
                        </View>
                        <ScrollView>
                          {!item.imgUrls || item.imgUrls == '' ? (
                            <></>
                          ) : (
                            item.imgUrls.map((url, index) => {
                              return <ImageQuestion url={url} key={url} />;
                            })
                          )}
                        </ScrollView>
                        {/* <View>
                          {!item.filePaths ? <></> : <Text>CÓA FILE</Text>}
                        </View> */}
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'white',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
});
