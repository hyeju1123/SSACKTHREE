import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../components/text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/HomeStack';
import {convertTime, formatPrice} from '../service/calculator';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

export type OrderPageProps = NativeStackScreenProps<
  HomeStackParamList,
  'Order'
>;

export default function OrderPage({route}: OrderPageProps): JSX.Element {
  const {menuDetail} = route.params;
  const {
    name,
    isBargainning,
    bargainLimitTime,
    saleEndTime,
    originalPrice,
    imagePath,
  } = menuDetail;
  const tabBarHeight = useBottomTabBarHeight();
  const height = Dimensions.get('window').height - tabBarHeight + 25;

  return (
    <View style={[styles.container, {minHeight: height}]}>
      <Image source={{uri: imagePath}} style={styles.backgroundImage} />
      <View style={styles.infoBox}>
        <Text style={styles.foodNameText}>{name}</Text>
        {isBargainning && (
          <Text style={styles.bargainInfoText}>
            {bargainLimitTime} 분간 흥정 가능
          </Text>
        )}

        <Text style={styles.endTimeText}>
          판매 마감 시간 {convertTime(saleEndTime)}
        </Text>
      </View>
      <View style={styles.mediumSpace}>
        {isBargainning && (
          <Text style={styles.highestBargainText}>현재 최고 흥정가: 5,000</Text>
        )}
      </View>
      <View style={styles.orderPriceBox}>
        <Text style={styles.orderPriceInfoText}>총 주문금액</Text>
        <Text style={styles.orderPriceText}>
          {formatPrice(originalPrice.toString())}원
        </Text>
      </View>
      <View style={styles.buttonBox}>
        {isBargainning && (
          <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]}>
            <Text style={[styles.buttonText, {color: '#94E048'}]}>
              흥정하기
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>주문하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  infoBox: {
    paddingVertical: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#7e7e7e22',
    borderBottomWidth: 3,
  },
  foodNameText: {
    fontFamily: 'Inter-Regular',
    fontSize: 17,
    color: 'black',
    paddingBottom: 3,
  },
  bargainInfoText: {
    fontFamily: 'Inter-Light',
    fontSize: 13,
    color: 'black',
    paddingBottom: 3,
  },
  endTimeText: {
    fontFamily: 'Inter-Light',
    fontSize: 11,
    color: 'black',
  },
  mediumSpace: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  highestBargainText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#6D6D6D',
  },
  orderPriceBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderColor: '#d9d9d9',
    borderTopWidth: 1,
  },
  orderPriceInfoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: 'black',
  },
  orderPriceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: 'black',
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#94E048',
    borderColor: '#94E048',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  buttonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    color: 'white',
  },
});
