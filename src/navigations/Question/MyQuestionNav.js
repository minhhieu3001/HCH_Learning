import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyQuestionsScreen from '../../screens/Question/MyQuestionsScreen';

const Stack = createNativeStackNavigator();

export default function MyQuestionNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="my-question-screen"
        component={MyQuestionsScreen}
        options={{
          gestureDirection: 'vertical',
        }}
      />
    </Stack.Navigator>
  );
}
