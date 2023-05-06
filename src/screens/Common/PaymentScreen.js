import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import {useDispatch} from 'react-redux';
import {setData} from '../../redux/slice/pointSlice';

export default function PaymentScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {url} = route.params;

  const [oldTitle, setOldTitle] = useState(null);

  const handleWebViewMessage = event => {
    console.log('event', event);
  };

  const handleSavePayment = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const money_str = await AsyncStorage.getItem('money');
    const money = JSON.parse(money_str);
    const data = await AsyncStorage.getItem('user');
    const user = JSON.parse(data);
    user.point += money * 100;
    const new_User = JSON.stringify(user);
    AsyncStorage.setItem('user', new_User);
    dispatch(setData(user.point));
    const body = {
      studentId: user.id,
      money: money,
      type: 'addPoint',
    };

    console.log(body);

    axios.post(`${BASE_URL}/payment/point/action`, body, config).then(res => {
      console.log(res.data);
    });
  };

  const handleOldTitle = item => {
    if (item.title == 'Chọn phương thức thanh toán') {
      setOldTitle(true);
    } else {
      setOldTitle(false);
    }
  };

  return (
    <WebView
      source={{
        uri: url,
      }}
      onNavigationStateChange={navState => {
        console.log(navState);
        handleOldTitle(navState);
        if (
          navState.url ==
          'https://pay.vnpay.vn/Transaction/Error.html?aspxerrorpath=/Transaction/Complete.html'
        ) {
          if (!oldTitle) {
            handleSavePayment();
            Alert.alert('Thông báo', 'Giao dịch thành công!');
          }
          navigation.goBack();
        }
      }}
      onMessage={handleWebViewMessage}
    />
  );
}
