import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Text} from '../components/text';
import {HomeAndNeighborProps} from '../navigation/types';
import SecondhandGoodsCard from '../components/SecondhandGoodsCard';
import EnIcon from 'react-native-vector-icons/Entypo';
import {useOption} from '../context/OptionContext';
import {useRecoilValue} from 'recoil';
import {meData} from '../service/atom';
import {getSecondhandProducts} from '../api/useSecondhand';
import {SecondProduct} from '../model/secondhand';
import ProductSkeletonCard from '../skeleton/ProductSkeletonCard';

export default function SecondhandGoods({
  navigation,
}: HomeAndNeighborProps): JSX.Element {
  const {SORT, PRODUCT} = useOption();
  const {userId} = useRecoilValue(meData);
  const [goodsData, setGoodsData] = useState<SecondProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const showSkeleton = () => {
    return Array.from({length: 6}, () => 0).map((_, index) => (
      <ProductSkeletonCard key={index} />
    ));
  };

  useEffect(() => {
    setLoading(true);
    const showMine = PRODUCT.includes('IS_MINE') ? 'T' : 'F';
    getSecondhandProducts(parseInt(userId, 10), SORT, showMine).then(data => {
      console.log('data::', data);
      data && setGoodsData(data.reverse());
      setLoading(false);
    });
  }, [userId, SORT, PRODUCT, navigation]);

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
        {loading && showSkeleton()}
        {goodsData &&
          goodsData.map((data, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('GoodsDetail', {
                  userId: userId,
                  productId: data.productId,
                })
              }>
              <SecondhandGoodsCard data={data} />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  latestProductsContainer: {
    minHeight: height - 250,
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
    zIndex: 40,
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
