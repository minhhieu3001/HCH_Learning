import {View, StyleSheet} from 'react-native';
import React from 'react';

import AccountTop from '../../components/Account/AccountTop';
import Profile from '../../components/Account/Profile';
import Setting from '../../components/Account/Setting';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showTabNav} from '../../redux/slice/tabNavSlice';

export default function AccountScreen(props) {
  const dispatch = useDispatch();
  const visibleMenuPopup = useSelector(state => {
    return state.menuPopUp.visibleMenuPopup;
  });

  const {navigation} = props;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabNav(true));
    }, []),
  );

  return (
    <View style={styles.container}>
      <AccountTop navigation={navigation} />
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
