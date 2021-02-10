import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

const CreateReviewScreen = ({ navigation, route }: Props) => {
  const { shop } = route.params;
  const handleClick = () => {
    navigation.navigate('Main');
  };
  return (
    <View style={styles.container}>
      <Text>CreateReviewScreen</Text>
      <Button title="button" onPress={handleClick} />
    </View>
  );
};

export default CreateReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
