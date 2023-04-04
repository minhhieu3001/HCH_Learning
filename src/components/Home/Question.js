import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QuestionItem from '../Common/QuestionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {showQuestionNav} from '../../redux/slice/questionTabSlice';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

const WIDTH = Dimensions.get('window').width;

export default function Question({navigation}) {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState(null);

  const getQuestions = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/post/searchQuestions?page=0&size=6&resolve=false`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setQuestions(res.data.object.questions);
        }
      });
  };

  const navigateToDetailScreen = id => {
    dispatch(showQuestionNav(false));
    dispatch(hideTabNav(false));
    navigation.navigate('detail-question-screen', {questionId: id});
  };

  useEffect(() => {
    getQuestions();
  }, []);

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
          onPress={() => {
            navigation.navigate('question-screen');
            dispatch(showQuestionNav(true));
          }}>
          <Text style={{color: '#018ABE', fontSize: 16}}>Xem thêm</Text>
          <Icon
            name="chevron-right"
            size={24}
            color="#018ABE"
            style={{alignSelf: 'center'}}
          />
        </Pressable>
      </View>

      {!questions ? (
        <></>
      ) : (
        <ScrollView
          horizontal={true}
          style={{
            marginBottom: 20,
          }}
          showsHorizontalScrollIndicator={false}>
          {questions.map((item, index) => {
            if (index % 3 === 0) {
              return (
                <View
                  key={item.id}
                  style={{
                    width: WIDTH,
                    paddingLeft: 10,
                    paddingRight: 10,
                  }}>
                  <QuestionItem item={item} press={navigateToDetailScreen} />
                  <QuestionItem
                    item={questions[index + 1]}
                    press={navigateToDetailScreen}
                  />
                  <QuestionItem
                    item={questions[index + 2]}
                    press={navigateToDetailScreen}
                  />
                </View>
              );
            }
          })}
        </ScrollView>
      )}
    </View>
  );
}
