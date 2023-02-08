import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {hideTabNav, showTabNav} from '../../actions/visibleTabNavAction';

export default function SettingScreen({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideTabNav());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.settingTop}>
        <Icon
          name="keyboard-backspace"
          size={30}
          style={{color: '#82cd', alignSelf: 'center', paddingLeft: 10}}
          onPress={() => {
            dispatch(showTabNav());
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
          Cài đặt
        </Text>
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
  },
});
