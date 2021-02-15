import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import firebase from 'firebase';
/* types */
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { Form } from '../components/Form';
import { Button } from '../components/Button';
import { UserContext } from '../contexts/userContexts';
import { updateUser } from '../config/firebase';
type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
  route: RouteProp<RootStackParamList, 'User'>;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string>('');
  const onSubmit = async () => {
    await updateUser(user?.id!, { name });
    setName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        label="name"
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Button text="保存する" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
