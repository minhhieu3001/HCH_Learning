import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';
import AllQuestionNav from './AllQuestionNav';
import MyQuestionNav from './MyQuestionNav';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {hideTabNav} from '../../redux/slice/tabNavSlice';

const BottomTab = createBottomTabNavigator();

export default function QuestionTabNav({navigation}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hideTabNav(false));
  }, []);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          height: 55,
          // display: 'none',
        },
      }}>
      <BottomTab.Screen
        name="all-question"
        component={AllQuestionNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              {/* <Icon
                name="home-outline"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              /> */}
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
                Tất cả
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="my-question"
        component={MyQuestionNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              {/* <Icon
                name="home-outline"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              /> */}
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
                Của tôi
              </Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
