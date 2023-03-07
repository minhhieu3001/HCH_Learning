import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {showTabNav, hideTabNav} from '../../actions/visibleTabNavAction';
import QuickSearch from '../../components/Home/QuickSearch';
import Point from '../../components/Common/Point';

export default function ListTeacherScreen({navigation, route}) {
  const dispatch = useDispatch();
  const {tab} = route.params;

  useEffect(() => {
    dispatch(hideTabNav());
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
            dispatch(showTabNav());
            navigation.goBack();
          }}
        />
        <Point />
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
