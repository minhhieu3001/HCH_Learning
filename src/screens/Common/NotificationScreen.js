import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import Point from '../../components/Common/Point';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

export default function NotificationScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.settingTop}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="keyboard-backspace"
            size={30}
            style={{color: '#018ABE', alignSelf: 'center', paddingLeft: 10}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              marginLeft: 10,
              alignSelf: 'center',
            }}>
            Thông báo
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  settingTop: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingEnd: 10,
  },
});
