import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuPopup from '../../components/Common/MenuPopup';
import {useDispatch, useSelector} from 'react-redux';
import Point from '../../components/Common/Point';

export default function RankScreen({navigation}) {
  const visibleMenuPopup = useSelector(state => {
    return state.visibleMenuPopup;
  });

  return (
    <View style={styles.container}>
      <MenuPopup
        show={visibleMenuPopup.visibleMenuPopup}
        navigation={navigation}
      />
      <View style={styles.rankTop}>
        <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
          Xếp hạng
        </Text>
        <Point />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
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
});
