import {View, Text, FlatList, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {teachers} from '../../data/teacher';
import {WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from '../Common/Rate';
import {useDispatch} from 'react-redux';
import {hideTabNav} from '../../actions/visibleTabNavAction';
import Item from '../Common/Item';

export default function AllTeachers({navigation}) {
  const dispatch = useDispatch();

  const navigateToDetailScreen = () => {
    dispatch(hideTabNav());
    navigation.navigate('detail-screen');
  };
  return (
    <View style={{width: WIDTH}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 5,
          paddingTop: 10,
          paddingBottom: 5,
        }}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#02457A'}}>
          Danh sách giáo viên
        </Text>
        <Pressable
          style={{alignSelf: 'flex-end', flexDirection: 'row'}}
          onPress={() => {
            navigation.navigate('list-teacher');
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
        style={{paddingLeft: 10, paddingRight: 10}}
        showsHorizontalScrollIndicator={false}>
        {teachers.map((item, index) => {
          if (index % 4 === 0) {
            return (
              <View style={{paddingRight: 10}} key={item.id}>
                <Item teacher={item} press={navigateToDetailScreen} />
                <Item
                  teacher={teachers[index + 1]}
                  press={navigateToDetailScreen}
                />
                <Item
                  teacher={teachers[index + 2]}
                  press={navigateToDetailScreen}
                />
                <Item
                  teacher={teachers[index + 3]}
                  press={navigateToDetailScreen}
                />
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
