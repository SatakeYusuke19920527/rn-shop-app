import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { getShops } from '../config/firebase';
import { Shop } from '../types/Shop';
import ShopReviewItem from '../components/ShopReviewItem';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItem();
  }, []);

  const getFirebaseItem = async () => {
    const shops = (await getShops()) as Shop[];
    setShops(shops);
  };

  const onPressShop = () => {
    navigation.navigate('Shop');
  };

  return (
    <SafeAreaView>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={onPressShop} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
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
});

export default HomeScreen;
