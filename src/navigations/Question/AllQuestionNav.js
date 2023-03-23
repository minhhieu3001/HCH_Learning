import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AllQuestionScreen from '../../screens/Question/AllQuestionScreen';
import CreateQuestionScreen from '../../screens/Question/CreateQuestionScreen';
import DetailQuestion from '../../screens/Question/DetailQuestion';

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
        }}
      />
      <Stack.Screen
        name="create-question-screen"
        component={CreateQuestionScreen}
        options={{
          gestureDirection: 'vertical',
        }}
      />
      <Stack.Screen
        name="detail-question-screen"
        component={DetailQuestion}
        options={{
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
}
