import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

import HomeTop from '../../components/Home/HomeTop';
import ListFavorite from '../../components/Home/ListFavorite';
import AllTeachers from '../../components/Home/AllTeachers';
import Rank from '../../components/Home/Rank';
import Question from '../../components/Home/Question';
import {WIDTH, HEIGHT} from '../../constant/dimentions';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <HomeTop />
      <ScrollView
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
