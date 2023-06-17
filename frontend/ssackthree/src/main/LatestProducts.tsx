import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import LatestProductsCard from '../components/LatestProductCard';
import {HomeAndNeighborProps} from '../navigation/types';
import useMenu from '../api/useMenu';
import {useOption} from '../context/OptionContext';

export default function LatestProducts({
  navigation,
}: HomeAndNeighborProps): JSX.Element {
  const {SORT, BARGAIN} = useOption();
  const {menuData, isValidating} = useMenu();
  console.log('sortType in Latest;::', SORT, BARGAIN);
  console.log(menuData);

  return (
    <View style={styles.latestProductsContainer}>
      <Text style={styles.h1Text}>방금 올라온 상품이에요 👀</Text>
      <ScrollView style={styles.scrollViewStyle}>
        {isValidating && <Text>is Loading...</Text>}
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
