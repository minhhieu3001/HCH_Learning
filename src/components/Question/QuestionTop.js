import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import Point from '../Common/Point';
import {hideMenuPopup} from '../../redux/slice/menuPopUpSlice';

export default function QuestionTop({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Icon
          onPress={() => {
            navigation.goBack();
            dispatch(hideMenuPopup(false));
          }}
          name="close"
          size={30}
          color="#8785A2"
          style={{alignSelf: 'center', left: 10}}
        />
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          Hỏi & đáp
        </Text>
      </View>
      <Point navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 55,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
});
