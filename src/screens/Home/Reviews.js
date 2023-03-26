import {View, Text, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WIDTH} from '../../constant/dimentions';
import Point from '../../components/Common/Point';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../constant/constants';
import Rate from '../../components/Common/Rate';

export default function Reviews({navigation, route}) {
  const {star, teacherId} = route.params;

  const [reviews, setReviews] = useState(null);
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  const getReviews = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/reviewTeacher/getReviews?teacherId=${teacherId}&page=${page}&size=10`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setLoading(false);
          setTotal(res.data.object.total);
          if (res.data.object.reviewResponses.length != 0) {
            if (!reviews) {
              setReviews(res.data.object.reviewResponses);
            } else {
              setReviews(reviews.concat(res.data.object.reviewResponses));
            }
          }
        }
      });
  };

  const convertTime = longTime => {
    const time = new Date(longTime);
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}  ${time.getDate()}/${time.getMonth()}/${time.getFullYear()}`;
  };

  const handleLoadMore = () => {
    if (reviews.length > 8) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View>
        <ActivityIndicator size={50} color="#82C6D0" />
      </View>
    ) : null;
  };

  useEffect(() => {
    if (loading == true) {
      getReviews();
    }
  }, [loading, page]);

  return (
    <View style={{backgroundColor: '#D6E8EE', height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          width: WIDTH,
          height: 55,
          justifyContent: 'space-between',
          backgroundColor: 'white',
          paddingEnd: 10,
          paddingStart: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => navigation.goBack()}
            size={32}
            name="keyboard-backspace"
            style={{alignSelf: 'center', color: '#018ABE'}}
          />
          <Text
            style={{
              color: 'black',
              fontSize: 26,
              alignSelf: 'center',
              paddingLeft: 10,
            }}>
            Đánh giá
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      {!reviews ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              backgroundColor: 'white',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              marginBottom: 1,
            }}>
            <Text style={{color: 'black', fontSize: 18, marginRight: 10}}>
              Đánh giá
            </Text>
            <Rate starNumber={star} isChoose={false} size={25} />
            <Text style={{fontSize: 20, color: '#ff6600', marginLeft: 10}}>
              {star}
            </Text>
            <Text style={{fontSize: 18, marginLeft: 10}}>({total})</Text>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              alignSelf: 'center',
              paddingTop: 10,
              // paddingBottom: 30,
              width: '100%',
              marginBottom: 50,
              backgroundColor: 'white',
            }}
            data={reviews}
            ListFooterComponent={renderFooter()}
            horizontal={false}
            renderItem={item => {
              console.log(item);
              return (
                <View
                  key={item.item.reviewTeacher.id}
                  style={{
                    marginVertical: 3,
                    paddingBottom: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                    borderRadius: 10,
                    paddingTop: 5,
                  }}>
                  <View style={{marginBottom: 5}}>
                    <Rate
                      starNumber={item.item.reviewTeacher.star}
                      isChoose={false}
                      size={16}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'black',
                      marginBottom: 5,
                    }}>
                    {item.item.reviewTeacher.content}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 5,
                    }}>
                    <Text style={{fontSize: 16}}>
                      {item.item.studentDTO.realName}
                    </Text>
                    <Text>
                      {convertTime(item.item.reviewTeacher.createTime)}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth:
                        item.index == reviews.length - 1 ? 0 : 0.3,
                      borderBottomColor: 'gray',
                      height: 10,
                    }}
                  />
                </View>
              );
            }}
            keyExtractor={item => item.reviewTeacher.id}
            onEndReached={() => {
              handleLoadMore();
            }}
            onEndReachedThreshold={0.5}
          />
        </View>
      )}
    </View>
  );
}
