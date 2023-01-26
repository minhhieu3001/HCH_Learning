import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as data from '../../data/rank';

const WIDTH = Dimensions.get('window').width;

const Item = ({teacher, index}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'gray',
        borderRadius: 10,
        width: WIDTH - 100,
        height: 80,
        padding: 5,
        marginBottom: 2,
      }}>
      <View style={{padding: 10, justifyContent: 'center'}}>
        <MaterialCommunityIcons
          name="crown-outline"
          size={25}
          color={index === 0 ? 'yellow' : index === 1 ? 'white' : 'brown'}
          style={{alignSelf: 'center'}}
        />
        <Text style={{fontSize: 20, textAlign: 'center', fontWeight: '900'}}>
          {index + 1}
        </Text>
      </View>
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

const Header = ({id}) => {
  return (
    <View
      style={{
        width: WIDTH - 100,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#82c9',
        marginBottom: 10,
        borderRadius: 10,
      }}>
      <Text style={{textAlign: 'center', color: 'white'}}>
        {id === 0 ? 'Ngày' : id === 1 ? 'Tuần' : 'Tháng'}
      </Text>
    </View>
  );
};

export default function Rank() {
  const to_map = [1, 2, 3];
  return (
    <View style={{width: WIDTH}}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>Xếp hạng</Text>
        <Pressable>
          <Text>Xem thêm</Text>
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
              data={data.rank}
              renderItem={({item, index}) => (
                <Item teacher={item} index={index} />
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={() => <Header id={index} />}
              style={{
                left: 10,
                marginRight: 10,
                padding: 10,
                backgroundColor: 'white',
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
