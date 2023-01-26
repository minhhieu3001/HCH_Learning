import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

import AccountTop from '../../components/Account/AccountTop';
import Profile from '../../components/Account/Profile';
import Setting from '../../components/Account/Setting';
import {WIDTH, HEIGHT} from '../../constant/dimentions';

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <AccountTop />
      <Profile />
      <Setting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#9876',
  },
});
