import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {showTabNav, hideTabNav} from '../../actions/visibleTabNavAction';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import ModalPopup from '../../components/Common/ModalPopup';
import RBSheet from 'react-native-raw-bottom-sheet';
import {days, months, years} from '../../data/birthday';
import {Dropdown} from 'react-native-element-dropdown';
import {classes} from '../../data/classes';
import {subjects} from '../../data/subjects';
import CheckBox from '@react-native-community/checkbox';

export default function EditProfileScreen({navigation}) {
  const dispatch = useDispatch();
  const genderSheet = useRef();
  const birthdaySheet = useRef();
  const classSheet = useRef();

  const [showEditName, setShowEditName] = useState(false);
  const [showEditSubject, setShowEditSubject] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const user = {
    name: 'Bùi Minh Hiếu',
    class: 10,
    subjects: ['Toán học', 'Ngữ văn', 'Ngoại ngữ'],
  };

  useEffect(() => {
    dispatch(hideTabNav());
  }, []);

  return (
    <View>
      <ModalPopup visible={showEditName}>
        <View
          style={{
            backgroundColor: '#F6F6F6',
            position: 'absolute',
            top: HEIGHT / 2 - 100,
            left: 40,
            width: 300,
            height: 120,
            borderRadius: 20,
          }}>
          <TextInput
            style={{
              height: 40,
              width: 250,
              backgroundColor: '#FFE2E2',
              alignSelf: 'center',
              marginTop: 20,
              borderRadius: 10,
            }}
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
              }}
              style={{
                width: 150,
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
              style={{width: 150, borderTopWidth: 1, borderTopColor: 'gray'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'blue',
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
              dispatch(showTabNav());
              navigation.goBack();
            }}
            name="window-close"
            size={30}
            color="#8785A2"
            style={{marginLeft: 10, alignSelf: 'center'}}
          />
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              alignSelf: 'center',
              marginLeft: 10,
            }}>
            Sửa thông tin
          </Text>
        </View>
        <Pressable style={{right: 10, alignSelf: 'center'}}>
          <Text style={{fontSize: 20, color: '#8785A2'}}>Xác nhận</Text>
        </Pressable>
      </View>
      <View
        style={{
          backgroundColor: '#D6E8EE',
          height: HEIGHT - 55,
          paddingTop: 10,
        }}>
        <Pressable style={styles.button} onPress={() => setShowEditName(true)}>
          <Text style={styles.left}>Họ và tên</Text>
          <Text style={styles.right}>Bùi Minh Hiếu</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => genderSheet.current.open()}>
          <Text style={styles.left}>Giới tính</Text>
          <Text style={styles.right}>Nam</Text>
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
                fontSize: 16,
                color: 'black',
              }}>
              Hãy chọn giới tính của bạn
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Pressable style={styles.genderButton}>
                <Text style={styles.textGender}>Nam</Text>
              </Pressable>
              <Pressable style={styles.genderButton}>
                <Text style={styles.textGender}>Nữ</Text>
              </Pressable>
              <Pressable style={styles.genderButton}>
                <Text style={styles.textGender}>Khác</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => birthdaySheet.current.open()}>
          <Text style={styles.left}>Ngày sinh</Text>
          <Text style={styles.right}>200213123123</Text>
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
            />
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => classSheet.current.open()}>
          <Text style={styles.left}>Lớp</Text>
          <Text style={styles.right}>12</Text>
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
            />
          </SafeAreaView>
        </RBSheet>
        <Pressable
          style={styles.button}
          onPress={() => setShowEditSubject(true)}>
          <Text style={styles.left}>Môn học</Text>
          <Text style={styles.right}>{user.subjects}</Text>
        </Pressable>
        <ModalPopup visible={showEditSubject}>
          <View
            style={{
              backgroundColor: 'white',
              width: WIDTH - 60,
              height: HEIGHT - 250,
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
                    choose={user.subjects.includes(item.name)}
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
                onPress={() => setShowEditSubject(false)}>
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

const Item = ({item, choose}) => {
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
        onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
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
    marginBottom: 1,
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
    backgroundColor: '#8785A2',
  },
  textGender: {
    fontSize: 16,
    color: 'white',
  },
  dropdown: {
    width: 100,
    borderWidth: 1,
    padding: 3,
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
