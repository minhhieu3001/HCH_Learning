import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Point from '../../components/Common/Point';
import {WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Common/Loading';

const Video = ({item, navigation}) => {
  const convertTime = time => {
    const data = new Date(time);
    return `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}  ${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()}`;
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        borderWidth: 1,
      }}
      onPress={() => {
        navigation.navigate('detail-call-screen', {id: item.id});
      }}>
      <Image
        source={require('../../assets/images/video.png')}
        style={{width: 100, height: 60}}
        resizeMode="contain"
      />
      <View
        style={{
          justifyContent: 'space-between',
          width: WIDTH - 40 - 110,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '500',
          }}>
          Buổi học cùng với giáo viên {item.teacherDTO.realName}
        </Text>
        <Text>{convertTime(item.callTime)}</Text>
      </View>
    </Pressable>
  );
};

export default function HistoryCall({navigation}) {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState(null);
  const [page, setPage] = useState(0);

  const getRecords = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(`${BASE_URL}/call/history/all?page=${page}&size=10`, config)
      .then(res => {
        console.log(res.data);
        if (res.data.code == 0) {
          setLoading(false);
          if (res.data.object.calls.length != 0) {
            if (!records) {
              setRecords(res.data.object.calls);
            } else {
              setRecords(records.concat(res.data.object.calls));
            }
          }
        } else {
          Alert.alert('Thông báo', 'Lỗi mạng! Vui lòng thử lại');
        }
      });
  };

  const handleLoadMore = () => {
    if (records.length > 8) {
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
      getRecords();
    }
  }, [loading, page]);

  return (
    <View style={{backgroundColor: '#D6E8EE', width: WIDTH, height: '100%'}}>
      <View style={styles.top}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={30}
            style={{color: '#018ABE', alignSelf: 'center', paddingRight: 10}}
          />
          <Text style={{color: 'black', fontSize: 24, alignSelf: 'center'}}>
            Lịch sử cuộc gọi
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
      <View style={{padding: 10}}>
        {!records ? (
          <ActivityIndicator size={50} color="#82C6D0" />
        ) : records.length == 0 ? (
          <Text style={{fontSize: 20, alignSelf: 'center'}}>
            Chưa thực hiện cuộc gọi nào
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              alignSelf: 'center',
              paddingTop: 10,
              paddingBottom: 30,
              width: '100%',
              marginBottom: 50,
            }}
            data={records}
            horizontal={false}
            ListFooterComponent={renderFooter()}
            renderItem={item => {
              return <Video navigation={navigation} item={item.item} />;
            }}
            keyExtractor={item => item.id}
            onEndReached={() => {
              handleLoadMore();
            }}
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    width: '100%',
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingRight: 10,
    paddingStart: 10,
  },
});
