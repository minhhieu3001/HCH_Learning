import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionTop from '../../components/Question/QuestionTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {questions} from '../../data/questions';
import Rate from '../../components/Common/Rate';

const Item = ({item}) => (
  <View
    key={item.id}
    style={{
      width: WIDTH - 20,
      alignSelf: 'center',
      marginBottom: 10,
      borderRadius: 20,
      borderWidth: 1,
      padding: 10,
      backgroundColor: 'white',
    }}>
    <Rate starNumber={item.star} isChoose={false} size={14} />
    <Text style={{fontSize: 16, color: 'black'}}>{item.content}</Text>
    <View
      style={{
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        height: 10,
      }}
    />
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 5,
      }}>
      <Text style={{fontSize: 16, color: 'black'}}>{item.userName}</Text>
      <Text>{item.time}</Text>
    </View>
  </View>
);

export default function AllQuestionScreen({navigation}) {
  const tabs = [
    {id: 1, name: 'Mới nhất'},
    {id: 2, name: 'Toán học'},
    {id: 3, name: 'Ngữ Văn'},
    {id: 4, name: 'Ngoại ngữ'},
    {id: 5, name: 'Vật lí'},
    {id: 6, name: 'Hóa học'},
    {id: 7, name: 'Sinh học'},
    {id: 8, name: 'Lịch sử'},
    {id: 9, name: 'Địa lí'},
    {id: 10, name: 'GDCD'},
  ];

  const [choose, setChoose] = useState(1);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const renderItem = ({item}) => <Item item={item} />;

  return (
    <View style={{backgroundColor: '#FFE2E2'}}>
      <QuestionTop navigation={navigation} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {tabs.map((item, index) => {
          return (
            <Pressable
              style={choose === item.id ? styles.choose : styles.not_choose}
              key={item.id}
              onPress={() => {
                setChoose(item.id);
              }}>
              <Text
                style={
                  choose === item.id
                    ? styles.text_choose
                    : styles.text_not_choose
                }>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <View
        style={{
          height: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={{
            height: 35,
            width: 200,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginLeft: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#8785A2',
          }}
          placeholder="Tìm kiếm"
        />
        <View style={{flexDirection: 'row', right: 10}}>
          <CheckBox
            style={{
              alignSelf: 'center',
            }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={() => setToggleCheckBox(!toggleCheckBox)}
          />
          <Text style={{alignSelf: 'center', fontSize: 16, color: '#8785A2'}}>
            Đã giải quyết
          </Text>
        </View>
      </View>
      <View style={{height: HEIGHT - 210}}>
        <FlatList
          data={questions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderWidth: 2,
          borderRadius: 40,
          borderColor: '#7286D3',
          bottom: 20,
          right: 20,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../assets/images/add_question.png')}
          style={{width: 90, height: 100, top: -10, left: -8}}
          resizeMode="center"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  choose: {
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#8785B2',
    paddingStart: 10,
    paddingEnd: 10,
  },
  not_choose: {
    backgroundColor: 'white',
    height: 40,
    paddingStart: 10,
    paddingEnd: 10,
  },
  text_choose: {
    fontSize: 17,
    color: '#8785B2',
    alignSelf: 'center',
    top: 5,
  },
  text_not_choose: {
    fontSize: 17,
    top: 5,
    alignSelf: 'center',
  },
});
