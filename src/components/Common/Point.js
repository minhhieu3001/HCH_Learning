import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

export default function Point({navigation}) {
  const dispatch = useDispatch();
  const point = useSelector(state => {
    return state.pointSlice;
  });

  console.log(point);

  return (
    <Pressable
      onPress={() => {
        dispatch(hideTabNav(false));
        navigation.navigate('payment-screen');
      }}
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 20,
        alignSelf: 'center',
      }}>
      <Text style={{alignSelf: 'center'}}>{point.data}P</Text>

      <Icon
        name="plus-circle"
        size={20}
        style={{marginLeft: 5, color: '#018ABE', alignSelf: 'center'}}
      />
    </Pressable>
  );
}
