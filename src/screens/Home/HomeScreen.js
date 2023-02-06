import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/RankTop3';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';

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
      <HomeTop navigation={navigation} />
      <ScrollView
        onScroll={e => {
          onScroll(e);
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <ListFavorite navigation={navigation} />
        <AllTeachers navigation={navigation} />
        <Rank navigation={navigation} />
        <Question navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#9876',
  },
});
