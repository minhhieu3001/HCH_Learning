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
import {useDispatch} from 'react-redux';
import {setLogin} from '../../redux/slice/loginSlice';
import ModalPopup from '../../components/Common/ModalPopup';

export default function SignInScreen(props) {
  const dispatch = useDispatch();
  const [activeEmail, setActiveEmail] = useState(false);
  const [activePass, setActivePass] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showResetPass, setShowResetPass] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPassword, setResetPassword] = useState('');

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
          console.log(response.data.object.token);
        } else {
          Alert.alert('Thông báo', 'Email hoặc mật khẩu không đúng!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleResetPassword = () => {
    if (!resetPassword || resetPassword == '') {
      Alert.alert('Thông báo', 'Bạn cần nhập email!');
    } else {
      axios
        .post(`${BASE_URL}/ums/forgetPassword/student`, {email: resetPassword})
        .then(res => {
          console.log(res.data);
          if (res.data.code != 0) {
            Alert.alert('Thông báo', 'Email không đúng');
          } else {
            setShowResetPass(false);
            Alert.alert(
              'Thông báo',
              'Mật khẩu mới của bạn đã được gửi đến email',
            );
          }
        });
    }
  };

  return (
    <View style={{width: WIDTH, height: HEIGHT}}>
      <ModalPopup visible={showResetPass}>
        <View
          style={{
            width: 300,
            backgroundColor: 'white',
            padding: 20,
            alignSelf: 'center',
            top: 200,
            borderRadius: 20,
          }}>
          <Text style={{alignSelf: 'center', fontSize: 18, color: 'black'}}>
            Nhập email nhận mật khẩu{' '}
          </Text>
          <Text style={{alignSelf: 'center', fontSize: 16, marginBottom: 20}}>
            ( Phải giống với email đăng ký )
          </Text>
          <TextInput
            style={{height: 50, borderWidth: 1, borderRadius: 15, padding: 10}}
            placeholder="Nhập email"
            onChangeText={text => setResetPassword(text)}
          />
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Pressable
              onPress={() => setShowResetPass(false)}
              style={{width: '50%', flexDirection: 'row'}}>
              <Text
                style={{alignSelf: 'center', marginLeft: '35%', fontSize: 16}}>
                Hủy bỏ
              </Text>
            </Pressable>
            <Pressable
              style={{width: '50%', flexDirection: 'row'}}
              onPress={() => {
                handleResetPassword();
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginLeft: '35%',
                  fontSize: 16,
                  color: '#02457A',
                }}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
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
        <Pressable style={{margin: 10}} onPress={() => setShowResetPass(true)}>
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
