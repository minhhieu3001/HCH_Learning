import {View, Text, Image, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeNav from './HomeNav';
import ChatNav from './ChatNav';
import RankNav from './RankNav';
import AccountNav from './AccountNav';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import MenuPopup from '../components/Common/MenuPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMenuPopup} from '../redux/slice/menuPopUpSlice';

const BottomTab = createBottomTabNavigator();

export default function AppNav({setIsLogin}) {
  const visibleTabNav = useSelector(state => {
    return state.tabNav.visibleTabNav;
  });

  const dispatch = useDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          height: 55,
          bottom: 0,
          display: visibleTabNav == false ? 'none' : 'flex',
        },
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={26}
                color={focused ? '#018ABE' : 'gray'}
              />
              <Text style={{color: focused ? '#018ABE' : 'gray', fontSize: 13}}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name={
                  focused
                    ? 'chatbubble-ellipses'
                    : 'chatbubble-ellipses-outline'
                }
                size={26}
                color={focused ? '#018ABE' : 'gray'}
              />
              <Text style={{color: focused ? '#018ABE' : 'gray', fontSize: 13}}>
                Tin nhắn
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuPopup}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/images/menu.png')}
                style={{
                  position: 'absolute',
                  height: 55,
                  width: 46,
                }}
                resizeMode="cover"
              />
            </View>
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
            dispatch(showMenuPopup(true));
          },
        })}
      />
      <BottomTab.Screen
        name="Rank"
        component={RankNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={focused ? 'crown' : 'crown-outline'}
                size={26}
                color={focused ? '#018ABE' : 'gray'}
              />
              <Text style={{color: focused ? '#018ABE' : 'gray', fontSize: 13}}>
                Xếp hạng
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                size={26}
                color={focused ? '#018ABE' : 'gray'}
              />
              <Text style={{color: focused ? '#018ABE' : 'gray', fontSize: 13}}>
                Tài khoản
              </Text>
            </View>
          ),
        }}>
        {props => <AccountNav {...props} setIsLogin={setIsLogin} />}
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}
