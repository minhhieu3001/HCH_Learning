import {View, Text, ActivityIndicator, Image, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Item = ({money, navigation}) => {
  const handlePress = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/point/genTokens?amount=${money * 100000}`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          const money_save = JSON.stringify(money);
          AsyncStorage.setItem('money', money_save);
          const url = `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${res.data.object.queryUrl}`;
          navigation.navigate('payment-screen', {url: url});
        }
      });
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 80,
        marginBottom: 10,
        elevation: 3,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../../assets/images/point.png')}
          style={{width: 35, height: 35, margin: 5, alignSelf: 'center'}}
        />
        <Text
          style={{
            alignSelf: 'center',
            marginLeft: 20,
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
          }}>
          {money * 100} P
        </Text>
      </View>
      <Pressable
        onPress={() => {
          handlePress();
        }}
        style={{
          backgroundColor: '#0192cb',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 10,
          width: 120,
        }}>
        <Text style={{fontSize: 16, color: 'white', textAlign: 'center'}}>
          {money}.000 VNĐ
        </Text>
      </Pressable>
    </View>
  );
};

export default function ChoosePayment({navigation}) {
  const point = useSelector(state => {
    return state.pointSlice.data;
  });

  return (
    <View style={{height: '100%', backgroundColor: '#D6E8EE'}}>
      <View
        style={{
          backgroundColor: 'white',
          height: 55,
          borderBottomWidth: 0.5,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <Icon
          name="keyboard-backspace"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center', paddingLeft: 10}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 22,
            alignSelf: 'center',
            marginLeft: 10,
          }}>
          Chọn gói thanh toán
        </Text>
      </View>

      {!point ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={{
            marginTop: 1,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 100,
          }}>
          <Text style={{fontSize: 16}}>Số point hiện tại: </Text>
          <Image
            source={require('../../assets/images/point.png')}
            style={{width: 30, height: 30, margin: 5}}
          />
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            {point} P
          </Text>
        </View>
      )}
      <View style={{padding: 10}}>
        <Item money={10} navigation={navigation} />
        <Item money={20} navigation={navigation} />
        <Item money={50} navigation={navigation} />
        <Item money={100} navigation={navigation} />
        <Item money={200} navigation={navigation} />
        <Item money={500} navigation={navigation} />
      </View>
    </View>
  );
}
