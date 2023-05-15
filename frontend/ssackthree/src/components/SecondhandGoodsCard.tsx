import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from './text';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function SecondhandGoodsCard() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/spam.jpeg')}
        style={styles.foodImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.priceText}>5,000원</Text>
        <Text style={styles.titleText}>스팸 팔아요</Text>
        <View style={styles.rowWrapper}>
          <Text style={styles.dateText}>2023.04.01</Text>
          <Text oneline={true} style={styles.locationText}>
            서울시 용산구 청파동 3가
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
