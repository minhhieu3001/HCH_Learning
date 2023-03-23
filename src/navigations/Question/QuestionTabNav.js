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

  const visible = useSelector(state => {
    return state.questionTab.visible;
  });

  useEffect(() => {
    dispatch(hideTabNav(false));
    console.log(visible);
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
          display: visible ? 'flex' : 'none',
          borderTopColor: 'gray',
          borderTopWidth: 1,
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
                backgroundColor: focused ? '#018ABE' : 'white',
                width: '100%',
                height: '100%',
              }}>
              <Text
                style={{color: focused ? 'white' : '#748c94', fontSize: 20}}>
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
                backgroundColor: focused ? '#018ABE' : 'white',
                width: '100%',
                height: '100%',
              }}>
              <Text
                style={{color: focused ? 'white' : '#748c94', fontSize: 20}}>
                Của tôi
              </Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
