import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../text';
import AiIcon from 'react-native-vector-icons/AntDesign';
import ProductDetailMenuCard from './ProductDetailMenuCard';
import ProductDetailOtherMenuCard from './ProductDetailOtherMenuCard';
import {ProductPageProps} from '../../product/ProductDetailPage';
import {DetailPost} from '../../model/post';

type Props = {
  onLike: (add: boolean) => void;
  post: DetailPost;
} & ProductPageProps;

export default function ProductDetailMenu({
  onLike,
  post,
  navigation,
  route,
}: Props): JSX.Element {
  const {menuOther} = post;

  return (
    <>
      <ProductDetailMenuCard
        onLike={onLike}
        post={post}
        route={route}
        navigation={navigation}
      />
      <View style={styles.showMoreBox}>
        <Text style={styles.showMoreText}>이 가게의 상품 더보기</Text>
        <View style={styles.dirRowBox}>
          <Text style={[styles.showMoreSmallText, {flex: 1}]}>
            {menuOther.length}건의 할인상품이 있습니다.
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
      {menuOther.map((menu, index) => (
        <ProductDetailOtherMenuCard menu={menu} key={index} />
      ))}
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
