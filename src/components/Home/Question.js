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
import QuestionItem from '../Common/QuestionItem';

const WIDTH = Dimensions.get('window').width;

export default function Question({navigation}) {
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
        <Pressable
          style={{alignSelf: 'flex-end', flexDirection: 'row'}}
          onPress={() => navigation.navigate('question-screen')}>
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
        style={{
          marginBottom: 20,
        }}
        showsHorizontalScrollIndicator={false}>
        {data.questions.map((item, index) => {
          if (index % 3 === 0) {
            return (
              <View
                key={item.id}
                style={{
                  width: WIDTH,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}>
                <QuestionItem item={item} />
                <QuestionItem item={data.questions[index + 1]} />
                <QuestionItem item={data.questions[index + 2]} />
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
