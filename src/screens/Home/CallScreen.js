import {View, Text, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import socket from '../../service/socket';
import {useDispatch} from 'react-redux';
import {minusPoint} from '../../redux/slice/pointSlice';
import ModalPopup from '../../components/Common/ModalPopup';

export default function CallScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {teacherId} = route.params;
  const [hidden, setHidden] = useState(false);
  const [cname, setCname] = useState(null);
  const [rtcToken, setRtcToken] = useState(null);
  const [time, setTime] = useState(null);

  const handlePress = () => {
    setHidden(false);
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  };

  const getData = async () => {
    const cname = await AsyncStorage.getItem('cname');
    setCname(cname);
    const string_token = await AsyncStorage.getItem('rtcToken');
    const rtcToken = JSON.parse(string_token);
    setRtcToken(rtcToken);
    const data = await AsyncStorage.getItem('timeCall');
    const time = JSON.parse(data);
    setTime(time);
  };

  const sendEndCall = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(
        `${BASE_URL}/call/endCall`,
        {toId: teacherId, callOption: 1},
        config,
      )
      .then(async res => {
        console.log(res.data);
        if (res.data.code == 0) {
          socket.emit('endCall', {
            to: teacherId,
          });
          dispatch(minusPoint(res.data.object));
          const data = await AsyncStorage.getItem('user');
          const user = JSON.parse(data);
          user.point -= res.data.object;
          const new_user = JSON.stringify(user);
          AsyncStorage.setItem('user', new_user);
        }
      });
  };

  useEffect(() => {
    console.log(cname, rtcToken);
    setTimeout(() => {
      setHidden(true);
    }, 5000);
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let timer;
    if (time) {
      timer = setInterval(() => {
        navigation.goBack();
        setTime(null);
      }, time);
    }
    return () => clearInterval(timer);
  }, [time]);

  const connectionData = {
    appId: '84e6846fa5ca43c68fe534ebd95b4730',
    channel: cname,
    token: rtcToken,
  };

  const rtcCallbacks = {
    EndCall: () => {
      AsyncStorage.setItem('review', 'true');
      navigation.goBack();
      sendEndCall();
      AsyncStorage.setItem('rtcToken', '');
      AsyncStorage.setItem('cname', '');
      socket.emit('endCall', {
        to: teacherId,
      });
    },
  };

  return (
    <Pressable
      style={{width: '100%', height: '100%'}}
      onPress={() => handlePress()}>
      {!cname && !rtcToken ? (
        <></>
      ) : (
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={rtcCallbacks}
          styleProps={{
            localBtnContainer: {
              bottom: -18,
            },
            localBtnStyles: {
              endCall: {
                testID: 'Kết thúc',
              },
              switchCamera: {
                backgroundColor: '#018ABE',
                borderColor: '#018ABE',
              },
              muteLocalVideo: {
                backgroundColor: '#018ABE',
                borderColor: '#018ABE',
              },
              muteLocalAudio: {
                backgroundColor: '#018ABE',
                borderColor: '#018ABE',
              },
            },
            BtnTemplateContainer: {
              display: hidden ? 'none' : 'flex',
            },
          }}
        />
      )}
    </Pressable>
  );
}
