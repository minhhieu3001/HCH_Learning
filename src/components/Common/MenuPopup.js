import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ModalPopup from './ModalPopup';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import {hideTabNav} from '../../redux/slice/tabNavSlice';
import {hideMenuPopup} from '../../redux/slice/menuPopUpSlice';

export default function MenuPopup({show, navigation}) {
  const dispatch = useDispatch();

  return (
    <View>
      <ModalPopup visible={show}>
        <View style={styles.openTeachers}>
          <Text style={{color: 'white', fontSize: 18}}>DS Giáo viên</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('list-teacher', {tab: 3});
            }}>
            <Icon
              name="clipboard-list-outline"
              size={40}
              color="#8cd"
              style={styles.icon}
            />
          </Pressable>
        </View>
        <View style={styles.openQuestions}>
          <Text style={{color: 'white', fontSize: 18}}>Câu hỏi</Text>
          <Pressable
            onPress={() => {
              dispatch(hideTabNav(false));
              navigation.navigate('question-screen');
            }}>
            <Icon
              name="account-question"
              size={40}
              color="#8cd"
              style={styles.icon}
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            dispatch(hideMenuPopup(false));
          }}
          style={styles.close}>
          <Icon name="close-circle" size={48} color="#8cd" />
        </Pressable>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    position: 'absolute',
    top: HEIGHT - 53,
    left: WIDTH / 2 - 25,
  },
  icon: {
    borderRadius: 35,
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  openTeachers: {
    position: 'absolute',
    top: HEIGHT / 2 + 30,
    left: 40,
  },
  openQuestions: {
    position: 'absolute',
    top: HEIGHT / 2 + 30,
    right: 40,
  },
});
