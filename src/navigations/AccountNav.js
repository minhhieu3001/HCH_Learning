import {Easing} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account/AccountScreen';
import EditProfileScreen from '../screens/Account/EditProfileScreen';
import HistoryCall from '../screens/Account/HistoryCall';
import NotificationScreen from '../screens/Common/NotificationScreen';
import PaymentScreen from '../screens/Common/PaymentScreen';
import DetailCall from '../screens/Account/DetailCall';
import ChoosePayment from '../screens/Common/ChoosePayment';

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
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}>
        {props => <AccountScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="noti-screen"
        component={NotificationScreen}
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
      <Stack.Screen
        name="history-call-screen"
        component={HistoryCall}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="payment-screen"
        component={PaymentScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="choose-payment-screen"
        component={ChoosePayment}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="detail-call-screen"
        component={DetailCall}
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
