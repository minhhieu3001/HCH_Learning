import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import QuickSearch from '../../components/Home/QuickSearch';
import Point from '../../components/Common/Point';
import {hideTabNav} from '../../redux/slice/tabNavSlice';
import {hideMenuPopup} from '../../redux/slice/menuPopUpSlice';

export default function ListTeacherScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {tab} = route.params;

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="keyboard-backspace"
          size={35}
          color="#018ABE"
          style={{alignSelf: 'center', left: 10}}
          onPress={() => {
            navigation.goBack();
            dispatch(hideMenuPopup(false));
          }}
        />
        <Point navigation={navigation} />
      </View>
      <QuickSearch navigation={navigation} type={tab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
  top: {
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingEnd: 10,
  },
});
