import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigations/AppNav';
import SplashScreen from 'react-native-splash-screen';
import SessionNav from './src/navigations/SessionNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './src/constant/constants';
import axios from 'axios';
import Loading from './src/components/Common/Loading';
import {
  AnswerNotification,
  MessageNotification,
} from './src/service/PushNotification';
import messaging from '@react-native-firebase/messaging';
import {useDispatch, useSelector} from 'react-redux';
import {setCount} from './src/redux/slice/notificationSlice';
import {setData} from './src/redux/slice/pointSlice';
import {setLogin} from './src/redux/slice/loginSlice';

const App = () => {
  const dispatch = useDispatch();
  const [deviceToken, setDeviceToken] = useState(null);

  const isLogin = useSelector(state => {
    return state.login.isLogin;
  });

  messaging()
    .getToken()
    .then(fcmToken => {
      setDeviceToken(fcmToken);
    })
    .catch(err => console.log(err));

  const checkLogin = async () => {
    const data = await AsyncStorage.getItem('isLogin');
    if (data == 'true') {
      dispatch(setLogin(true));
    } else dispatch(setLogin(false));
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('fcm message home', remoteMessage);
      if (remoteMessage.data.type == 0) {
        const data = await AsyncStorage.getItem('notiCount');
        const newCount = JSON.stringify(JSON.parse(data) + 1);
        AsyncStorage.setItem('notiCount', newCount);
        dispatch(setCount(newCount));
        AnswerNotification();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    checkLogin();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      {isLogin == null ? (
        <Loading />
      ) : isLogin ? (
        <AppNav />
      ) : (
        <SessionNav deviceToken={deviceToken} />
      )}
    </NavigationContainer>
  );
};

export default App;
