import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from '../navigation/HomeStackNavigator';
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};
