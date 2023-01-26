import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/Rank';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch} from 'react-redux';
import {
  hideTabNav,
  showTabNav,
} from '../../actions/visibleTabNav/visibleTabNavAction';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (dif < 0) {
      dispatch(showTabNav());
    } else {
      dispatch(hideTabNav());
    }
    this.offset = currentOffset;
  };

  return (
    <View style={styles.container}>
      <HomeTop />
      <ScrollView
        onScroll={e => {
          onScroll(e);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ListFavorite />
        <AllTeachers />
        <Rank />
        <Question />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#9876',
    borderWidth: 1,
  },
});
