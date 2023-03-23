import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';

export default function QuestionItem({item, press}) {
  const convertTime = longTime => {
    const time = new Date(longTime);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}  ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  };
  return (
    <Pressable
      onPress={() => press(item.id)}
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: 10,
        marginBottom: 10,
        elevation: 6,
        shadowColor: 'gray',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text
          style={{
            borderRadius: 5,
            height: 20,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: '#82c0de',
            color: 'white',
          }}>
          {item.subject} - {item.course}
        </Text>
        <Text
          style={{
            borderRadius: 5,
            height: 20,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: item.resolve === true ? '#82c0de' : 'white',
            color: item.resolve === true ? 'white' : 'black',
            borderWidth: item.resolve === true ? 0 : 1,
          }}>
          {item.resolve === false ? 'Chưa giải quyết' : 'Đã giải quyết'}
        </Text>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: 'gray',
          marginBottom: 5,
        }}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            color: 'black',
            paddingBottom: 2,
            fontWeight: '400',
            marginBottom: 10,
          }}
          numberOfLines={5}>
          {item.content}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 5,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 15, marginRight: 15, alignSelf: 'center'}}>
            {!item.student ? '' : item.student.realName}
          </Text>
          <Text style={{fontSize: 13, alignSelf: 'center'}}>
            {convertTime(item.createTime)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 5,
          }}>
          <Icon
            name="comment-text-outline"
            size={18}
            style={{marginRight: 5, alignSelf: 'center', color: '#018ABE'}}
          />
          <Text style={{color: 'black'}}>{item.totalAnswer}</Text>
        </View>
      </View>
    </Pressable>
  );
}
