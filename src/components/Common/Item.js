import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from './Rate';
import {Avatar} from '@rneui/themed';
import {TEACHER_OFFLINE, TEACHER_ONLINE} from '../../constant/constants';
import CustomAvatar from './CustomAvatar';

export default function Item({teacher, press}) {
  let lastName = '';
  let firstName = '';
  if (!teacher.avaPath) {
    firstName = teacher.realName.split(' ').slice(0, -1).join(' ');
    lastName = teacher.realName.split(' ').slice(-1).join(' ');
  }
  return (
    <Pressable
      onPress={() => press(teacher.id)}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 20,
        height: 110,
        paddingLeft: 10,
        paddingTop: 5,
        marginBottom: 10,
      }}>
      <CustomAvatar text={teacher.realName} size={90} url={teacher.avaPath} />
      <View style={{paddingLeft: 10, paddingTop: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.realName}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === TEACHER_ONLINE
                ? 'check-circle'
                : teacher.status === TEACHER_OFFLINE
                ? 'timer-off'
                : 'clock'
            }
            color={
              teacher.status === TEACHER_ONLINE
                ? 'green'
                : teacher.status === TEACHER_OFFLINE
                ? 'red'
                : '#ff6600'
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                teacher.status === TEACHER_ONLINE
                  ? 'green'
                  : teacher.status === TEACHER_OFFLINE
                  ? 'red'
                  : '#ff6600',
            }}>
            {teacher.status === TEACHER_ONLINE
              ? 'Trực tuyến'
              : teacher.status === TEACHER_OFFLINE
              ? 'Ngoại tuyến'
              : 'Đang trong cuộc gọi'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 8, marginTop: 3, marginRight: 5}}>
            <Rate starNumber={teacher.reviewAvg} isChoose={false} size={14} />
          </View>
          <Text>{teacher.reviewAvg}</Text>
          <Text style={{fontSize: 14, marginLeft: 10}}>
            {teacher.totalReview}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{paddingTop: 3, flexDirection: 'row'}}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>
              {teacher.priceChat}p{' '}
            </Text>
            <Text>/1 kí tự</Text>
          </View>
          <View style={{paddingTop: 3, flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>
              {teacher.priceCall}p{' '}
            </Text>
            <Text>/1 phút gọi </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
