import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';

import HomeScreen from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import CreateReviewScreen from '../screens/CreateReviewScreen';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerTintColor: '#000',
      }}
    >
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Shop" component={ShopScreen} />
    </RootStack.Navigator>
  );
};

export const HomeStackNavigator = () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen
      name="Main"
      component={MainStack}
      options={{
        headerShown: false,
      }}
    />
    <RootStack.Screen
      name="CreateReview"
      component={CreateReviewScreen}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);
