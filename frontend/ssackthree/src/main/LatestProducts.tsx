import React, {useEffect} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import LatestProductsCard from '../components/LatestProductCard';
import {HomeAndNeighborProps} from '../navigation/types';
import useMenu from '../api/useMenu';
import ProductSkeletonCard from '../skeleton/ProductSkeletonCard';

export default function LatestProducts({
  navigation,
}: HomeAndNeighborProps): JSX.Element {
  const {menuData, isValidating, mutate} = useMenu();

  const showSkeleton = () => {
    return Array.from({length: 6}, () => 0).map((_, index) => (
      <ProductSkeletonCard key={index} />
    ));
  };

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      mutate();
    });

    return () => {
      unsubscribeFocus();
    };
  }, []);

  return (
    <View style={styles.latestProductsContainer}>
      <Text style={styles.h1Text}>방금 올라온 상품이에요 👀</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {isValidating && showSkeleton()}
        {menuData?.map((menu, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('Product', {postId: menu.menuId})
            }>
            <LatestProductsCard menu={menu} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  latestProductsContainer: {
    marginBottom: 330,
    padding: 15,
  },
  h1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
  scrollViewStyle: {
    marginTop: 10,
  },
});
