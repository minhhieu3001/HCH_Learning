import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import ModalPopup from '../../components/Common/ModalPopup';
import RBSheet from 'react-native-raw-bottom-sheet';
import {days, months, years} from '../../data/birthday';
import {Dropdown} from 'react-native-element-dropdown';
import {classes} from '../../data/classes';
import {subjects} from '../../data/subjects';
import CheckBox from '@react-native-community/checkbox';
import {Avatar} from '@rneui/themed';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

export default function EditProfileScreen({navigation, route}) {
  const dispatch = useDispatch();
  const genderSheet = useRef();
  const birthdaySheet = useRef();
  const classSheet = useRef();
  const {user} = route.params;

  const [showEditName, setShowEditName] = useState(false);
  const [showEditSubject, setShowEditSubject] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);

  const [newAvaPath, setNewAvaPath] = useState(null);
  const [file, setFile] = useState(null);
  const [inputName, setInputName] = useState(null);
  const [inputGender, setInputGender] = useState(null);
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [inputPhone, setInputPhone] = useState(null);
  const [grade, setGrade] = useState(null);
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

  const updateUser = async navigation => {
    const newUser = {
      realName: inputName ? inputName : user.realName,

      username: user.userName,
      // avaPath: newAvaPath ? newAvaPath : user.avaPath,
      avaPath: user.avaPath,
      dateOfBirth:
        !date || !month || !year
          ? user.dateOfBirth
          : `${date}-${month}-${year}`,
      phoneNumber: inputPhone ? inputPhone : user.phoneNumber,
      gender: inputGender ? inputGender : user.gender,
      message: user.message,
      course: grade ? grade : user.course,
      subjects: subject.length == 0 ? user.subjects : subject,
    };

    const config = {
      keyPrefix: 'avatar/',
      bucket: 'bookstoreimages',
      region: 'us-east-1',
      accessKey: Aws.access_key,
      secretKey: Aws.secret_key,
      successActionStatus: 201,
    };
    RNS3.put(file, config);

    const token = await AsyncStorage.getItem('token');
    const configHeader = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .post(`${BASE_URL}/ums/session/student/update`, newUser, configHeader)
      .then(res => navigation.goBack())
      .catch(err => console.log(err));
  };

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
        allowsEditing: true,
      },
      response => {
        if (response.didCancel) {
          setNewAvaPath(null);
          setFile(null);
        } else if (response.error) {
          Alert.alert('Thông báo', 'Có lỗi xảy ra. Vui lòng thử lại');
        } else {
          setNewAvaPath(response.assets[0].uri);
          const file = {
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          };
          setFile(file);
        }
      },
    );
  };

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);

  return (
    <View>
      <ModalPopup visible={showEditName}>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            position: 'absolute',
            top: HEIGHT / 2 - 100,
            left: WIDTH / 2 - 125,
            width: 250,
            borderRadius: 20,
          }}>
          <TextInput
            style={{
              height: 45,
              width: 200,
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              padding: 10,
              fontSize: 16,
            }}
            placeholder={user.realName}
            onChangeText={text => setInputName(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              height: 40,
              justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => {
                setShowEditName(false);
                setInputName(null);
              }}
              style={{
                width: '50%',
                borderTopWidth: 1,
                borderTopColor: 'gray',
                borderRightColor: 'gray',
                borderRightWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
                  alignSelf: 'center',
                  top: 5,
                }}>
                Hủy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowEditName(false);
              }}
              style={{width: '50%', borderTopWidth: 1, borderTopColor: 'gray'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#018ABE',
                  alignSelf: 'center',
                  top: 5,
                }}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <ModalPopup visible={showEditPhone}>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            position: 'absolute',
            top: HEIGHT / 2 - 100,
            left: WIDTH / 2 - 125,
            width: 250,
            borderRadius: 20,
          }}>
          <TextInput
            style={{
              height: 45,
              width: 200,
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
              borderWidth: 1,
              padding: 10,
              fontSize: 16,
            }}
            placeholder={user.phoneNumber}
            onChangeText={text => setInputPhone(text)}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              height: 40,
              justifyContent: 'space-between',
            }}>
            <Pressable
              onPress={() => {
                setShowEditPhone(false);
                setInputPhone(null);
              }}
              style={{
                width: '50%',
                borderTopWidth: 1,
                borderTopColor: 'gray',
                borderRightColor: 'gray',
                borderRightWidth: 1,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
                  alignSelf: 'center',
                  top: 5,
                }}>
                Hủy
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setShowEditPhone(false);
              }}
              style={{
                width: '50%',
                borderTopWidth: 1,
                borderTopColor: 'gray',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: '#018ABE',
                  alignSelf: 'center',
                  top: 5,
                }}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>

      <View style={styles.top}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => {
              navigation.goBack();
            }}
            name="window-close"
            size={30}
            color="#02457A"
            style={{marginLeft: 10, alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 24,
              color: '#02457A',
              alignSelf: 'center',
              marginLeft: 10,
            }}>
            Sửa thông tin
          </Text>
        </View>
        <Pressable
          style={{right: 10, alignSelf: 'center'}}
          onPress={() => updateUser(navigation)}>
          <Text style={{fontSize: 20, color: '#018ABE'}}>Xác nhận</Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: '#D6E8EE',
          height: HEIGHT - 55,
          paddingTop: 10,
        }}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Avatar
            size={100}
            rounded
            source={
              newAvaPath
                ? {uri: newAvaPath}
                : require('../../assets/images/images.png')
            }
          />
          <Pressable
            onPress={() => pickImage()}
            style={{
              alignSelf: 'center',
              height: 40,
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 5,
              paddingStart: 20,
              paddingEnd: 20,
              opacity: 0.9,
              backgroundColor: 'white',
            }}>
            <Text style={{fontSize: 18, alignSelf: 'center', color: 'black'}}>
              Chọn ảnh
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.button} onPress={() => setShowEditName(true)}>
          <Text style={styles.left}>Họ và tên</Text>
          <Text style={styles.right}>
            {inputName ? inputName : user.realName}
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => genderSheet.current.open()}>
          <Text style={styles.left}>Giới tính</Text>
          <Text style={styles.right}>
            {inputGender
              ? inputGender == 1
                ? 'Nam'
                : 'Nữ'
              : user.gender == 1
              ? 'Nam'
              : 'Nữ'}
          </Text>
        </Pressable>
        <RBSheet
          ref={genderSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={140}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <SafeAreaView style={{height: 50}}>
            <Text
              style={{
                alignSelf: 'center',
                paddingBottom: 15,
                fontSize: 18,
                color: 'black',
              }}>
              Hãy chọn giới tính của bạn
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Pressable
                style={styles.genderButton}
                onPress={() => {
                  setInputGender(1);
                  genderSheet.current.close();
                }}>
                <Text style={styles.textGender}>Nam</Text>
              </Pressable>
              <Pressable
                style={styles.genderButton}
                onPress={() => {
                  setInputGender(2);
                  genderSheet.current.close();
                }}>
                <Text style={styles.textGender}>Nữ</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => birthdaySheet.current.open()}>
          <Text style={styles.left}>Ngày sinh</Text>
          <Text style={styles.right}>
            {!date || !month || !year
              ? user.dateOfBirth
              : `${date}-${month}-${year}`}
          </Text>
        </Pressable>
        <RBSheet
          ref={birthdaySheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={300}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <SafeAreaView
            style={{
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Dropdown
              data={days}
              placeholder="Ngày"
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              maxHeight={200}
              activeColor="#82C6D0"
              labelField="label"
              showsVerticalScrollIndicator={false}
              valueField="value"
              onChange={item => setDate(item.value)}
            />
            <Dropdown
              data={months}
              placeholder="Tháng"
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              maxHeight={200}
              activeColor="#82C6D0"
              labelField="label"
              showsVerticalScrollIndicator={false}
              valueField="value"
              onChange={item => setMonth(item.value)}
            />
            <Dropdown
              data={years}
              placeholder="Năm"
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              maxHeight={200}
              activeColor="#82C6D0"
              labelField="label"
              showsVerticalScrollIndicator={false}
              valueField="value"
              onChange={item => setYear(item.value)}
            />
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => {
            setShowEditPhone(true);
          }}>
          <Text style={styles.left}>SĐT</Text>
          <Text style={styles.right}>
            {inputPhone ? inputPhone : user.phoneNumber}
          </Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => classSheet.current.open()}>
          <Text style={styles.left}>Lớp</Text>
          <Text style={styles.right}>{grade ? grade : user.course}</Text>
        </Pressable>
        <RBSheet
          ref={classSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={200}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <SafeAreaView style={{alignSelf: 'center'}}>
            <Dropdown
              data={classes}
              placeholder="Lớp"
              style={styles.dropdown}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              maxHeight={200}
              activeColor="#82C6D0"
              labelField="label"
              showsVerticalScrollIndicator={false}
              valueField="value"
              onChange={item => setGrade(item.value)}
            />
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => setShowEditSubject(true)}>
          <Text style={styles.left}>Môn học</Text>
          <Text style={styles.right}>
            {subject.length == 0
              ? user.subjects.length > 3
                ? `${user.subjects[0]}, ${user.subjects[1]}, ${user.subjects[2]},...`
                : user.subjects.join(', ')
              : subject.length > 3
              ? `${subject[0]}, ${subject[1]}, ${subject[2]},...`
              : subject.join(', ')}
          </Text>
        </Pressable>
        <ModalPopup visible={showEditSubject}>
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
                  setShowEditSubject(false);
                  setSubject([]);
                }}>
                <Text style={{fontSize: 16}}>Hủy</Text>
              </Pressable>
              <Pressable
                style={{width: 100, alignSelf: 'center'}}
                onPress={() => setShowEditSubject(false)}>
                <Text style={{fontSize: 16, color: 'black'}}>Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </ModalPopup>
      </View>
    </View>
  );
}

const Item = ({item, choose, addSubject, removeSubject}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(choose);

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

const styles = StyleSheet.create({
  top: {
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    marginBottom: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  right: {
    alignSelf: 'center',
    marginRight: 15,
    fontSize: 16,
  },
  genderButton: {
    borderRadius: 30,
    paddingStart: 35,
    paddingEnd: 35,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#018ABE',
  },
  textGender: {
    fontSize: 18,
    color: 'white',
  },
  dropdown: {
    width: 100,
    borderWidth: 1,
    padding: 3,
    paddingLeft: 10,
    borderRadius: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  containerStyle: {
    backgroundColor: '#c2c2d6',
  },
  itemTextStyle: {
    color: 'black',
  },
});
