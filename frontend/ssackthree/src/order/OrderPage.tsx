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
import {HomeStackParamList} from '../stack/HomeStack';

export type OrderPageProps = NativeStackScreenProps<
  HomeStackParamList,
  'Order'
>;

export default function OrderPage({route}: OrderPageProps): JSX.Element {
  const {bargain} = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../images/sandwich.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.infoBox}>
        <Text style={styles.foodNameText}>파리바게뜨 런치 샌드위치</Text>
        {bargain && (
          <Text style={styles.bargainInfoText}>
            흥정 마감 시간 16:20 (10분간 흥정 가능)
          </Text>
        )}

        <Text style={styles.endTimeText}>판매 마감 시간 18:00</Text>
      </View>
      <View style={styles.mediumSpace}>
        {bargain && (
          <Text style={styles.highestBargainText}>현재 최고 흥정가: 5,000</Text>
        )}
      </View>
      <View style={styles.orderPriceBox}>
        <Text style={styles.orderPriceInfoText}>총 주문금액</Text>
        <Text style={styles.orderPriceText}>9,000원</Text>
      </View>
      <View style={styles.buttonBox}>
        {bargain && (
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
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: width,
    minHeight: height,
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
