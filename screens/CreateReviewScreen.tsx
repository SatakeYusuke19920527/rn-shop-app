import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../components/IconButton';

import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';

import { Button } from '../components/Button';
import { addReview } from '../config/firebase';

import { UserContext } from '../contexts/userContexts';
import { Review } from '../types/review';

import firebase from 'firebase';
import { pickImage } from '../config/image-picker';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

const CreateReviewScreen = ({ navigation, route }: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>('');
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>('');
  const { user } = useContext(UserContext);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: shop.name,
      headerLeft: () => (
        <IconButton
          name="x"
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [shop]);
  const onSubmit = async () => {
    const review = {
      user: {
        name: user?.name,
        id: user?.id,
      },
      shop: {
        name: shop.name,
        id: shop.id,
      },
      text,
      score,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await addReview(shop.id, review);
  };

  const onPickImage = async () => {
    console.log('this is invoked');
    const uri = await pickImage();
    setImageUri(uri!);
  };

  return (
    <View style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビュー"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button onPress={onSubmit} text="レビューを投稿する" />
    </View>
  );
};

export default CreateReviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
