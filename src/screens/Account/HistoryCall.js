import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import Point from '../../components/Common/Point';
import {WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HistoryCall({navigation}) {
  return (
    <View>
      <View style={styles.top}>
        <View style={{flexDirection: 'row'}}>
          <Icon
            onPress={() => navigation.goBack()}
            name="keyboard-backspace"
            size={30}
            style={{color: '#018ABE', alignSelf: 'center', paddingRight: 10}}
          />
          <Text style={{color: 'black', fontSize: 24, alignSelf: 'center'}}>
            Lịch sử cuộc gọi
          </Text>
        </View>
        <Point navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    width: WIDTH,
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingRight: 10,
    paddingStart: 10,
  },
});
