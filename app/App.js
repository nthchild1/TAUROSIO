import 'react-native-gesture-handler';

import React from 'react';
import type {Node} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './routes/AppNavigator';

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
