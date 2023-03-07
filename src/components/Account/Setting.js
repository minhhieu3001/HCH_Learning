import {View, Text, Pressable, StyleSheet, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import ModalPopup from '../Common/ModalPopup';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import {hideTabNav} from '../../actions/visibleTabNavAction';

const Button = ({iconName, text, press}) => {
  return (
    <Pressable
      onPress={() => press(iconName)}
      style={{
        flexDirection: 'row',
        height: 50,
        marginBottom: 1,
        backgroundColor: 'white',
      }}>
      <Icon name={iconName} size={24} color="#82c0d3" style={{padding: 10}} />
      <Text style={{marginLeft: 30, fontSize: 16, color: 'black', padding: 10}}>
        {text}
      </Text>
    </Pressable>
  );
};

export default function Setting({navigation, setIsLogin}) {
  const dispatch = useDispatch();

  const [showChangePass, setShowChangePass] = useState(false);

  const [oldPass, setOldPass] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [firmNewPass, setFirmNewPass] = useState(null);

  const handlePress = async buttonName => {
    if (buttonName === 'logout') {
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.setItem('user', '');
      setIsLogin(false);
    } else if (buttonName === 'key-change') {
      setShowChangePass(true);
    } else if (buttonName === 'history') {
      dispatch(hideTabNav());
      navigation.navigate('history-call-screen');
    } else if (buttonName === 'bell') {
      dispatch(hideTabNav());
      navigation.navigate('noti-screen');
    }
  };

  return (
    <View style={styles.container}>
      <ModalPopup visible={showChangePass}>
        <View
          style={{
            width: WIDTH - 40,
            backgroundColor: 'white',
            alignSelf: 'center',
            top: HEIGHT / 2 - 200,
            borderRadius: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View>
              <Text style={styles.left}>Mật khẩu cũ</Text>
              <Text style={styles.left}>Mật khẩu mới</Text>
              <Text style={styles.left}>Xác nhận</Text>
            </View>
            <View>
              <TextInput style={styles.right} />
              <TextInput style={styles.right} />
              <TextInput style={styles.right} />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 1,
              marginTop: 20,
              height: 45,
            }}>
            <Pressable
              style={{
                width: '50%',
                borderRightWidth: 1,
                flexDirection: 'row',
              }}
              onPress={() => {
                setShowChangePass(false);
              }}>
              <Text
                style={{alignSelf: 'center', marginLeft: '40%', fontSize: 16}}>
                Hủy bỏ
              </Text>
            </Pressable>
            <Pressable
              style={{width: '50%'}}
              onPress={() => {
                setShowChangePass(false);
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: '40%',
                  fontSize: 16,
                  color: '#02457A',
                }}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <Button iconName="key-change" text="Đổi mật khẩu" press={handlePress} />
      <Button iconName="bell" text="Thông báo" press={handlePress} />
      <Button iconName="history" text="Lịch sử cuộc gọi" press={handlePress} />
      <Button iconName="help-circle" text="Trợ giúp" press={handlePress} />
      <Button iconName="logout" text="Đăng xuất" press={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    width: WIDTH,
    alignSelf: 'center',
  },
  left: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
    marginBottom: 18,
  },
  right: {
    width: 180,
    borderWidth: 1,
    height: 45,
    marginBottom: 5,
    borderRadius: 15,
  },
});
