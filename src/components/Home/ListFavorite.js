import {View, Text, Dimensions, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';

import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {TEACHER_OFFLINE, TEACHER_ONLINE} from '../../constant/constants';
import CustomAvatar from '../Common/CustomAvatar';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

const Item = ({teacher, press}) => {
  return (
    <Pressable
      onPress={() => press(teacher.id)}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 120,
        height: 70,
        padding: 5,
        marginRight: 10,
        elevation: 2,
        shadowColor: 'gray',
      }}>
      <CustomAvatar text={teacher.realName} size={60} url={teacher.avaPath} />
      <View style={{paddingLeft: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.realName}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === TEACHER_ONLINE
                ? 'check-circle'
                : teacher.status === TEACHER_OFFLINE
                ? 'timer-off'
                : 'clock'
            }
            color={
              teacher.status === TEACHER_ONLINE
                ? 'green'
                : teacher.status === TEACHER_OFFLINE
                ? 'red'
                : '#ff6600'
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                teacher.status === TEACHER_ONLINE
                  ? 'green'
                  : teacher.status === TEACHER_OFFLINE
                  ? 'red'
                  : '#ff6600',
            }}>
            {teacher.status === TEACHER_ONLINE
              ? 'Trực tuyến'
              : teacher.status === TEACHER_OFFLINE
              ? 'Ngoại tuyến'
              : 'Đang trong cuộc gọi'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Header = ({navigation, type}) => {
  return (
    <Icon
      onPress={() =>
        navigation.navigate('list-teacher', {tab: type == 'favorite' ? 2 : 1})
      }
      name="plus-circle-outline"
      size={70}
      style={{paddingLeft: 10, paddingRight: 10, color: 'white'}}
    />
  );
};

export default function ListFavorite({navigation, teachers, type}) {
  const dispatch = useDispatch();

  const navigateToDetailScreen = id => {
    dispatch(hideTabNav(false));
    navigation.navigate('detail-screen', {teacherId: id});
  };
  return (
    <LinearGradient
      style={{width: WIDTH}}
      colors={['#4dccfe', '#b3d8e5']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingTop: 10,
        }}>
        <Text style={{fontSize: 20, color: 'white', fontWeight: '800'}}>
          {type == 'favorite' ? 'Giáo viên yêu thích' : 'Giáo viên đề xuất'}
        </Text>
        <Pressable
          style={{alignSelf: 'center', flexDirection: 'row'}}
          onPress={() => {
            dispatch(hideTabNav(false));
            navigation.navigate('list-teacher', {
              tab: type == 'favorite' ? 2 : 1,
            });
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Xem thêm
          </Text>
          <Icon
            name="chevron-right"
            size={24}
            color="white"
            style={{alignSelf: 'center'}}
          />
        </Pressable>
      </View>

      <FlatList
        data={teachers}
        renderItem={({item}) => (
          <Item teacher={item} press={navigateToDetailScreen} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <Header navigation={navigation} type={type} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingTop: 15, paddingBottom: 15}}
      />
    </LinearGradient>
  );
}
