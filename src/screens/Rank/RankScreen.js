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
import {BASE_URL} from '../../constant/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Item from '../../components/Common/Item';
import CustomAvatar from '../../components/Common/CustomAvatar';

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
        `${BASE_URL}/payment/ranking?type=${type}&sortType=${sortBy}&page=0&size=20`,
        config,
      )
      .then(res => {
        if (res.data.code == 0) {
          setRanks(res.data.object);
        }
      });
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
        {!ranks || ranks.length == 0 ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            {ranks.map((item, index) => {
              console.log('teacherDTO', item.teacherDTO);
              return (
                <Pressable
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  {/* <CustomAvatar
                    text={item.teacherDTO.realName}
                    size={90}
                    url={item.teacherDTO.avaPath}
                  /> */}
                </Pressable>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
