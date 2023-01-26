import {View, Text, Dimensions, Pressable, FlatList, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as data from '../../data/teacher';

const WIDTH = Dimensions.get('window').width;

const Item = ({teacher}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        width: 180,
        height: 70,
        padding: 5,
        marginRight: 10,
      }}>
      <Image
        source={require('../../assets/images.png')}
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

const Header = () => {
  return (
    <Icon
      name="plus-circle-outline"
      size={70}
      style={{paddingLeft: 20, paddingRight: 20}}
    />
  );
};

export default function ListFavorite() {
  return (
    <View style={{backgroundColor: '#82C6D0', width: WIDTH}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
        }}>
        <Text>Danh sách giáo viên yêu thích</Text>
        <Pressable>
          <Text>Xem thêm</Text>
        </Pressable>
      </View>

      <FlatList
        data={data.teachers}
        renderItem={({item}) => <Item teacher={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={Header}
        horizontal={true}
        style={{paddingTop: 15, paddingBottom: 15}}
      />
    </View>
  );
}
