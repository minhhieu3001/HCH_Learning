import {View, StyleSheet} from 'react-native';
import React from 'react';

import AccountTop from '../../components/Account/AccountTop';
import Profile from '../../components/Account/Profile';
import Setting from '../../components/Account/Setting';
import {WIDTH, HEIGHT} from '../../constant/dimentions';
import MenuPopup from '../../components/Common/MenuPopup';
import {useDispatch, useSelector} from 'react-redux';
import {showTabNav} from '../../actions/visibleTabNavAction';
import {useFocusEffect} from '@react-navigation/native';

export default function AccountScreen(props) {
  const dispatch = useDispatch();
  const visibleMenuPopup = useSelector(state => {
    return state.visibleMenuPopup;
  });

  const {navigation, setIsLogin} = props;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(showTabNav());
    }, []),
  );

  return (
    <View style={styles.container}>
      <MenuPopup
        show={visibleMenuPopup.visibleMenuPopup}
        navigation={navigation}
      />
      <AccountTop />
      <Profile navigation={navigation} />
      <Setting navigation={navigation} setIsLogin={setIsLogin} />
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
