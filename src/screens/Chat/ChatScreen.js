import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import ChatTop from '../../components/Chat/ChatTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/Common/Loading';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, TEACHER_ONLINE} from '../../constant/constants';
import {useFocusEffect} from '@react-navigation/native';
import CustomAvatar from '../../components/Common/CustomAvatar';
import Sound from 'react-native-sound';
import {hideTabNav, showTabNav} from '../../redux/slice/tabNavSlice';
import socket from '../../service/socket';

Sound.setCategory('Playback');
const newMsgSound = new Sound('new_msg.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

newMsgSound.setVolume(1);

export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();

  const [user, setUser] = useState(undefined);
  const [conversations, setConversations] = useState(undefined);
  const [newMsg, setNewMsg] = useState(null);
  const [listNewChat, setListNewChat] = useState([]);

  const getUser = async () => {
    const data = await AsyncStorage.getItem('user');
    if (data !== null) {
      const user = await JSON.parse(data);
      setUser(user);
    }
  };

  const getConversations = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    await axios.get(`${BASE_URL}/chat/student`, config).then(res => {
      if (res.data.code === 0) {
        setConversations(res.data.object);
      }
    });
  };

  const handleNewMessage = async () => {
    console.log('newMsg', newMsg);
    if (newMsg != null) {
      newMsgSound.play();
      const index = conversations.findIndex(
        obj => obj.teacher.id == newMsg.senderId,
      );
      const myObject = conversations.splice(index, 1)[0];
      myObject.lastMessage = newMsg.msg;
      const newList = [myObject, ...conversations];

      setConversations(newList);

      const newListLastChat =
        listNewChat.length == 0
          ? []
          : listNewChat.filter(obj => obj.id != myObject.id);

      const newChat = [
        ...newListLastChat,
        {
          id: myObject.id,
          type: 'text',
          msg: newMsg.msg,
          sendTime: new Date().getTime(),
        },
      ];
      setListNewChat(newChat);
      setNewMsg(null);
    }
  };

  const handleReadMessage = async id => {
    const newList = listNewChat.filter(obj => obj.id != id);
    setListNewChat(newList);
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${BASE_URL}/chat/student/read?chatId=${id}`, config)
      .then(res => {});
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
    getUser();
    getConversations();
    if (socket) {
      socket.on('msg-receive', data => {
        console.log('useEffect', data);
        setNewMsg(data);
      });
    }
  }, []);

  useEffect(() => {
    handleNewMessage();
  }, [newMsg]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabNav(true));
      getUser();
      getConversations();

      // if (socket.socket) {
      //   socket.socket.on('msg-receive', data => {
      //     console.log('useFocusEffect', data);
      //     setNewMsg(data);
      //   });
      // }
    }, []),
  );

  useEffect(() => {
    if (user) {
      socket.emit('add-user', user.id);
    }
  }, [user]);

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
  return (
    <View style={styles.container}>
      <ChatTop navigation={navigation} />
      <View>
        {!conversations ? (
          <Loading />
        ) : conversations.length == 0 ? (
          <Text style={{fontSize: 16, alignSelf: 'center', marginTop: 10}}>
            Bạn chưa có cuộc trò chuyện nào
          </Text>
        ) : (
          <ScrollView
            onScroll={e => onScroll(e)}
            showsVerticalScrollIndicator={false}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {conversations.length == 0 ? (
                <Text
                  style={{fontSize: 16, alignSelf: 'center', marginTop: 10}}>
                  Bạn chưa có cuộc trò chuyện nào
                </Text>
              ) : (
                conversations.map((item, index) => {
                  if (item.teacher.status === TEACHER_ONLINE) {
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() => {
                          navigation.navigate('chat-detail-screen', {
                            teacherId: item.teacher.id,
                            teacherName: item.teacher.realName,
                            teacherStatus: item.teacher.status,
                            avaUrl: item.teacher.avaPath,
                            chatId: item.id,
                          });
                          handleReadMessage(item.id);
                        }}
                        style={{
                          marginTop: 20,
                          marginBottom: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          height: 110,
                          width: 80,
                        }}>
                        {item.teacher.avaPath == 'null' ||
                        item.teacher.avaPath == null ? (
                          <CustomAvatar
                            size={60}
                            text={item.teacher.realName}
                            url={null}
                          />
                        ) : (
                          <CustomAvatar size={60} url={item.teacher.avaPath} />
                        )}
                        <Icon
                          name="moon-full"
                          size={14}
                          style={{
                            color: 'green',
                            position: 'absolute',
                            left: 55,
                            top: 42,
                            backgroundColor: 'white',
                            borderRadius: 8,
                          }}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            textAlign: 'center',
                            fontSize: 14,
                            color: 'black',
                          }}>
                          {item.teacher.realName}
                        </Text>
                      </Pressable>
                    );
                  }
                })
              )}
            </ScrollView>
            <View>
              {conversations?.map((item, index) => {
                console.log(index + ' ' + item.teacher.avaPath);
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('chat-detail-screen', {
                        teacherId: item.teacher.id,
                        teacherName: item.teacher.realName,
                        teacherStatus: item.teacher.status,
                        avaUrl: item.teacher.avaPath,
                        chatId: item.id,
                      });
                      handleReadMessage(item.id);
                    }}
                    style={{
                      flexDirection: 'row',
                      width: WIDTH,
                      height: 80,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <CustomAvatar
                      size={60}
                      text={item.teacher.realName}
                      url={item.teacher.avaPath}
                    />

                    <View style={{padding: 10, width: WIDTH - 80}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: 'black',
                            fontWeight: '500',
                          }}>
                          {item.teacher.realName}
                        </Text>
                        <Text>
                          {handleTime(
                            listNewChat.findIndex(obj => obj.id == item.id) !=
                              -1
                              ? listNewChat[
                                  listNewChat.findIndex(
                                    obj => obj.id == item.id,
                                  )
                                ].sendTime
                              : item.actionTime,
                          )}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          color:
                            !item.readStudentSize ||
                            listNewChat.findIndex(obj => obj.id == item.id) !=
                              -1
                              ? 'black'
                              : 'gray',
                          fontWeight:
                            !item.readStudentSize ||
                            listNewChat.findIndex(obj => obj.id == item.id) !=
                              -1
                              ? 'bold'
                              : 'normal',
                        }}
                        numberOfLines={1}>
                        {listNewChat.findIndex(obj => obj.id == item.id) !=
                          -1 && !item.readStudentSize
                          ? listNewChat[
                              listNewChat.findIndex(obj => obj.id == item.id)
                            ].type == 'text'
                            ? listNewChat[
                                listNewChat.findIndex(obj => obj.id == item.id)
                              ].msg
                            : 'Bạn có tin nhắn mới'
                          : item.lastMessage}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
  tab: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
  },
  active: {
    width: '50%',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#82cd',
  },
  inactive: {
    width: '50%',
    justifyContent: 'center',
  },
  textActive: {
    textAlign: 'center',
    fontSize: 16,
    color: '#82cd',
  },
  textInActive: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
