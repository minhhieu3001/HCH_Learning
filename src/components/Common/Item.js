import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from './Rate';

export default function Item({teacher, press}) {
  return (
    <Pressable
      onPress={() => press()}
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
      <Image
        source={require('../../assets/images/images.png')}
        style={{width: 100, height: 100, borderRadius: 50}}
        resizeMode="contain"
      />
      <View style={{paddingLeft: 10, paddingTop: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.name}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === 1
                ? 'check-circle'
                : teacher.status === 2
                ? 'check-decagram'
                : 'clock'
            }
            color={
              teacher.status === 1
                ? 'green'
                : teacher.status === 2
                ? '#ff6600'
                : 'red'
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                teacher.status === 1
                  ? 'green'
                  : teacher.status === 2
                  ? '#ff6600'
                  : 'red',
            }}>
            {teacher.status === 1
              ? 'Trực tuyến'
              : teacher.status === 2
              ? 'Đang gọi điện'
              : 'Ngoại tuyến'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 8, marginTop: 3, marginRight: 5}}>
            <Rate starNumber={4.1} isChoose={false} size={14} />
          </View>
          <Text>4.2</Text>
          <Text style={{fontSize: 14, marginLeft: 10}}>(2347)</Text>
        </View>
        <View style={{paddingTop: 3, flexDirection: 'row'}}>
          <Text style={{fontSize: 14, fontWeight: '600'}}>
            {teacher.point}p{' '}
          </Text>
          <Text>/1 kí tự</Text>
        </View>
      </View>
    </Pressable>
  );
}
