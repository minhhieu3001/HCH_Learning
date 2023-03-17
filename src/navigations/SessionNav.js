import {Easing} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/Session/SignInScreen';
import SignUpScreen from '../screens/Session/SignUpScreen';

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

export default function SessionNav({setIsLogin, deviceToken}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        key="sign-in"
        name="sign-in-screen"
        // component={SignInScreen}
        // initialParams={{setIsLogin}}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}>
        {props => (
          <SignInScreen
            setIsLogin={setIsLogin}
            deviceToken={deviceToken}
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="sign-up-screen"
        component={SignUpScreen}
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
