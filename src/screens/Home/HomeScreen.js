import {View, StyleSheet, ScrollView, Text, Pressable} from 'react-native';
import React, {useEffect} from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/RankTop3';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch, useSelector} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';
import MenuPopup from '../../components/Common/MenuPopup';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();

  const onScroll = event => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (dif < 0 || currentOffset == 0) {
      dispatch(showTabNav());
    } else {
      dispatch(hideTabNav());
    }
    this.offset = currentOffset;
  };

  const visibleMenuPopup = useSelector(state => {
    return state.visibleMenuPopup;
  });

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <MenuPopup
        show={visibleMenuPopup.visibleMenuPopup}
        navigation={navigation}
      />
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
    backgroundColor: '#D6E8EE',
  },
});
