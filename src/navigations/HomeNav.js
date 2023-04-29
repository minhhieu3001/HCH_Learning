import {Easing} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/Home/HomeScreen';
import ListTeacherScreen from '../screens/Home/ListTeacherScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import DetailScreen from '../screens/Home/DetailScreen';
import CallScreen from '../screens/Home/CallScreen';
import QuestionTabNav from '../navigations/Question/QuestionTabNav';
import ChatDetailScreen from '../screens/Chat/ChatDetailScreen';
import NotificationScreen from '../screens/Common/NotificationScreen';
import Reviews from '../screens/Home/Reviews';
import PaymentScreen from '../screens/Common/PaymentScreen';
import ResultSearchScreen from '../screens/Home/ResultSearchScreen';
import ChoosePayment from '../screens/Common/ChoosePayment';
import DetailQuestion from '../screens/Question/DetailQuestion';
import CalendarScreen from '../screens/Home/CalendarScreen';

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

export default function HomeNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="home-screen"
        component={HomeScreen}
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
        name="search-screen"
        component={SearchScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="detail-screen"
        component={DetailScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="call-screen"
        component={CallScreen}
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
        name="chat-detail-screen"
        component={ChatDetailScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
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
        name="reviews-screen"
        component={Reviews}
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
        name="detail-question-screen"
        component={DetailQuestion}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="result-screen"
        component={ResultSearchScreen}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}
      />
      <Stack.Screen
        name="calendar-screen"
        component={CalendarScreen}
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
