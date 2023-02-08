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
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as data from '../../data/questions';

const WIDTH = Dimensions.get('window').width;

const Item = ({item}) => {
  return (
    <Pressable
      style={{
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 40,
        height: 200,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 5,
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
      <View
        style={{
          borderBottomWidth: 0.5,
          height: 120,
          borderBottomColor: 'gray',
        }}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 17,
            color: 'black',
            paddingBottom: 2,
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
            Người hỏi
          </Text>
          <Text style={{fontSize: 13, alignSelf: 'center'}}>{item.time}</Text>
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
          <Text style={{color: 'black'}}>0</Text>
        </View>
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
        <Text style={{fontSize: 20, fontWeight: '500', color: '#02457A'}}>
          Các câu hỏi
        </Text>
        <Pressable style={{alignSelf: 'flex-end', flexDirection: 'row'}}>
          <Text style={{color: '#018ABE', fontSize: 16}}>Xem thêm</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#018ABE"
            style={{alignSelf: 'center'}}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal={true}
        style={{marginBottom: 20, paddingStart: 5, paddingEnd: 10}}
        showsHorizontalScrollIndicator={false}>
        {data.questions.map((item, index) => {
          if (index % 3 === 0) {
            return (
              <View key={item.id}>
                <Item item={item} />
                <Item item={data.questions[index + 1]} />
                <Item item={data.questions[index + 2]} />
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
