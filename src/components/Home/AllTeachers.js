import {View, Text, FlatList, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rate from '../Common/Rate';
import {useDispatch} from 'react-redux';
import Item from '../Common/Item';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

export default function AllTeachers({navigation, allTeachers}) {
  const dispatch = useDispatch();

  const navigateToDetailScreen = id => {
    dispatch(hideTabNav(false));
    navigation.navigate('detail-screen', {teacherId: id});
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
            navigation.navigate('list-teacher', {tab: 3});
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
        {allTeachers?.map((item, index) => {
          if (index % 4 === 0) {
            return (
              <View style={{paddingRight: 10}} key={item.id}>
                <Item
                  teacher={item}
                  press={() => navigateToDetailScreen(item.id)}
                />
                <Item
                  teacher={allTeachers[index + 1]}
                  press={() =>
                    navigateToDetailScreen(allTeachers[index + 1].id)
                  }
                />
                <Item
                  teacher={allTeachers[index + 2]}
                  press={() =>
                    navigateToDetailScreen(allTeachers[index + 2].id)
                  }
                />
                <Item
                  teacher={allTeachers[index + 3]}
                  press={() =>
                    navigateToDetailScreen(allTeachers[index + 3].id)
                  }
                />
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
}
