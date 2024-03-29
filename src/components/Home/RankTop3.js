import {View, Text, Pressable, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomAvatar from '../Common/CustomAvatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constant/constants';
import {rank} from '../../data/rank';
import Loading from '../Common/Loading';
import {useDispatch} from 'react-redux';
import {showTabNav} from '../../redux/slice/tabNavSlice';

const Item = ({teacher, index, navigation}) => {
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('detail-screen', {
          teacherId: teacher.teacherDTO.id,
        });
      }}
      style={{
        flexDirection: 'row',
        width: WIDTH - 80,
        height: 80,
        padding: 5,
        borderBottomWidth: index == 2 ? 0 : 0.3,
        borderBottomColor: 'gray',
        marginBottom: 2,
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
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '900',
            color: 'black',
          }}>
          {index + 1}
        </Text>
      </View>

      <CustomAvatar
        text={teacher.teacherDTO.realName}
        size={70}
        url={teacher.teacherDTO.avaPath}
      />

      <View style={{marginLeft: 10, alignSelf: 'center'}}>
        <Text style={{fontSize: 18, color: 'black'}}>
          {teacher.teacherDTO.realName}
        </Text>
      </View>
    </Pressable>
  );
};

const Header = ({id}) => {
  return (
    <LinearGradient
      colors={['#97CADB', '#018ABE', '#97CADB']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        width: WIDTH - 100,
        height: 40,
        justifyContent: 'center',
        marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          color: 'white',
          fontSize: 16,
          fontWeight: '500',
        }}>
        {id === 0 ? 'Ngày' : id === 1 ? 'Tuần' : 'Tháng'}
      </Text>
    </LinearGradient>
  );
};

export default function Rank({navigation}) {
  const to_map = [1, 2, 3];

  const dispatch = useDispatch();

  const [rankDays, setRankDays] = useState(null);
  const [rankWeeks, setRankWeeks] = useState(null);
  const [rankMonths, setRankMonths] = useState(null);

  const getRankDays = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=1&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          if (res.data.object.length != 0) {
            setRankDays(res.data.object);
          } else {
            setRankDays(rank);
          }
        }
      });
  };

  const getRankWeeks = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=2&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRankWeeks(res.data.object);
        }
      });
  };

  const getRankMonths = async () => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    axios
      .get(
        `${BASE_URL}/payment/ranking?type=3&sortType=totalPoint&page=0&size=3`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRankMonths(res.data.object);
        }
      });
  };

  useEffect(() => {
    getRankDays();
    getRankWeeks();
    getRankMonths();
  }, []);
  return (
    <View style={{width: WIDTH}}>
      <View
        style={{
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={{fontSize: 20, color: '#02457A', fontWeight: '500'}}>
          Xếp hạng
        </Text>
        <Pressable
          style={{alignSelf: 'flex-end', flexDirection: 'row'}}
          onPress={() => {
            dispatch(showTabNav(true));
            navigation.jumpTo('Rank');
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
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}>
        {to_map.map((item, index) => {
          return (
            <FlatList
              key={index}
              data={index == 0 ? rankDays : index == 1 ? rankWeeks : rankMonths}
              renderItem={({item, index}) => (
                <Item teacher={item} index={index} navigation={navigation} />
              )}
              keyExtractor={item => item.ranking.id}
              ListHeaderComponent={() => <Header id={index} />}
              style={{
                left: 10,
                marginRight: 10,
                paddingTop: 10,
                paddingRight: 10,
                paddingLeft: 10,
                backgroundColor: 'white',
                elevation: 5,
                shadowColor: 'gray',
                borderRadius: 10,
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
