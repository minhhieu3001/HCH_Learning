import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../constant/dimentions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RankScreen() {
  return (
    <View style={StyleSheet.container}>
      <View style={styles.rankTop}>
        <Text style={{fontSize: 25, color: 'black', alignSelf: 'center'}}>
          Xếp hạng
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            height: 30,
            top: 10,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
  },
  rankTop: {
    flexDirection: 'row',
    width: WIDTH,
    height: 55,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingStart: 10,
    paddingEnd: 10,
  },
});
