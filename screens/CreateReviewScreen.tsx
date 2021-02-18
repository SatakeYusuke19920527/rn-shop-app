import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Image, View, Alert } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../components/IconButton';
import { getExtention } from '../utils/file';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';
import { Loading } from '../components/Loading';
import { Button } from '../components/Button';
import { createReviewRef, uploadImage } from '../config/firebase';
import { UserContext } from '../contexts/userContexts';
import { Review } from '../types/review';
import { ReviewsContext } from '../contexts/reviewsContext';
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
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const { reviews, setReviews } = useContext(ReviewsContext);
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
    if (!text || !imageUri) {
      Alert.alert('レビューまたは画像がありません');
      return;
    }
    setLoading(true);
    // documentのIDを取得
    const reviewDocRef = await createReviewRef(shop?.id);
    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作成する
    const review = {
      id: reviewDocRef.id,
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
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    setReviews([review, ...reviews!]);
    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
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
      <Loading visible={loading} />
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
