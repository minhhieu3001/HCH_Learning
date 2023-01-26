import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './src/navigations/AppNav';

const App = () => {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};

export default App;
