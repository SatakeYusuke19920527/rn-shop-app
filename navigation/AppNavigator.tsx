import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { AuthScreen } from '../screens/AuthScreen';
import { UserContext } from '../contexts/userContexts';

export const AppNavigator = () => {
  const { user } = useContext(UserContext);
  console.log(user?.id);
  return (
    <NavigationContainer>
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
