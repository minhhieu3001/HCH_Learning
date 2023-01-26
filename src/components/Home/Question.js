import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as data from '../../data/questions';

const WIDTH = Dimensions.get('window').width;

const Item = ({item, index}) => {
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 40,
        minHeight: 100,
        padding: 10,
        marginBottom: 2,
        marginLeft: 10,
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
          {item.subject}
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
          {item.resolve === false ? 'Chấp nhận câu trả lời' : 'Đã giải quyết'}
        </Text>
      </View>
      <View>
        <Text style={{marginTop: 10}}>{item.content}</Text>
      </View>
    </Pressable>
  );
};

export default function Question() {
  return (
    <View style={{width: WIDTH}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Các câu hỏi</Text>
        <Pressable>
          <Text>Xem thêm</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}>
        <FlatList
          data={data.questions}
          renderItem={({item, index}) => <Item item={item} index={index} />}
          keyExtractor={item => item.id}
          numColumns={4}
          horizontal={false}
        />
      </ScrollView>
    </View>
  );
}
