import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllQuestionScreen from '../../screens/Question/AllQuestionScreen';

const Stack = createNativeStackNavigator();

export default function AllQuestionNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="all-question-screen"
        component={AllQuestionScreen}
        options={{
          gestureDirection: 'vertical',
          //   transitionSpec: {
          //     open: config,
          //     close: closeConfig,
          //   },
        }}
      />
    </Stack.Navigator>
  );
}
