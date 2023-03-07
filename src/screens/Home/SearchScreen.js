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
import React, {useState, useEffect} from 'react';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({leftText, rightText}) => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.left}>{leftText}</Text>

      <Text style={styles.right}>{rightText}</Text>
    </Pressable>
  );
};

export default function SearchScreen({navigation}) {
  const keyboardEventEmitter =
    Platform.OS === 'ios' ? new NativeEventEmitter(Keyboard) : Keyboard;

  const [visibleClose, setVisibleClose] = useState(false);
  const [filterOnline, setFilterOnline] = useState(false);

  const [name, setName] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [gender, setGender] = useState(null);

  const handleBack = navigation => {
    if (visibleClose) {
      keyboardEventEmitter.dismiss();
      setVisibleClose(false);
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="keyboard-backspace"
          size={35}
          style={{color: '#018ABE', left: 10, alignSelf: 'center'}}
          onPress={() => handleBack(navigation)}
        />
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <TextInput
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
          />
          <Icon
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
        <Icon
          name="trash-can-outline"
          size={26}
          style={{color: '#018ABE', alignSelf: 'center', right: 10}}
        />
      </View>
      <View style={styles.filter}>
        <Button
          leftText="Môn học"
          rightText="Toán học, Ngoại ngữ, Sinh học, ..."
        />
        <Button leftText="Lớp" rightText="Lớp 6, Lớp 7, Lớp 8,..." />
        <Button leftText="Giới tính" rightText="Nam" />
        <Pressable style={styles.button}>
          <Text style={styles.left}>Đang trực tuyến</Text>

          <Switch
            trackColor={{false: '#767577', true: '#018ABE'}}
            thumbColor={filterOnline ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setFilterOnline(!filterOnline)}
            value={filterOnline}
          />
        </Pressable>
      </View>
      <View style={styles.viewSearch}>
        <Pressable style={styles.buttonSearch}>
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
  viewSearch: {
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: WIDTH,
    justifyContent: 'center',
  },
  buttonSearch: {
    height: 55,
    width: 280,
    backgroundColor: '#8cd',
    alignSelf: 'center',
    borderRadius: 30,
  },
});
