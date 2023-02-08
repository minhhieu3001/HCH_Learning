import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

import AccountTop from '../../components/Account/AccountTop';
import Profile from '../../components/Account/Profile';
import Setting from '../../components/Account/Setting';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import MenuPopup from '../../components/Common/MenuPopup';
import {useDispatch, useSelector} from 'react-redux';

export default function AccountScreen({navigation}) {
  const visibleMenuPopup = useSelector(state => {
    return state.visibleMenuPopup;
  });

  return (
    <View style={styles.container}>
      <MenuPopup
        show={visibleMenuPopup.visibleMenuPopup}
        navigation={navigation}
      />
      <AccountTop />
      <Profile navigation={navigation} />
      <Setting navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#D6E8EE',
  },
});
