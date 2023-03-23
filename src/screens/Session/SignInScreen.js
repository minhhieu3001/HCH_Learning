import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '../../service/socket';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../redux/slice/loginSlice';

export default function SignInScreen(props) {
  const dispatch = useDispatch();
  const [activeEmail, setActiveEmail] = useState(false);
  const [activePass, setActivePass] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {navigation, deviceToken} = props;

  const login = () => {
    axios({
      method: 'post',
      url: `${BASE_URL}/ums/session/student`,
      data: {
        email: email,
        password: password,
        tokenDevice: deviceToken,
      },
    })
      .then(function (response) {
        if (response.data.code == 0) {
          const user = JSON.stringify(response.data.object);
          AsyncStorage.setItem('isLogin', 'true');
          AsyncStorage.setItem('user', user);
          AsyncStorage.setItem('token', response.data.object.token);
          const notiCount = JSON.stringify(0);
          AsyncStorage.setItem('notiCount', notiCount);
          dispatch(setLogin(true));
          socket.emit('add-user', response.data.object.id);
          console.log(response.data.object.token);
        } else {
          Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{width: WIDTH, height: HEIGHT}}>
      <View>
        <Image
          source={require('../../assets/images/background.png')}
          style={{width: WIDTH, height: HEIGHT}}
          resizeMode="cover"
        />
      </View>
      <Image
        source={require('../../assets/images/logo_app.png')}
        resizeMode="cover"
        style={styles.logo}
      />
      <View style={styles.signIn}>
        <TextInput
          onFocus={() => setActiveEmail(true)}
          onEndEditing={() => setActiveEmail(false)}
          style={{
            borderBottomColor: activeEmail ? '#02457A' : 'gray',
            borderBottomWidth: 1,
            paddingLeft: 10,
            marginLeft: 10,
            marginRight: 10,
            fontSize: 18,
            marginBottom: 3,
          }}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
        <View>
          <TextInput
            onFocus={() => setActivePass(true)}
            onEndEditing={() => setActivePass(false)}
            style={{
              borderBottomColor: activePass ? '#02457A' : 'gray',
              borderBottomWidth: 1,
              paddingLeft: 10,
              marginLeft: 10,
              marginRight: 10,
              fontSize: 18,
              marginBottom: 3,
            }}
            secureTextEntry={!showPass}
            placeholder="Mật khẩu"
            onChangeText={text => setPassword(text)}
          />
          <Icon
            name={showPass ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="black"
            style={{position: 'absolute', bottom: 12, right: 20}}
            onPress={() => setShowPass(!showPass)}
          />
        </View>
        <Pressable
          onPress={() => {
            login();
          }}
          style={{
            backgroundColor: '#018ABE',
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            height: 50,
            elevation: 5,
            justifyContent: 'center',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20, color: 'white'}}>
            Đăng nhập
          </Text>
        </Pressable>
        <Pressable style={{margin: 10}}>
          <Text style={{fontSize: 16, textAlign: 'center', color: '#018ABE'}}>
            Quên mật khẩu
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('sign-up-screen')}
          style={{marginBottom: 15}}>
          <Text style={{fontSize: 16, textAlign: 'center', color: '#018ABE'}}>
            Đăng ký
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  signIn: {
    backgroundColor: 'white',
    width: WIDTH - 70,
    position: 'absolute',
    left: 35,
    bottom: 250,
    elevation: 5,
    padding: 15,
  },
  logo: {
    width: 210,
    height: 80,
    position: 'absolute',
    left: WIDTH / 2 - 105,
    bottom: 250 + 300,
  },
});
