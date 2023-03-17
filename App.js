import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigations/AppNav';
import SplashScreen from 'react-native-splash-screen';
import SessionNav from './src/navigations/SessionNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './src/constant/constants';
import axios from 'axios';
import Loading from './src/components/Common/Loading';
import {MessageNotification} from './src/service/PushNotification';
import messaging from '@react-native-firebase/messaging';
import {useDispatch} from 'react-redux';
import {setCount} from './src/redux/slice/notificationSlice';

const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(null);
  const [deviceToken, setDeviceToken] = useState(null);

  messaging()
    .getToken()
    .then(fcmToken => {
      setDeviceToken(fcmToken);
    })
    .catch(err => console.log(err));

  const checkLogin = async () => {
    const data = await AsyncStorage.getItem('isLogin');
    if (data == 'true') {
      setIsLogin(true);
    } else setIsLogin(false);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('fcm message home', remoteMessage);
      const data = await AsyncStorage.getItem('notiCount');
      const newCount = JSON.stringify(JSON.parse(data) + 1);
      AsyncStorage.setItem('notiCount', newCount);
      dispatch(setCount(newCount));
      // if (remoteMessage.data.type == 1) {
      //   MessageNotification();
      // }
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
        <AppNav setIsLogin={setIsLogin} />
      ) : (
        <SessionNav setIsLogin={setIsLogin} deviceToken={deviceToken} />
      )}
    </NavigationContainer>
  );
};

export default App;
