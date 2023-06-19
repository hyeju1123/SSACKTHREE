import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from './text';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {SecondProduct} from '../model/secondhand';
import {formatDateString, formatPrice} from '../service/calculator';

type Props = {
  data: SecondProduct;
};

export default function SecondhandGoodsCard({data}: Props) {
  const {price, title, hopingPlaceAddress, createdDate, imagePath} = data;
  return (
    <View style={styles.container}>
      <Image
        source={
          imagePath !== ''
            ? {uri: imagePath}
            : require('../../images/spam.jpeg')
        }
        style={styles.foodImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.priceText}>{formatPrice(price.toString())}원</Text>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.rowWrapper}>
          <Text style={styles.dateText}>{formatDateString(createdDate)}</Text>
          <Text oneline={true} style={styles.locationText}>
            {hopingPlaceAddress}
          </Text>
        </View>
      </View>
      <IonIcon name="heart-outline" size={15} color={'#FD8535'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: 'black',
  },
  titleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: 'black',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'black',
    marginRight: 5,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#858585',
  },
});
