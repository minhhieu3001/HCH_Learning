import {View, Text, Dimensions, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {WIDTH} from '../../constant/dimentions';

import * as data from '../../data/teacher';
import {useDispatch} from 'react-redux';
import {hideTabNav} from '../../actions/visibleTabNavAction';
import LinearGradient from 'react-native-linear-gradient';

const Item = ({teacher, press}) => {
  return (
    <Pressable
      onPress={() => press()}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 120,
        height: 70,
        padding: 5,
        marginRight: 10,
        elevation: 20,
        shadowColor: 'gray',
      }}>
      <Image
        source={require('../../assets/images/images.png')}
        style={{width: 60, height: 60, borderRadius: 30}}
        resizeMode="contain"
      />
      <View style={{paddingLeft: 10}}>
        <Text style={{fontSize: 18, color: 'black'}}>{teacher.name}</Text>
        <View style={{flexDirection: 'row', paddingTop: 3}}>
          <Icon
            name={
              teacher.status === 1
                ? 'check-circle'
                : teacher.status === 2
                ? 'check-decagram'
                : 'clock'
            }
            color={
              teacher.status === 1
                ? 'green'
                : teacher.status === 2
                ? '#ff6600'
                : 'red'
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 14,
              paddingLeft: 5,
              color:
                teacher.status === 1
                  ? 'green'
                  : teacher.status === 2
                  ? '#ff6600'
                  : 'red',
            }}>
            {teacher.status === 1
              ? 'Trực tuyến'
              : teacher.status === 2
              ? 'Đang gọi điện'
              : 'Ngoại tuyến'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Header = () => {
  return (
    <Icon
      name="plus-circle-outline"
      size={70}
      style={{paddingLeft: 10, paddingRight: 10, color: 'white'}}
    />
  );
};

export default function ListFavorite({navigation}) {
  const dispatch = useDispatch();

  const navigateToDetailScreen = () => {
    dispatch(hideTabNav());
    navigation.navigate('detail-screen');
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
          Giáo viên đề xuất
        </Text>
        <Pressable
          style={{alignSelf: 'center', flexDirection: 'row'}}
          onPress={() => {
            dispatch(hideTabNav());
            navigation.navigate('list-teacher');
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
        data={data.teachers}
        renderItem={({item}) => (
          <Item teacher={item} press={navigateToDetailScreen} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={Header}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{paddingTop: 15, paddingBottom: 15}}
      />
    </LinearGradient>
  );
}
