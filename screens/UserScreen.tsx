import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import firebase from 'firebase';
/* types */
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
  route: RouteProp<RootStackParamList, 'User'>;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {};

  return (
    <SafeAreaView style={styles.container}>
      <Text>User</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
