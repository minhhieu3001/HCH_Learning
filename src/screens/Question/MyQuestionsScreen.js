import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {useDispatch} from 'react-redux';
import {showQuestionNav} from '../../redux/slice/questionTabSlice';
import QuestionItem from '../../components/Common/QuestionItem';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {hideMenuPopup} from '../../redux/slice/menuPopUpSlice';
import Point from '../../components/Common/Point';

export default function MyQuestionsScreen({navigation}) {
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
      .get(`${BASE_URL}/post/searchQuestions?page=0&tab=2&size=50`, config)
      .then(res => {
        if (res.data.code == 0) {
          setQuestions(res.data.object.questions);
        }
      });
  };

  const navigateToDetailScreen = id => {
    dispatch(showQuestionNav(false));
    navigation.navigate('detail-question-screen', {questionId: id});
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <View style={{height: '100%', backgroundColor: '#D6E8EE'}}>
      <View
        style={{
          height: 55,
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingEnd: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => {
              navigation.goBack();
              navigation.goBack();

              dispatch(hideMenuPopup(false));
            }}
            name="close"
            size={30}
            color="#8785A2"
            style={{alignSelf: 'center', left: 10}}
          />
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              alignSelf: 'center',
              marginLeft: 20,
            }}>
            Hỏi & đáp
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      {!questions ? (
        <ActivityIndicator size="large" />
      ) : questions.length == 0 ? (
        <Text style={{fontSize: 16, alignSelf: 'center', top: 50}}>
          Bạn chưa có câu hỏi nào
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={questions}
          renderItem={({item}) => {
            return <QuestionItem item={item} press={navigateToDetailScreen} />;
          }}
          keyExtractor={item => item.id}
          style={{padding: 10, marginBottom: 60}}
        />
      )}
      <Pressable
        onPress={() => {
          navigation.navigate('create-question-screen');
          dispatch(showQuestionNav(false));
        }}
        style={{
          position: 'absolute',
          width: 80,
          height: 80,
          borderWidth: 2,
          borderRadius: 40,
          borderColor: '#7286D3',
          bottom: 65,
          right: 20,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../assets/images/add_question.png')}
          style={{width: 90, height: 100, top: -10, left: -8}}
          resizeMode="center"
        />
      </Pressable>
    </View>
  );
}
