import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  GestureResponderEvent,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';

import { ShopDetail } from '../components/ShopDetail';
import { FloatingActionButton } from '../components/FloatingActionButton';

import { getReviews } from '../config/firebase';
import { Review } from '../types/review';
import { ReviewItem } from '../components/ReviewItem';
import { ReviewsContext } from '../contexts/reviewsContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

const ShopScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { shop } = route.params;
  const { reviews, setReviews } = useContext(ReviewsContext);
  useEffect(() => {
    navigation.setOptions({ headerTitle: shop.name });
    const fetchReviews = async () => {
      const reviews = await getReviews(shop.id);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id!}
      />
      <FloatingActionButton
        iconName="plus"
        onPress={(event: GestureResponderEvent) =>
          navigation.navigate('CreateReview', { shop })
        }
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
