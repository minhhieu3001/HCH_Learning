import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  Platform,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import TeacherMessage from '../../components/Chat/TeacherMessage';
import UserMessage from '../../components/Chat/UserMessage';
import {Avatar} from '@rneui/themed';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL, TEACHER_ONLINE} from '../../constant/constants';
import Loading from '../../components/Common/Loading';
import {launchImageLibrary} from 'react-native-image-picker';
import Sound from 'react-native-sound';
import {RNS3} from 'react-native-aws3';
import {accessKey, secretKey} from '../../constant/awsKey';

Sound.setCategory('Playback');
const newMsgSound = new Sound('new_msg.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

newMsgSound.setVolume(1);

export default function ChatDetailScreen({navigation}) {
  const route = useRoute();
  const {teacherId, teacherName, teacherStatus} = route.params;

  const input = useRef(null);
  const scrollRef = useRef(null);

  const socket = useSelector(state => {
    return state.socket;
  });

  const dispatch = useDispatch();
  const keyboardEventEmitter =
    Platform.OS === 'ios' ? new NativeEventEmitter(Keyboard) : Keyboard;

  const [inputHeight, setInputHeight] = useState(50);
  const [screenHeight, setScreenHeight] = useState(HEIGHT);

  const [user, setUser] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');

  const [page, setPage] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [file, setFile] = useState(null);

  const [chatId, setChatId] = useState(null);

  const handleContentSizeChange = event => {
    setInputHeight(event.nativeEvent.contentSize.height);
  };

  const _keyboardDidShow = e => {
    setScreenHeight(HEIGHT - e.endCoordinates.height);
    setInputHeight(50);
  };

  const _keyboardDidHide = () => {
    setScreenHeight(HEIGHT);
    setInputHeight(50);
  };

  const getMessages = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/chat/getMessage?studentId=${user.id}&teacherId=${teacherId}&page=${page}&size=14`,
        config,
      )
      .then(res => {
        if (res.data.code === 0) {
          const msgs = res.data.object.concat(messages);
          setMessages(msgs);
          scrollRef.current.scrollTo({y: 900, animated: true});
        } else {
          setMessages([]);
        }
        setLoadMore(false);
      });
  };

  const handleSendMsg = async msg => {
    if (msg != '' && msg != null) {
      setInputHeight(50);
      socket.socket.emit('send-msg', {
        to: teacherId,
        senderId: user.id,
        senderName: user.realName,
        senderAvatar: user.avaPath,
        msg: msg,
        imgUrl: '',
      });

      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: {
          Authorization: token,
        },
      };
      axios
        .post(
          `${BASE_URL}/chat/student`,
          {
            toId: teacherId,
            message: msg,
            filePath: '',
          },
          config,
        )
        .then(res => {
          if (res.data.code === 0) {
            setChatId(res.data.object.chatId);
          }
        });
      const msgs = [
        ...messages,
        {fromId: user.id, message: msg, sendTime: new Date().getTime()},
      ];
      setMessages(msgs);
      scrollRef.current.scrollToEnd({animated: true});
    }
  };

  const getUser = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    setUser(user);
  };

  const handleLoadMore = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    if (currentOffset === 0) {
      setPage(page + 1);
      setLoadMore(true);
    }
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        allowsEditing: true,
      },
      async response => {
        if (response.didCancel) {
          setFile(null);
        } else if (response.error) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại');
        } else {
          const file = {
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          };
          setFile(file);
          const config = {
            keyPrefix: 'chat_images/',
            bucket: 'bookstoreimages',
            region: 'us-east-1',
            accessKey: accessKey,
            secretKey: secretKey,
            successActionStatus: 201,
          };
          RNS3.put(file, config);

          socket.socket.emit('send-msg', {
            to: teacherId,
            senderId: user.id,
            senderName: user.realName,
            senderAvatar: user.avaPath,
            msg: null,
            imgUrl: `https://bookstoreimages.s3.us-east-1.amazonaws.com/chat_images/${file.name}`,
          });

          const token = await AsyncStorage.getItem('token');
          const configHeader = {
            headers: {
              Authorization: token,
            },
          };
          axios.post(
            `${BASE_URL}/chat/student`,
            {
              toId: teacherId,
              message: '',
              filePath: `https://bookstoreimages.s3.us-east-1.amazonaws.com/chat_images/${file.name}`,
            },
            configHeader,
          );
        }
      },
    );
  };

  const readMessage = async id => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios.get(`${BASE_URL}/chat/student/read?chatId=${id}`, config);
  };

  //ban phim
  useEffect(() => {
    dispatch(hideTabNav());
    getUser();
    if (scrollRef) scrollRef.current.scrollToEnd();
    const keyboardDidShowListener = keyboardEventEmitter.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    const keyboardDidHideListener = keyboardEventEmitter.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  //socket
  useEffect(() => {
    if (socket.socket) {
      socket.socket.on('msg-receive', data => {
        console.log('msg-receive', data);
        if (data.senderId == teacherId) {
          newMsgSound.play();
          if (data.msg == null || data.msg == '') {
            setArrivalMessage({
              fromId: teacherId,
              message: null,
              filePath: data.imgUrl,
              sendTime: new Date().getTime(),
            });
            console.log('aaaaaaaaaaaaaaaaaaaa', arrivalMessage);
          } else {
            setArrivalMessage({
              fromId: teacherId,
              message: data.msg,
              filePath: null,
              sendTime: new Date().getTime(),
            });
          }

          readMessage(chatId);
        }
      });
    }
  }, []);

  //load more
  useEffect(() => {
    setFirst(false);
    if (user) {
      getMessages();
    }
  }, [user, loadMore]);

  //receive message
  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
    scrollRef.current.scrollToEnd({animated: true});
  }, [arrivalMessage]);

  //send image
  useEffect(() => {
    if (file) {
      const msgs = [
        ...messages,
        {
          fromId: user.id,
          message: null,
          filePath: file.uri,
          sendTime: new Date().getTime(),
        },
      ];
      setMessages(msgs);
      setFile(null);
      scrollRef.current.scrollToEnd({animated: true});
    }
  }, [file]);

  return (
    <View style={{height: screenHeight, backgroundColor: '#D6E8EE', flex: 1}}>
      <View style={styles.top}>
        <Icon
          onPress={() => {
            navigation.goBack();
          }}
          name="arrow-left"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center', marginLeft: 10}}
        />
        <Pressable
          onPress={() =>
            navigation.navigate('detail-screen', {teacherId: teacherId})
          }
          style={{flexDirection: 'row', marginLeft: 10}}>
          <Image
            source={require('../../assets/images/images.png')}
            style={{
              width: 45,
              height: 45,
              alignSelf: 'center',
              borderRadius: 22.5,
            }}
          />
          {teacherStatus == TEACHER_ONLINE ? (
            <Icon
              name="moon-full"
              size={14}
              style={{
                color: 'green',
                backgroundColor: 'white',
                padding: 1,
                position: 'absolute',
                top: 32,
                left: 30,
                borderRadius: 7.5,
              }}
            />
          ) : (
            <View></View>
          )}
          <View style={{alignSelf: 'center', marginLeft: 10}}>
            <Text style={{fontSize: 18, color: 'black'}}>{teacherName}</Text>
            <Text style={{fontSize: 12}}>
              {teacherStatus == TEACHER_ONLINE ? 'Trực tuyến' : 'Ngoại tuyến'}
            </Text>
          </View>
        </Pressable>
      </View>
      <ScrollView
        snapToEnd={false}
        onScroll={e => handleLoadMore(e)}
        style={{padding: 10}}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        {!messages || !user ? (
          <Loading />
        ) : (
          messages.map((message, index) => {
            return message.fromId == user.id ? (
              message.message == null || message.message == '' ? (
                <UserMessage
                  type="user_image"
                  key={index}
                  msg={message.filePath}
                  time={message.sendTime}
                />
              ) : (
                <UserMessage
                  type="user_message"
                  key={index}
                  msg={message.message}
                  time={message.sendTime}
                />
              )
            ) : message.message == null || message.message == '' ? (
              <TeacherMessage
                type="teacher_image"
                key={index}
                time={message.sendTime}
                msg={message.filePath}
              />
            ) : (
              <TeacherMessage
                type="teacher_message"
                key={index}
                msg={message.message}
                time={message.sendTime}
              />
            );
          })
        )}

        <View style={{height: 10}}></View>
      </ScrollView>
      <View style={{height: 60}}></View>
      <View
        style={{
          position: 'absolute',
          top: screenHeight - inputHeight - 10,
          backgroundColor: 'white',
          width: WIDTH,
          minHeight: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 5,
          paddingBottom: 5,
        }}>
        <TextInput
          ref={input}
          style={{
            height: inputHeight,
            backgroundColor: '#f2f2f2',
            width: WIDTH - 120,
            borderRadius: 25,
            marginLeft: 10,
            paddingLeft: 15,
            paddingRight: 15,
            fontSize: 16,
          }}
          onContentSizeChange={handleContentSizeChange}
          placeholder="Nhắn tin"
          placeholderStyle={{marginLeft: 20, fontSize: 14}}
          multiline={true}
          onFocus={() => scrollRef.current.scrollToEnd({animated: true})}
          onChangeText={text => {
            setInputMsg(text);
          }}
        />
        <Icon
          onPress={() => pickImage()}
          name="image"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center'}}
        />
        <Icon
          onPress={() => {
            handleSendMsg(inputMsg);
            input.current.clear();
          }}
          name="send"
          size={30}
          style={{color: '#018ABE', marginRight: 10, alignSelf: 'center'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'white',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 23,
  },
});
