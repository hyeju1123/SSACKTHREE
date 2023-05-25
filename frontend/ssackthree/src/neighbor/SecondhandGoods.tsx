import React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import {HomeAndNeighborProps} from '../navigation/types';
import SecondhandGoodsCard from '../components/SecondhandGoodsCard';
import EnIcon from 'react-native-vector-icons/Entypo';

export default function SecondhandGoods({
  navigation,
}: HomeAndNeighborProps): JSX.Element {
  return (
    <View style={styles.latestProductsContainer}>
      <Text style={styles.h1Text}>아직 거래되지 않은 상품이에요 👀</Text>
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => navigation.navigate('PostGoods')}>
        <EnIcon name="plus" color={'white'} size={20} />
        <Text style={styles.postButtonText}>등록하기</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollViewStyle}>
        <TouchableOpacity onPress={() => navigation.navigate('GoodsDetail')}>
          <SecondhandGoodsCard />
        </TouchableOpacity>
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
        <SecondhandGoodsCard />
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
  postButton: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    zIndex: 10,
    backgroundColor: '#94E048',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  postButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
});
