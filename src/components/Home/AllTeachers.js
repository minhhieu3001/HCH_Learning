import {View, Text, FlatList, Image, ScrollView, Pressable} from 'react-native';
import React from 'react';
import * as data from '../../data/teacher';
import {WIDTH} from '../../constant/dimentions';
import {useDispatch} from 'react-redux';
import {hideTabNav} from '../../actions/visibleTabNavAction';

const Item = ({teacher}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 20,
        height: 100,
        padding: 5,
        marginRight: 10,
        marginBottom: 10,
      }}>
      <Image
        source={require('../../assets/images/images.png')}
        style={{width: 65, height: 65}}
        resizeMode="contain"
      />
      <View>
        <Text>{teacher.name}</Text>
        <Text>{teacher.status == 1 ? 'Online' : 'Offline'} </Text>
      </View>
    </View>
  );
};

export default function AllTeachers({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={{width: WIDTH}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>Tất cả giáo viên</Text>
        <Pressable
          onPress={() => {
            dispatch(hideTabNav());
            navigation.navigate('list-teacher');
          }}>
          <Text>Xem thêm</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 10}}>
        <FlatList
          data={data.teachers}
          renderItem={({item}) => <Item teacher={item} />}
          keyExtractor={item => item.id}
          numColumns={4}
          horizontal={false}
          style={{left: 10}}
        />
      </ScrollView>
    </View>
  );
}
