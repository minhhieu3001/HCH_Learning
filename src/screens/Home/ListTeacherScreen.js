import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {showTabNav} from '../../actions/visibleTabNavAction';
import QuickSearch from '../../components/Home/QuickSearch';

export default function ListTeacherScreen({navigation}) {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Icon
          name="keyboard-backspace"
          size={35}
          color="#8cd"
          style={{alignSelf: 'center', left: 10}}
          onPress={() => {
            dispatch(showTabNav());
            navigation.goBack();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            height: 30,
            top: 10,
            right: 10,
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius: 20,
          }}>
          <Text>1234P</Text>

          <Icon
            name="plus-circle-outline"
            size={20}
            style={{marginLeft: 5, color: '#82dc'}}
          />
        </View>
      </View>
      <QuickSearch navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#9876',
  },
  top: {
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
