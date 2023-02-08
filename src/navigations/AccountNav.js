import {Easing} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account/AccountScreen';
import SettingScreen from '../screens/Common/SettingScreen';
import ListTeacherScreen from '../screens/Home/ListTeacherScreen';
import QuestionTabNav from '../navigations/Question/QuestionTabNav';
import EditProfileScreen from '../screens/Account/EditProfileScreen';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

export default function AccountNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="Account_screen"
        component={AccountScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="setting-screen"
        component={SettingScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="list-teacher"
        component={ListTeacherScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="question-screen"
        component={QuestionTabNav}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="edit-screen"
        component={EditProfileScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
    </Stack.Navigator>
  );
}
