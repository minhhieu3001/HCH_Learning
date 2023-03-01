import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPopup from '../../components/Common/ModalPopup';
import {subjects} from '../../data/subjects';
import CheckBox from '@react-native-community/checkbox';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';

const Item = ({item, choose, addSubject, removeSubject}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(choose);

  useEffect(() => {}, []);

  return (
    <View
      key={item.id}
      style={{
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          alignSelf: 'center',
          marginLeft: 10,
        }}>
        {item.name}
      </Text>
      <CheckBox
        style={{
          alignSelf: 'center',
          marginRight: 10,
        }}
        disabled={false}
        value={toggleCheckBox}
        onValueChange={() => {
          setToggleCheckBox(!toggleCheckBox);
          !toggleCheckBox ? addSubject(item.name) : removeSubject(item.name);
        }}
      />
    </View>
  );
};

export default function SignUpScreen({navigation}) {
  const radio_props = [
    {label: 'Nam', value: 1},
    {label: 'Nữ', value: 2},
  ];

  const [checkRegister, setCheckRegister] = useState(0);
  const [showSubject, setShowSubject] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(1);
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState([]);

  const addSubject = name => {
    subject.push(name);
    setSubject(subject);
  };

  const removeSubject = async name => {
    const newList = subject.filter(function (value, index, arr) {
      return value != name;
    });
    setSubject(newList);
  };

  useEffect(() => {}, []);
  return (
    <View style={{backgroundColor: '#D6E8EE', height: HEIGHT, width: WIDTH}}>
      <View style={styles.top}>
        <Icon
          onPress={() => navigation.goBack()}
          name="arrow-left"
          size={30}
          style={{color: '#018ABE', alignSelf: 'center'}}
        />
        <Text
          style={{
            fontSize: 26,
            color: '#02457A',
            alignSelf: 'center',
            marginLeft: 30,
          }}>
          Đăng ký
        </Text>
      </View>
      <ModalPopup visible={showSubject}>
        <View
          style={{
            backgroundColor: 'white',
            width: WIDTH - 60,
            alignSelf: 'center',
            top: 100,
            borderRadius: 5,
            padding: 10,
          }}>
          <Text
            style={{
              borderBottomWidth: 1,
              height: 50,
              fontSize: 20,
              textAlign: 'center',
              paddingTop: 5,
              color: 'black',
            }}>
            Môn học
          </Text>
          <View>
            {subjects.map((item, index) => {
              return (
                <Item
                  key={index}
                  item={item}
                  choose={subject.includes(item.name)}
                  addSubject={addSubject}
                  removeSubject={removeSubject}
                />
              );
            })}
          </View>
          <View
            style={{
              height: 45,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Pressable
              style={{width: 100, alignSelf: 'center'}}
              onPress={() => {
                setShowSubject(false);
                setSubject([]);
              }}>
              <Text style={{fontSize: 16}}>Hủy</Text>
            </Pressable>
            <Pressable
              style={{width: 100, alignSelf: 'center'}}
              onPress={() => {
                setShowSubject(false);
              }}>
              <Text style={{fontSize: 16, color: 'black'}}>Xác nhận</Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <>
        {checkRegister === 0 ? (
          <></>
        ) : checkRegister === 1 ? (
          <Text style={styles.error}>Hãy điền email</Text>
        ) : checkRegister === 2 ? (
          <Text style={styles.error}>Xác nhận mật khẩu thất bại</Text>
        ) : checkRegister === 3 ? (
          <Text style={styles.error}>Hãy điền họ tên của bạn</Text>
        ) : checkRegister === 4 ? (
          <Text style={styles.error}>Hãy điền ngày sinh của bạn</Text>
        ) : checkRegister === 5 ? (
          <Text style={styles.error}>Hãy điền số điện thoại</Text>
        ) : checkRegister === 6 ? (
          <Text style={styles.error}>Hãy điền lớp </Text>
        ) : checkRegister === 7 ? (
          <Text style={styles.error}>Hãy chọn môn học</Text>
        ) : (
          <></>
        )}
      </>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <Text style={styles.left}>Email:</Text>
          <TextInput
            style={styles.right}
            placeholder="Nhập email"
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Mật khẩu:</Text>
          <TextInput
            style={styles.right}
            placeholder="Nhập mật khẩu"
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Xác nhận mật khẩu:</Text>
          <TextInput
            style={styles.right}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={true}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Họ và tên:</Text>
          <TextInput
            style={styles.right}
            placeholder="vd: Nguyễn Văn A"
            onChangeText={text => {
              setFullName(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Ngày sinh:</Text>
          <TextInput
            style={{
              width: 50,
              backgroundColor: 'white',
              borderRadius: 20,
              paddingLeft: 10,
              fontSize: 16,
              paddingRight: 10,
            }}
            placeholder="30"
            onChangeText={text => {
              setDate(text);
            }}
          />
          <Text style={{fontSize: 30, alignSelf: 'center'}}>
            {}-{}
          </Text>
          <TextInput
            style={{
              width: 50,
              backgroundColor: 'white',
              borderRadius: 20,
              paddingLeft: 10,
              fontSize: 16,
              paddingRight: 10,
            }}
            placeholder="01"
            onChangeText={text => {
              setMonth(text);
            }}
          />
          <Text style={{fontSize: 30, alignSelf: 'center'}}>
            {}-{}
          </Text>
          <TextInput
            style={{
              width: 100,
              backgroundColor: 'white',
              borderRadius: 20,
              paddingLeft: 10,
              fontSize: 16,
              paddingRight: 10,
            }}
            placeholder="2005"
            onChangeText={text => {
              setYear(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Điện thoại:</Text>
          <TextInput
            style={styles.right}
            inputMode="numeric"
            placeholder="vd: 0813480271"
            onChangeText={text => {
              setPhone(text);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.left}>Giới tính:</Text>
          <RadioForm
            style={{
              flexDirection: 'row',
              width: WIDTH - 30 - 100,
              justifyContent: 'space-around',
            }}
            buttonSize={12}
            buttonStyle={{marginLeft: 40}}
            labelStyle={{fontSize: 16, marginLeft: 5}}
            radio_props={radio_props}
            onPress={value => {
              setGender(value);
            }}
          />
        </View>
        <View style={styles.row}>
          <Text style={{alignSelf: 'center', fontSize: 16, color: 'black'}}>
            Lớp:
          </Text>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: 100,
              marginLeft: 15,
              borderRadius: 20,
              paddingLeft: 10,
            }}
            placeholder="1...12"
            onChangeText={text => {
              setGrade(text);
            }}
          />
        </View>
        <Pressable
          style={styles.row}
          onPress={() => {
            setShowSubject(true);
          }}>
          <Text style={styles.left}>Môn học:</Text>
          <View style={styles.right}>
            <Text
              style={{
                paddingTop: 15,
                paddingBottom: 15,
                fontSize: 16,
                color: subject.length == 0 ? 'gray' : 'black',
              }}>
              {subject.length == 0
                ? 'Nhấn để chọn môn học'
                : subject.length <= 3
                ? subject.join(', ')
                : `${subject[0]}, ${subject[1]}, ${subject[2]}, ...`}
            </Text>
          </View>
        </Pressable>
      </ScrollView>
      <View
        style={{
          marginTop: 30,
          height: 100,
          justifyContent: 'flex-end',
        }}>
        <Pressable
          onPress={() => {
            !email
              ? setCheckRegister(1)
              : password != confirmPassword
              ? setCheckRegister(2)
              : !fullName
              ? setCheckRegister(3)
              : !date || !month || !year
              ? setCheckRegister(4)
              : !phone
              ? setCheckRegister(5)
              : !grade
              ? setCheckRegister(6)
              : subject.length == 0
              ? setCheckRegister(7)
              : setCheckRegister(8);

            if (checkRegister == 8) {
              const user = {
                realName: fullName,
                emailAccount: email,
                isActive: true,
                username: '',
                password: password,
                type: 1,
                dateOfBirth: `${date}-${month}-${year}`,
                phoneNumber: phone,
                gender: gender,
                status: 3,
                point: 1000,
                course: grade,
                subjects: subject,
              };
              console.log(user);
              axios({
                method: 'post',
                url: `${BASE_URL}/ums/session/student/register`,
                data: {
                  realName: fullName,
                  emailAccount: email,
                  isActive: true,
                  username: '',
                  password: password,
                  type: 1,
                  dateOfBirth: `${date}-${month}-${year}`,
                  phoneNumber: phone,
                  gender: gender,
                  status: 3,
                  point: 1000,
                  course: grade,
                  subjects: subject,
                },
              })
                .then(res => {
                  console.log(res.data);
                  if (res.data.code === 0) {
                    Alert.alert('Thông báo', 'Bạn đã đăng ký thành công');
                    navigation.goBack();
                  } else if (res.data.code === 4) {
                    Alert.alert(
                      'Thông báo',
                      'Email này đã tồn tại.Mời bạn đăng ký lại',
                    );
                  }
                })
                .catch(err =>
                  Alert.alert('Thông báo', 'Lỗi mạng! Hãy đăng ký lại'),
                );
            }
          }}
          style={{
            backgroundColor: '#018ABE',
            height: 56,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 24,
              color: 'white',
              marginTop: 12,
            }}>
            Đăng ký
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 55,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  left: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    width: 80,
  },
  right: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 16,
    paddingRight: 10,
    width: WIDTH - 30 - 100,
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 18,
  },
});
