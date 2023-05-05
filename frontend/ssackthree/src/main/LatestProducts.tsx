import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import LatestProductsCard from '../components/LatestProductCard';
import {MainPageProps} from './MainPage';

export default function LatestProducts({
  navigation,
}: MainPageProps): JSX.Element {
  return (
    <View style={styles.latestProductsContainer}>
      <Text style={styles.h1Text}>방금 올라온 상품이에요 👀</Text>
      <ScrollView style={styles.scrollViewStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <LatestProductsCard />
        </TouchableOpacity>
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
        <LatestProductsCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  latestProductsContainer: {
    padding: 15,
  },
  h1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
  scrollViewStyle: {
    marginTop: 10,
    marginBottom: 160,
  },
});
