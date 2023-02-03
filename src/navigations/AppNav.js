import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeNav from './HomeNav';
import ChatNav from './ChatNav';
import RankNav from './RankNav';
import AccountNav from './AccountNav';
import {useSelector} from 'react-redux';
import MenuPopUp from './MenuPopup';

const BottomTab = createBottomTabNavigator();

export default function AppNav() {
  const visibleTabNav = useSelector(state => {
    return state.visibleTabNav;
  });

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'white',
          height: 55,
          display: visibleTabNav.visibleTabNav == false ? 'none' : 'flex',
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
                name="home-outline"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
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
                name="chatbubble-ellipses-outline"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
                Tin nhắn
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={MenuPopUp}
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
                style={{position: 'absolute', height: 70, width: 70}}
                resizeMode="cover"
              />
            </View>
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: event => {
            event.preventDefault();
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
                name="crown-outline"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
                Xếp hạng
              </Text>
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={AccountNav}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                justifyContent: 'center',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="user-o"
                size={20}
                color={focused ? '#82C6D0' : '#748c94'}
              />
              <Text
                style={{color: focused ? '#82C6D0' : '#748c94', fontSize: 12}}>
                Tài khoản
              </Text>
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
