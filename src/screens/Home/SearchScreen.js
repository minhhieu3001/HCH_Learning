import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Switch,
  Keyboard,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalPopup from '../../components/Common/ModalPopup';
import {subjects} from '../../data/subjects';
import CheckBox from '@react-native-community/checkbox';
import {classes} from '../../data/classes';

const Button = ({leftText, rightText, press}) => {
  return (
    <Pressable style={styles.button} onPress={() => press(leftText)}>
      <Text style={styles.left}>{leftText}</Text>

      <Text style={styles.right}>{rightText}</Text>
    </Pressable>
  );
};

const ItemSubject = ({item, choose, addSubject, removeSubject}) => {
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

const ItemClass = ({item, choose, addClass, removeClass}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(choose);
  return (
    <View
      key={item.name}
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
        {item.value}
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
          !toggleCheckBox ? addClass(item.value) : removeClass(item.value);
        }}
      />
    </View>
  );
};

export default function SearchScreen({navigation}) {
  const keyboardEventEmitter =
    Platform.OS === 'ios' ? new NativeEventEmitter(Keyboard) : Keyboard;

  const input = useRef(null);

  const [visibleClose, setVisibleClose] = useState(false);
  const [position, setPosition] = useState(0);
  const [showEditSubject, setShowEditSubject] = useState(false);
  const [showEditClass, setShowEditClass] = useState(false);
  const [showEditGender, setShowEditGender] = useState(false);

  const [name, setName] = useState(null);
  const [subject, setSubject] = useState([]);
  const [grade, setGrade] = useState([]);
  const [gender, setGender] = useState(1);

  const handleBack = navigation => {
    if (visibleClose) {
      keyboardEventEmitter.dismiss();
      setVisibleClose(false);
    } else {
      navigation.goBack();
    }
  };

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

  const addClass = name => {
    grade.push(name);
    setGrade(grade);
  };

  const removeClass = async name => {
    const newList = grade.filter(function (value, index, arr) {
      return value != name;
    });
    setGrade(newList);
  };

  const handlePress = text => {
    if (text == 'Môn học') {
      setShowEditSubject(true);
    } else if (text == 'Dạy lớp') {
      setShowEditClass(true);
    } else if (text == 'Giới tính') {
      setShowEditGender(true);
    }
  };

  useEffect(() => {
    if (visibleClose == true) {
      setPosition(280);
    } else {
      setPosition(0);
    }
  }, [visibleClose]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="keyboard-backspace"
          size={35}
          style={{color: '#018ABE', left: 10, alignSelf: 'center'}}
          onPress={() => handleBack(navigation)}
        />
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginEnd: '20%',
          }}>
          <TextInput
            ref={input}
            onFocus={() => {
              setVisibleClose(true);
            }}
            onBlur={() => setVisibleClose(false)}
            style={styles.input}
            cursorColor="#018ABE"
            enterKeyHint="search"
            inlineImageLeft="search_icon"
            placeholder="Tìm kiếm theo tên"
            inlineImagePadding={10}
            onChangeText={text => setName(text)}
          />
          <Icon
            onPress={() => input.current.clear()}
            name="close"
            size={24}
            style={{
              position: 'absolute',
              right: 5,
              alignSelf: 'center',
              opacity: visibleClose === false ? 0 : 1,
            }}
          />
        </View>
      </View>
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
                <ItemSubject
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
              style={{width: '50%', alignSelf: 'center'}}
              onPress={() => {
                setShowEditSubject(false);
                setSubject([]);
              }}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>Hủy</Text>
            </Pressable>
            <Pressable
              style={{width: '50%', alignSelf: 'center'}}
              onPress={() => setShowEditSubject(false)}>
              <Text
                style={{fontSize: 16, color: '#018ABE', textAlign: 'center'}}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <ModalPopup visible={showEditClass}>
        <View
          style={{
            backgroundColor: 'white',
            width: WIDTH - 150,
            alignSelf: 'center',
            top: 50,
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
            Lớp
          </Text>
          <View>
            {classes.map((item, index) => {
              return (
                <ItemClass
                  key={index}
                  item={item}
                  choose={grade.includes(item.value)}
                  addClass={addClass}
                  removeClass={removeClass}
                />
              );
            })}
          </View>
          <View
            style={{
              height: 45,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Pressable
              style={{width: '50%', alignSelf: 'center'}}
              onPress={() => {
                setShowEditClass(false);
                setGrade([]);
              }}>
              <Text style={{fontSize: 16, textAlign: 'center'}}>Hủy</Text>
            </Pressable>
            <Pressable
              style={{width: '50%', alignSelf: 'center'}}
              onPress={() => setShowEditClass(false)}>
              <Text
                style={{fontSize: 16, color: '#018ABE', textAlign: 'center'}}>
                Xác nhận
              </Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <ModalPopup visible={showEditGender}>
        <View
          style={{
            backgroundColor: 'white',
            width: WIDTH - 150,
            alignSelf: 'center',
            top: 150,
            borderRadius: 5,
            padding: 10,
          }}>
          <View>
            <Pressable
              onPress={() => {
                setGender(1);
                setShowEditGender(false);
              }}
              style={{
                height: 45,
                justifyContent: 'center',
                paddingBottom: 2,
                borderBottomWidth: 0.5,
                borderBottomColor: 'gray',
              }}>
              <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
                Nam
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setGender(2);
                setShowEditGender(false);
              }}
              style={{
                height: 45,
                justifyContent: 'center',
                paddingBottom: 2,
              }}>
              <Text style={{fontSize: 16, color: 'black', textAlign: 'center'}}>
                Nữ
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              height: 45,
              flexDirection: 'row',
              justifyContent: 'center',
              borderTopWidth: 1,
              borderTopColor: 'gray',
            }}>
            <Pressable
              style={{alignSelf: 'center'}}
              onPress={() => {
                setShowEditGender(false);
                setGender(1);
              }}>
              <Text style={{fontSize: 16}}>Hủy</Text>
            </Pressable>
          </View>
        </View>
      </ModalPopup>
      <View style={styles.filter}>
        <Button
          leftText="Môn học"
          rightText={
            !subject || subject.length == 0
              ? ''
              : subject.length > 3
              ? `${subject[0]}, ${subject[1]}, ${subject[2]}, ...`
              : subject.join(', ')
          }
          press={handlePress}
        />
        <Button
          leftText="Dạy lớp"
          rightText={
            !grade || grade.length == 0
              ? ''
              : grade.length > 3
              ? `${grade[0]}, ${grade[1]}, ${grade[2]}, ...`
              : grade.join(', ')
          }
          press={handlePress}
        />
        <Button
          leftText="Giới tính"
          rightText={gender == 1 ? 'Nam' : 'Nữ'}
          press={handlePress}
        />
      </View>
      <View
        style={{
          height: 80,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          width: WIDTH,
          justifyContent: 'center',
        }}>
        <Pressable
          style={styles.buttonSearch}
          onPress={() =>
            navigation.navigate('result-screen', {
              searchName: name,
              subjects: subject,
              classes: grade,
              gender: gender,
            })
          }>
          <Text
            style={{
              textAlign: 'center',
              alignSelf: 'center',
              fontSize: 16,
              fontWeight: '800',
              color: 'white',
              top: 15,
            }}>
            Tìm kiếm theo các điều kiện trên
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
  top: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  input: {
    width: 220,
    height: 40,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#018ABE',
  },
  filter: {marginTop: 10},
  button: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  left: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center',
    left: 15,
  },
  right: {
    fontSize: 16,
    alignSelf: 'center',
    right: 15,
  },
  buttonSearch: {
    height: 55,
    width: 280,
    backgroundColor: '#8cd',
    alignSelf: 'center',
    borderRadius: 30,
  },
});
