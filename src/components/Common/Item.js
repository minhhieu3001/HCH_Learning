import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from './Rate';
import {Avatar} from '@rneui/themed';

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
      {/* <Image
        source={require('../../assets/images/images.png')}
        style={{width: 100, height: 100, borderRadius: 50}}
        resizeMode="contain"
      /> */}
      <Avatar
        size={100}
        rounded
        title={`${firstName[0]}${lastName[0]}`}
        containerStyle={{backgroundColor: '#3d4db7'}}
      />
      <View style={{paddingLeft: 10, paddingTop: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.realName}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === 0
                ? 'check-circle'
                : teacher.status === 1
                ? 'timer-off'
                : 'clock'
            }
            color={
              teacher.status === 0
                ? 'green'
                : teacher.status === 1
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
                teacher.status === 0
                  ? 'green'
                  : teacher.status === 1
                  ? 'red'
                  : '#ff6600',
            }}>
            {teacher.status === 0
              ? 'Trực tuyến'
              : teacher.status === 1
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
              {teacher.pointOfCharacter}p{' '}
            </Text>
            <Text>/1 kí tự</Text>
          </View>
          <View style={{paddingTop: 3, flexDirection: 'row', marginLeft: 20}}>
            <Text style={{fontSize: 14, fontWeight: '600'}}>
              {teacher.pointOfCall}p{' '}
            </Text>
            <Text>/1 phút gọi </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
