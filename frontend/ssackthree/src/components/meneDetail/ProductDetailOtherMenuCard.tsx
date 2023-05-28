import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '../text';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {MenuOther} from '../../model/post';
import {calcDiscountRate, formatPrice} from '../../service/calculator';

type Props = {
  menu: MenuOther;
};

export default function ProductDetailOtherMenuCard({menu}: Props): JSX.Element {
  const {name, originamlPrice, discountedPrice, imagePath} = menu;
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={{uri: imagePath}} style={styles.foodImage} />
        <View style={styles.infoBox}>
          <View style={styles.foodInfoContainer}>
            <View style={styles.foodTitleBox}>
              <Text style={styles.foodTitleText}>{name}</Text>
              <IonIcon name="heart-outline" size={15} color={'#FD8535'} />
            </View>
            <View style={styles.dirRowBox}>
              <Text style={styles.discountRatioText}>
                {calcDiscountRate(originamlPrice, discountedPrice)}%
              </Text>
              <View>
                <View style={styles.discountingLine} />
                <Text style={styles.discountedText}>
                  ￦ {formatPrice(originamlPrice.toString())}
                </Text>
              </View>
            </View>
            <View style={styles.priceTextBox}>
              <Text style={styles.priceText}>
                ￦ {formatPrice(discountedPrice.toString())}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
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
    padding: 5,
  },
  foodTitleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodTitleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  dirRowBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  discountRatioText: {
    color: '#FD8535',
    fontFamily: 'Inter-ExtraBold',
    fontSize: 13,
  },
  discountingLine: {
    width: 55,
    left: 10,
    top: 9,
    transform: [{rotate: '-10deg'}],
    position: 'absolute',
    borderTopColor: '#FD8535',
    borderTopWidth: 3,
    zIndex: 5,
  },
  discountedText: {
    color: '#d9d9d9',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingHorizontal: 10,
  },
  priceInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceTextBox: {
    backgroundColor: '#94E048',
    borderRadius: 9,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    paddingHorizontal: 14,
    paddingVertical: 1,
  },
});
