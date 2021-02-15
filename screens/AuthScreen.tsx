import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from 'react-native';

import { signin } from '../config/firebase';
import { UserContext } from '../contexts/userContexts';
import { User } from '../types/User';

export const AuthScreen: React.FC = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await signin();
      setUser(user as User);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 16,
    fontSize: 12,
    color: '#888',
  },
});
