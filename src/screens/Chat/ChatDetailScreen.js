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
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
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
import {BASE_URL} from '../../constant/constants';
import Loading from '../../components/Common/Loading';

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

  const [seen, setSeen] = useState(false);

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
        `${BASE_URL}/chat/getMessage?studentId=${user.id}&teacherId=${teacherId}&page=0&size=100`,
        config,
      )
      .then(res => {
        console.log(res.data);
        if (res.data.code === 0) {
          setMessages(res.data.object);
        } else {
          setMessages([]);
        }
      });
  };

  const handleSendMsg = async msg => {
    if (msg) {
      scrollRef.current.scrollToEnd({animated: true});
      setInputHeight(50);
      socket.socket.emit('send-msg', {
        to: teacherId,
        senderId: user.id,
        senderName: user.realName,
        senderAvatar: user.avaPath,
        msg: msg,
        imageUrl: '',
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
          }
        });
      const msgs = [...messages, {fromId: user.id, message: msg}];
      setMessages(msgs);
    }
  };

  const getUser = async () => {
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    setUser(user);
  };

  useEffect(() => {
    dispatch(hideTabNav());
    getUser();
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

  useEffect(() => {
    if (socket.socket) {
      socket.socket.on('msg-receive', data => {
        console.log(data);
        setArrivalMessage({fromId: user.id, message: data.msg});
      });
    }
  }, []);

  useEffect(() => {
    if (user) {
      getMessages();
    }
  }, [user]);

  useEffect(() => {
    arrivalMessage && setMessages(prev => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <View style={{height: screenHeight, backgroundColor: '#D6E8EE'}}>
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
          onPress={() => navigation.navigate('detail-screen')}
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
          {teacherStatus == 0 ? (
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
              {teacherStatus == 0 ? 'Trực tuyến' : 'Ngoại tuyến'}
            </Text>
          </View>
        </Pressable>
      </View>
      <ScrollView
        style={{padding: 10}}
        ref={scrollRef}
        showsVerticalScrollIndicator={false}>
        {!messages || !user ? (
          <Loading />
        ) : (
          messages.map((message, index) => {
            return message.fromId === user.id ? (
              <UserMessage
                type="user_message"
                key={index}
                msg={message.message}
              />
            ) : (
              <TeacherMessage
                type="teacher_message"
                key={index}
                msg={message.message}
              />
            );
          })
        )}
        {!messages || messages.length === 0 ? (
          <></>
        ) : !messages[messages.length - 1].fromSelf ? (
          <></>
        ) : seen ? (
          <Avatar
            size={16}
            rounded
            title="US"
            containerStyle={{backgroundColor: '#3d4db7', alignSelf: 'flex-end'}}
          />
        ) : (
          <Icon
            name="check-circle"
            size={16}
            color="#018ABE"
            style={{alignSelf: 'flex-end'}}
          />
        )}
        <View style={{height: 75}}></View>
      </ScrollView>
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
          onChangeText={text => {
            setInputMsg(text);
          }}
        />
        <Icon
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
