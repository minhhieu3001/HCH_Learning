import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Point from '../../components/Common/Point';
import axios from 'axios';
import {
  BASE_URL,
  TEACHER_ONLINE,
  TEACHER_CALLING,
  TEACHER_OFFLINE,
} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../../components/Common/Item';
import CustomAvatar from '../../components/Common/CustomAvatar';
import {useFocusEffect} from '@react-navigation/native';
import Rate from '../../components/Common/Rate';
import {FlatList} from 'react-native';

const RankItem = ({item, press, index}) => {
  return (
    <Pressable
      onPress={() => press(item.ranking.teacherId)}
      key={item.ranking.id}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
      }}>
      <View style={{padding: 10, justifyContent: 'center'}}>
        <Icon
          name="crown-outline"
          size={28}
          color={'#ffc61a'}
          style={{alignSelf: 'center'}}
        />
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            fontWeight: '600',
            color: 'black',
          }}>
          {index + 1}
        </Text>
      </View>
      <CustomAvatar
        text={item.teacherDTO.realName}
        url={item.teacherDTO.avaPath}
        size={80}
      />
      <View style={{paddingLeft: 15}}>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            marginBottom: 5,
          }}>
          {item.teacherDTO.realName}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 5}}>
          <Icon
            name={
              item.teacherDTO.status === TEACHER_ONLINE
                ? 'check-circle'
                : item.teacherDTO.status === TEACHER_OFFLINE
                ? 'timer-off'
                : 'clock'
            }
            color={
              item.teacherDTO.status === TEACHER_ONLINE
                ? 'green'
                : item.teacherDTO.status === TEACHER_OFFLINE
                ? 'red'
                : '#ff6600'
            }
            size={16}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                item.teacherDTO.status === TEACHER_ONLINE
                  ? 'green'
                  : item.teacherDTO.status === TEACHER_OFFLINE
                  ? 'red'
                  : '#ff6600',
            }}>
            {item.teacherDTO.status === TEACHER_ONLINE
              ? 'Trực tuyến'
              : item.teacherDTO.status === TEACHER_OFFLINE
              ? 'Ngoại tuyến'
              : 'Đang trong cuộc gọi'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Rate starNumber={item.teacherDTO.star} isChoose={false} size={18} />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 10,
              top: -5,
              color: '#ffc61a',
            }}>
            {item.teacherDTO.star}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default function RankScreen({navigation}) {
  const [ranks, setRanks] = useState(null);
  const [sortBy, setSortBy] = useState('totalPoint');
  const [type, setType] = useState(1);

  const getRanks = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=${type}&sortType=${sortBy}&page=0&size=10`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          console.log(res.data.object);
          setRanks(res.data.object);
        }
      });
  };

  const navigateToDetailScreen = id => {
    navigation.navigate('detail-screen', {teacherId: id});
  };

  useEffect(() => {
    getRanks();
  }, [sortBy, type]);

  return (
    <View style={styles.container}>
      <View style={styles.rankTop}>
        <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
          Xếp hạng
        </Text>
        <Point navigation={navigation} />
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            backgroundColor: '#cccccc',
          }}>
          <Pressable
            onPress={() => {
              setSortBy('totalPoint');
            }}
            style={{
              width: '33%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={sortBy == 'totalPoint' ? styles.choose : styles.notChoose}>
              Tất cả
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSortBy('totalChat')}
            style={{
              width: '33%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={sortBy == 'totalChat' ? styles.choose : styles.notChoose}>
              Chat
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSortBy('totalCall')}
            style={{
              width: '33%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={sortBy == 'totalCall' ? styles.choose : styles.notChoose}>
              Call
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            backgroundColor: 'white',
          }}>
          <Pressable
            onPress={() => setType(1)}
            style={{
              width: '25%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={type == 1 ? styles.choose : styles.notChoose}>
              Ngày
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setType(2)}
            style={{
              width: '25%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={type == 2 ? styles.choose : styles.notChoose}>
              Tuần
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setType(3)}
            style={{
              width: '25%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={type == 3 ? styles.choose : styles.notChoose}>
              Tháng
            </Text>
          </Pressable>
        </View>
        <View>
          {!ranks ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={ranks}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <RankItem
                    key={item.id}
                    item={item}
                    press={navigateToDetailScreen}
                    index={index}
                  />
                );
              }}
              keyExtractor={item => item.id}
              style={{padding: 10, marginBottom: 210}}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT - 60,
    backgroundColor: '#D6E8EE',
  },
  rankTop: {
    flexDirection: 'row',
    width: WIDTH,
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingEnd: 10,
  },

  choose: {
    fontSize: 16,
    color: '#018ABE',
    fontWeight: '500',
  },
  notChoose: {
    fontSize: 16,
    color: 'black',
  },
});
