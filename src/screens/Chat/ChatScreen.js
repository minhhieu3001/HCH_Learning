import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import ChatTop from '../../components/Chat/ChatTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';
import Loading from '../../components/Common/Loading';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import {useFocusEffect} from '@react-navigation/native';
import CustomAvatar from '../../components/Common/CustomAvatar';

export default function ChatScreen({navigation}) {
  const dispatch = useDispatch();

  const [user, setUser] = useState(undefined);
  const [conversations, setConversations] = useState(undefined);
  const [newMsg, setNewMsg] = useState(null);

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

  const socket = useSelector(state => {
    return state.socket;
  });

  const handleNewMessage = async () => {
    if (newMsg) {
      const exist = conversations.filter(
        conversation => conversation.id == newMsg.from,
      );
      if (exist) {
        const cvsts = conversations.filter(
          conversation => conversation.id !== exist.id,
        );
        const newList = [exist, ...cvsts];
        setConversations(newList);
      }
    }
  };

  useEffect(() => {
    getUser();
    getConversations();
    if (socket.socket) {
      socket.socket.on('msg-receive', data => {
        setNewMsg(data);
      });
    }
  }, []);

  useEffect(() => {
    handleNewMessage();
  }, [newMsg]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabNav());
      getUser();
      getConversations();
      if (socket.socket) {
        socket.socket.on('msg-receive', data => {
          setNewMsg(data);
        });
      }
    }, []),
  );

  useEffect(() => {
    if (user) {
      socket.socket.emit('add-user', user.id);
    }
  }, [user]);

  useLayoutEffect(() => {
    console.log('aaaaaa');
  }, []);

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
  return (
    <View style={styles.container}>
      <ChatTop />
      <View>
        {!conversations ? (
          <Loading />
        ) : (
          <ScrollView
            onScroll={e => onScroll(e)}
            showsVerticalScrollIndicator={false}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {conversations.length == 0 ? (
                <></>
              ) : (
                conversations.map((item, index) => {
                  if (item.teacher.status === 0) {
                    return (
                      <Pressable
                        key={item.id}
                        onPress={() =>
                          navigation.navigate('chat-detail-screen', {
                            teacherId: item.teacher.id,
                            teacherName: item.teacher.realName,
                            teacherStatus: item.status,
                          })
                        }
                        style={{
                          marginTop: 20,
                          marginBottom: 10,
                          marginLeft: 10,
                          marginRight: 10,
                          height: 110,
                          width: 80,
                        }}>
                        <CustomAvatar
                          size={70}
                          text={item.teacher.realName}
                          url={
                            !item.teacher.avaPath ? '' : item.teacher.avaPath
                          }
                        />
                        <Icon
                          name="moon-full"
                          size={18}
                          style={{
                            color: 'green',
                            position: 'absolute',
                            left: 50,
                            top: 50,
                            padding: 1,
                            backgroundColor: 'white',
                            borderRadius: 9,
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
                return (
                  <Pressable
                    key={item.id}
                    onPress={() =>
                      navigation.navigate('chat-detail-screen', {
                        teacherId: item.teacher.id,
                        teacherName: item.teacher.realName,
                        teacherStatus: item.teacher.status,
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      width: WIDTH,
                      height: 80,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}>
                    <CustomAvatar
                      size={70}
                      text={item.teacher.realName}
                      url={!item.teacher.avaPath ? '' : item.teacher.avaPath}
                    />
                    <View style={{padding: 10, width: WIDTH - 80}}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: 'black',
                          fontWeight: '500',
                        }}>
                        {item.teacher.realName}
                      </Text>
                      <Text style={{fontSize: 16}} numberOfLines={1}>
                        {item.lastMessage}
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
