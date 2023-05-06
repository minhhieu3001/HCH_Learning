import {View, Text, ActivityIndicator, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {FlatList} from 'react-native-gesture-handler';
import Item from '../../components/Common/Item';
import {HEIGHT} from '../../constant/dimentions';

export default function ResultSearchScreen({route, navigation}) {
  const {searchName, subjects, classes, gender} = route.params;

  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState(null);
  const [page, setPage] = useState(0);

  const getTeachers = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/ums/getTeachers/getTeacher?page=${page}&size=10&tab=3&searchByName=${
          !searchName ? '' : searchName
        }&searchBySubjects=${subjects}&searchByClasses=${classes}&gender=${gender}`,
        config,
      )
      .then(res => {
        console.log(res.data.object.teacherResponses);
        if (res.data.code == 0) {
          setLoading(false);
          if (res.data.object.teacherResponses.length != 0) {
            if (!teachers) {
              setTeachers(res.data.object.teacherResponses);
            } else {
              setTeachers(teachers.concat(res.data.object.teacherResponses));
            }
          } else {
            setTeachers([]);
          }
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng! Vui lòng thử lại');
        }
      });
  };

  const handleLoadMore = () => {
    if (teachers.length > 8) {
      setLoading(true);
      setPage(page + 1);
    }
  };

  const navigateToDetailScreen = id => {
    navigation.navigate('detail-screen', {teacherId: id});
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
      getTeachers();
    }
  }, [loading, page]);

  return (
    <View style={{backgroundColor: '#D6E8EE', height: HEIGHT}}>
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          backgroundColor: 'white',
        }}>
        <Icon
          name="keyboard-backspace"
          size={35}
          style={{color: '#018ABE', left: 10, alignSelf: 'center'}}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 22,
            color: 'black',
            marginLeft: 20,
            alignSelf: 'center',
          }}>
          Kết quả
        </Text>
      </View>
      {!teachers ? (
        <></>
      ) : teachers.length == 0 ? (
        <Text style={{fontSize: 16, alignSelf: 'center', marginTop: 20}}>
          Không có giáo viên thỏa mãn điều kiện
        </Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{alignSelf: 'center', paddingTop: 10, paddingBottom: 30}}
          data={teachers}
          horizontal={false}
          ListFooterComponent={renderFooter()}
          renderItem={item => {
            return <Item teacher={item.item} press={navigateToDetailScreen} />;
          }}
          keyExtractor={item => item.id}
          onEndReached={() => {
            handleLoadMore();
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}
