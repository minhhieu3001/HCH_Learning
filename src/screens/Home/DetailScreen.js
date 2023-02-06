import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from '../../components/Common/Rate';
import * as Progress from 'react-native-progress';

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

const DetailScreen = ({navigation}) => {
  const classes = [6, 7, 8, 9];
  const subjects = [
    'Toán học',
    ' Ngoại ngữ',
    'Ngữ văn',
    'Vật lí',
    'Hóa học',
    'Sinh học',
    'lịch sử',
  ];
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="keyboard-backspace"
          size={30}
          style={{color: '#82cd', paddingTop: 10, paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 0.5,
              height: 30,
              paddingStart: 10,
              paddingEnd: 10,
              alignSelf: 'center',
              borderRadius: 20,
              alignItems: 'center',
              marginEnd: 10,
            }}>
            <Text>1234P</Text>
            <Icon
              name="plus-circle-outline"
              size={20}
              style={{marginLeft: 5, color: '#82dc'}}
            />
          </View>

          <Icon
            name="dots-vertical"
            size={30}
            style={{color: '#82cd', paddingTop: 10, paddingRight: 10}}
            onPress={() => {}}
          />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/images/background.png')}
            style={styles.background}
            resizeMode="cover"
          />
          <Image
            source={require('../../assets/images/images.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Pressable style={styles.addFavorite}>
            <Icon name="plus" size={24} />
            <Text style={{fontSize: 16}}>Thêm vào yêu thích</Text>
          </Pressable>
        </View>
        <View style={styles.userInfo}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <Icon name="check-circle" size={20} color="green" />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 8,
                color: 'green',
              }}>
              Đang trực tuyến
            </Text>
          </View>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Tên giáo viên
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 24,
            }}>
            <Rate starNumber={5} isChoose={false} size={14} />
            <Text style={{fontSize: 14, color: '#e68a00', paddingStart: 5}}>
              5.0
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
              <Text> 5p/1 kí tự</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 20,
                justifyContent: 'center',
              }}>
              <Icon name="phone-outline" size={14} />
              <Text> 50p/1 phút</Text>
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
                Các lớp học
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: WIDTH,
                  flex: 1,
                }}>
                {classes.map((item, index) => {
                  return <Item text={item} key={index} />;
                })}
              </View>
            </View>
            <View style={styles.subject}>
              <Text style={{fontSize: 18, color: 'black', width: 120}}>
                Các môn học
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: WIDTH,
                  flex: 1,
                }}>
                {subjects.map((item, index) => {
                  return <Item text={item} key={index} />;
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.introduction}>
          <Text style={{fontSize: 18, marginBottom: 10, marginLeft: 10}}>
            Tự giới thiệu của giáo viên
          </Text>
          <View elevation={3} style={styles.viewShadow}>
            <Text>
              Lời tự giới thiệu của giáo viên, tên tuổi, tính cách, phong cách
              dạy, các chứng chỉ, kinh nghiệm......
            </Text>
            <View style={{borderBottomWidth: 0.5, height: 20}}></View>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-evenly',
              }}>
              <Icon name="facebook" size={16} />
              <Icon name="gmail" size={16} />
            </View>
          </View>
        </View>
        <View style={styles.introduction}>
          <Text style={{fontSize: 18, marginBottom: 10, marginLeft: 10}}>
            Bài đăng của giáo viên
          </Text>
          <View elevation={3} style={styles.viewShadow}>
            <View style={styles.timelineTop}>
              <Image
                source={require('../../assets/images/images.png')}
                style={{width: 40, height: 40, borderRadius: 20}}
                resizeMode="cover"
              />
              <Text style={{fontSize: 16, marginLeft: 10, color: 'black'}}>
                Tên giáo viên
              </Text>
              <Text style={{fontSize: 12, marginLeft: 'auto'}}>
                2022/10/18 13:30
              </Text>
            </View>
            <View>
              <Text>Đoạn này là nội dung của bài post</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 5,
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: 80,
                }}>
                <Icon name="cards-heart-outline" size={24} />
                <Icon name="comment-edit-outline" size={24} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 160,
                }}>
                <Text>10 lượt thích</Text>
                <Text>0 bình luận</Text>
              </View>
            </View>
            <Pressable style={{height: 30}}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'purple',
                  alignSelf: 'center',
                  top: 8,
                }}>
                Xem thêm
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.introduction}>
          <Text style={{fontSize: 18, marginBottom: 10, marginLeft: 10}}>
            Đánh giá về giáo viên
          </Text>
          <View elevation={3} style={styles.viewShadow}>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  Đánh giá
                </Text>
                <Pressable>
                  <Text style={{color: 'blue', fontSize: 14}}>Xem tất cả</Text>
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
                    style={{color: 'black', alignSelf: 'center', fontSize: 20}}>
                    /5
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>1</Text>
                      <Image
                        source={require('../../assets/images/star_filled.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>2</Text>
                      <Image
                        source={require('../../assets/images/star_filled.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>3</Text>
                      <Image
                        source={require('../../assets/images/star_filled.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text>4</Text>
                      <Image
                        source={require('../../assets/images/star_filled.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      elevation={2}
                      style={{
                        marginVertical: 3,
                        paddingBottom: 5,
                        paddingLeft: 5,
                        paddingRight: 5,
                        borderRadius: 10,
                        shadowColor: 'gray',
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        shadowOffset: {
                          height: 1,
                          width: 1,
                        },
                      }}>
                      <Rate starNumber={item.star} isChoose={false} size={14} />
                      <Text style={{fontSize: 16, color: 'black'}}>
                        {item.content}
                      </Text>
                      <View
                        style={{
                          borderBottomWidth: 0.3,
                          borderBottomColor: 'gray',
                          height: 10,
                        }}
                      />
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
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={{height: 20}}></View>
      </ScrollView>
      <View style={{height: 70, backgroundColor: 'white'}}></View>
      <View style={styles.bottomView}>
        <Pressable
          style={{
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: 'pink',
            height: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: WIDTH / 2 - 20,
          }}>
          <Icon name="chat-processing-outline" size={32} />
          <Text>Nhắn tin</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('call-screen')}
          style={{
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: 'pink',
            height: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: WIDTH / 2 - 20,
          }}>
          <Icon name="phone" size={32} />
          <Text>Gọi điện</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: '#ccffff',
  },
  header: {
    flexDirection: 'row',
    width: WIDTH,
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
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
  },
  addFavorite: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    height: 25,
    width: 170,
    position: 'absolute',
    bottom: -12.5,
    borderRadius: 14,
    right: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'green',
  },
  userInfo: {
    marginTop: 60,
    padding: 10,
    backgroundColor: 'white',
  },
  bottomView: {
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: '#8cd',
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
  },
  viewShadow: {
    backgroundColor: 'white',
    width: WIDTH - 20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  timelineTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
