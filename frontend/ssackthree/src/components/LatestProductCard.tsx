import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from './text';

import FaIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Menu} from '../model/menu';
import {calcDiscountRate} from '../service/calculator';

type Props = {
  menu: Menu;
};

export default function LatestProductsCard({menu}: Props): JSX.Element {
  const {
    name,
    originalPrice,
    discountedPrice,
    distance,
    storeName,
    menuImagePath,
    isLike,
  } = menu;

  function addCommasToPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <>
      <View style={styles.cardContainer}>
        <Image source={{uri: menuImagePath}} style={styles.foodImage} />
        <View style={styles.infoBox}>
          <View style={styles.foodInfoContainer}>
            <View style={styles.foodTitleBox}>
              <Text style={styles.foodTitleText}>{name}</Text>
              {isLike === 'T' ? (
                <IonIcon name="heart" size={15} color={'#FD8535'} />
              ) : (
                <IonIcon name="heart-outline" size={15} color={'#FD8535'} />
              )}
            </View>
          </View>
          <View style={styles.spaceBetweenBox}>
            <View>
              <View style={styles.discountingLine} />
              <Text style={styles.discountedText}>
                ￦ {addCommasToPrice(originalPrice)}
              </Text>
              <Text style={styles.priceText}>
                ￦ {addCommasToPrice(discountedPrice)}
              </Text>
            </View>
            <View style={styles.discountedRatioBox}>
              <Text style={styles.discountedRatioText}>
                {calcDiscountRate(originalPrice, discountedPrice)}%
              </Text>
            </View>
          </View>
          <View style={styles.spaceBetweenBox}>
            <Text style={styles.distanceText}>
              {storeName} | {Math.round(distance)}m
            </Text>
            <View style={styles.reviewPointBox}>
              <FaIcon name="star" size={13} color={'#ffc107'} />
              <Text style={styles.reviewPointText}>4.2</Text>
              <Text style={styles.reviewNumText}>(108)</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
  priceText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    backgroundColor: '#94E048',
    paddingHorizontal: 14,
    paddingVertical: 1,
    borderRadius: 8,
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
  reviewPointBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewPointText: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    paddingHorizontal: 3,
  },
  reviewNumText: {
    color: '#d9d9d9',
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
  },
});
