import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigations/AppNav';
import SplashScreen from 'react-native-splash-screen';
import SessionNav from './src/navigations/SessionNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './src/constant/constants';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Loading from './src/components/Common/Loading';

const App = () => {
  const [isLogin, setIsLogin] = useState(null);

  const checkLogin = async () => {
    const data = await AsyncStorage.getItem('isLogin');
    if (data == 'true') {
      setIsLogin(true);
    } else setIsLogin(false);
  };

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
        <SessionNav setIsLogin={setIsLogin} />
      )}
    </NavigationContainer>
  );
};

export default App;
