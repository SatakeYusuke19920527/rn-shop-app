import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { AuthScreen } from '../screens/AuthScreen';
export const AppNavigator = () => {
  const user = null;
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
