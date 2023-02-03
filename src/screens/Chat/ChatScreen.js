import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import ChatTop from '../../components/Chat/ChatTop';
import {WIDTH, HEIGHT} from '../../constant/dimentions';

export default function ChatScreen() {
  const [chooseTab, setchooseTab] = useState('all');
  return (
    <View style={styles.container}>
      <ChatTop />
      <View style={styles.tab}>
        <TouchableHighlight
          onPress={() => setchooseTab('all')}
          underlayColor="#DDDDDD"
          style={chooseTab === 'all' ? styles.active : styles.inactive}>
          <View>
            <Text
              style={
                chooseTab === 'all' ? styles.textActive : styles.textInActive
              }>
              Tat ca
            </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setchooseTab('favorite')}
          underlayColor="#DDDDDD"
          style={chooseTab === 'favorite' ? styles.active : styles.inactive}>
          <View>
            <Text
              style={
                chooseTab === 'favorite'
                  ? styles.textActive
                  : styles.textInActive
              }>
              Yeu thich
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#9876',
  },
  tab: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: 'white',
  },
  active: {
    width: '50%',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#82cd',
  },
  inactive: {
    width: '50%',
    justifyContent: 'center',
  },
  textActive: {
    textAlign: 'center',
    fontSize: 16,
    color: '#82cd',
  },
  textInActive: {
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});
