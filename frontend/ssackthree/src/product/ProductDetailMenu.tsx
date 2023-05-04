import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import AiIcon from 'react-native-vector-icons/AntDesign';
import ProductDetailMenuCard from '../components/ProductDetailMenuCard';
import ProductDetailOtherMenuCard from '../components/ProductDetailOtherMenuCard';

export default function ProductDetailMenu(): JSX.Element {
  return (
    <>
      <ProductDetailMenuCard bargain={true} />
      <View style={styles.showMoreBox}>
        <Text style={styles.showMoreText}>이 가게의 상품 더보기</Text>
        <View style={styles.dirRowBox}>
          <Text style={[styles.showMoreSmallText, {flex: 1}]}>
            4건의 할인상품이 있습니다.
          </Text>
          <TouchableOpacity style={styles.dirRowBox}>
            <Text style={styles.showMoreSmallText}>전체</Text>
            <AiIcon
              name="down"
              size={13}
              color={'black'}
              style={{marginLeft: 3}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ProductDetailOtherMenuCard />
      <ProductDetailOtherMenuCard />
    </>
  );
}

const styles = StyleSheet.create({
  showMoreBox: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  showMoreText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: 'black',
    paddingVertical: 8,
  },
  dirRowBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  showMoreSmallText: {
    fontFamily: 'Inter-Light',
    fontSize: 10,
    color: 'black',
  },
});
