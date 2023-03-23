import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import QuestionTop from '../../components/Question/QuestionTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Rate from '../../components/Common/Rate';
import QuestionItem from '../../components/Common/QuestionItem';
import {useDispatch, useSelector} from 'react-redux';
import {showQuestionNav} from '../../redux/slice/questionTabSlice';
import {subjects} from '../../data/subjects';
import {classes} from '../../data/classes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import {useFocusEffect} from '@react-navigation/native';

export default function AllQuestionScreen({navigation}) {
  const dispatch = useDispatch();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [content, setContent] = useState(null);

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
        `${BASE_URL}/post/searchQuestions?page=${page}&size=20&subject=${
          !subject ? '' : subject
        }&resolve=${toggleCheckBox}&course=${!grade ? '' : grade}&keyContent=${
          !content ? '' : content
        }`,
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
    navigation.navigate('detail-question-screen', {questionId: id});
  };

  useEffect(() => {
    console.log(subject, grade, toggleCheckBox, content);
    getQuestions();
  }, [subject, grade, toggleCheckBox, content]);

  useFocusEffect(
    React.useCallback(() => {
      getQuestions();
    }, []),
  );

  return (
    <View style={{backgroundColor: '#D6E8EE'}}>
      <QuestionTop navigation={navigation} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {subjects.map((item, index) => {
          return (
            <Pressable
              style={subject === item.name ? styles.choose : styles.not_choose}
              key={item.id}
              onPress={() => {
                if (subject == item.name) {
                  setSubject(null);
                } else {
                  setSubject(item.name);
                }
              }}>
              <Text
                style={
                  subject === item.name
                    ? styles.text_choose
                    : styles.text_not_choose
                }>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {classes.map((item, index) => {
          return (
            <Pressable
              style={grade === item.value ? styles.choose : styles.not_choose}
              key={item.label}
              onPress={() => {
                if (grade == item.value) {
                  setGrade(null);
                } else {
                  setGrade(item.value);
                }
              }}>
              <Text
                style={
                  grade === item.value
                    ? styles.text_choose
                    : styles.text_not_choose
                }>
                {item.value}
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
          onChangeText={text => {
            console.log(text);
            setContent(text);
          }}
          style={{
            height: 35,
            width: 200,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginLeft: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#8785A2',
            padding: 10,
          }}
          placeholder="Tìm kiếm theo nội dung"
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
        {!questions ? (
          <ActivityIndicator size="large" color="#018ABE" />
        ) : questions.length == 0 ? (
          <Text style={{fontSize: 16, alignSelf: 'center', top: 50}}>
            Không có câu hỏi nào phù hợp
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={questions}
            renderItem={({item}) => {
              return (
                <QuestionItem item={item} press={navigateToDetailScreen} />
              );
            }}
            keyExtractor={item => item.id}
            style={{padding: 10, marginBottom: 45}}
          />
        )}
      </View>
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
          bottom: 50,
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

const styles = StyleSheet.create({
  choose: {
    height: 40,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#02457A',
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
    color: '#02457A',
    alignSelf: 'center',
    top: 5,
  },
  text_not_choose: {
    fontSize: 17,
    top: 5,
    alignSelf: 'center',
  },
});
