import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text} from './text';

import IonIcon from 'react-native-vector-icons/Ionicons';
import {ProductPageProps} from '../product/ProductDetailPage';

type Props = {
  bargain: boolean;
};

export default function ProductDetailMenuCard({
  bargain,
  navigation,
}: Props & ProductPageProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image
          source={require('../../images/sandwich.jpg')}
          style={styles.foodImage}
        />
        <View style={styles.infoBox}>
          <View style={styles.foodInfoContainer}>
            <View style={styles.foodTitleBox}>
              <Text style={styles.foodTitleText}>파리바게뜨 런치 샌드위치</Text>
              <IonIcon name="heart-outline" size={15} color={'#FD8535'} />
            </View>
            {bargain && (
              <View style={styles.bargainInfoBox}>
                <Text style={styles.bargainInfoText}>
                  흥정{' '}
                  <Text
                    style={[
                      styles.bargainInfoText,
                      {fontFamily: 'Inter-SemiBold'},
                    ]}>
                    가능
                  </Text>{' '}
                  상품입니다.
                </Text>
                <Text style={styles.bargainInfoText}>
                  흥정 마감 시간 16:20 (10분간 흥정 가능)
                </Text>
              </View>
            )}
          </View>
          <View
            style={
              bargain
                ? styles.spaceBetweenBox
                : [styles.spaceBetweenBox, {paddingTop: 30}]
            }>
            <View style={styles.priceInfoBox}>
              <View style={styles.discountingLine} />
              <Text style={styles.discountedText}>￦ 5,400</Text>
              <Text style={styles.priceText}>￦ 3,200</Text>
              <Text style={styles.endTimeText}>판매 마감 시간 18:00</Text>
            </View>
            <View style={styles.discountedRatioBox}>
              <Text style={styles.discountedRatioText}>40%</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => navigation.navigate('Order', {bargain})}>
        <Text style={styles.buyText}>구매하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomColor: '#7e7e7e22',
    borderBottomWidth: 3,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 3,
    marginVertical: 5,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoBox: {
    flex: 1,
    padding: 2,
  },
  foodInfoContainer: {
    padding: 2,
  },
  foodTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  foodTitleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  bargainInfoBox: {
    paddingHorizontal: 5,
  },
  bargainInfoText: {
    color: 'black',
    fontFamily: 'Inter-Light',
    fontSize: 10,
  },
  spaceBetweenBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 3,
  },
  discountingLine: {
    width: 40,
    left: 8,
    top: 5,
    transform: [{rotate: '-10deg'}],
    position: 'absolute',
    borderTopColor: '#FD8535',
    borderTopWidth: 3,
    zIndex: 5,
  },
  discountedText: {
    color: '#d9d9d9',
    fontFamily: 'Inter-SemiBold',
    fontSize: 8,
    paddingHorizontal: 10,
    marginBottom: 3,
  },
  priceInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    backgroundColor: '#94E048',
    paddingHorizontal: 14,
    paddingVertical: 1,
    borderRadius: 8,
  },
  endTimeText: {
    color: 'black',
    fontFamily: 'Inter-Light',
    fontSize: 5,
    paddingHorizontal: 5,
  },
  discountedRatioBox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#FD8535',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  discountedRatioText: {
    color: '#FD8535',
    fontFamily: 'Inter-SemiBold',
    fontSize: 8,
  },
  distanceText: {
    color: '#d9d9d9',
    fontFamily: 'Inter-SemiBold',
    fontSize: 8,
    paddingHorizontal: 5,
  },
  buyButton: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 7,
    marginVertical: 5,
  },
  buyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});
