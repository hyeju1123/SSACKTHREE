import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {HomeStackParamList} from '../navigation/HomeStack';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {calcDiscountRate, formatPrice} from '../service/calculator';
import {doPay} from '../api/usePay';

export type PayPageProps = NativeStackScreenProps<HomeStackParamList, 'Pay'>;

export default function PayPage({
  route,
  navigation,
}: PayPageProps): JSX.Element {
  const [togo, setTogo] = useState(true);
  const {post, userId, postId} = route.params;
  const {
    menuDetail: {name, originalPrice, discountedPrice},
    menuStore: {storeName, detailAddress},
  } = post;

  const handlePay = async () => {
    console.log(postId);
    const res = await doPay(
      parseInt(userId, 10),
      postId,
      name,
      discountedPrice,
    );

    if (!res) {
      navigation.navigate('KakaoPay', {uri: 'https://www.pixar.com/404'});
      return;
    }

    navigation.navigate('KakaoPay', {uri: res?.next_redirect_pc_url});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.semiContainer}>
          <Text style={styles.titleText}>매장 정보</Text>
          <Text style={styles.semiText}>{storeName}</Text>
          <Text style={styles.semiText}>{detailAddress}</Text>
        </View>
        <View style={styles.semiContainer}>
          <Text style={styles.titleText}>이용 방법</Text>
          <TouchableOpacity onPress={() => setTogo(true)} style={styles.rowBox}>
            <IonIcon
              name={`${togo ? 'radio-button-on' : 'radio-button-off'}`}
              size={13}
            />
            <Text style={styles.semiText}>포장</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTogo(false)}
            style={styles.rowBox}>
            <IonIcon
              name={`${togo ? 'radio-button-off' : 'radio-button-on'}`}
              size={13}
            />
            <Text style={styles.semiText}>배달</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.semiContainer}>
          <Text style={styles.titleText}>제품 정보</Text>
          <Text style={styles.semiText}>{name}</Text>
          <View style={styles.productBox}>
            <View
              style={[
                styles.rowBox,
                {marginBottom: 10, justifyContent: 'space-between'},
              ]}>
              <Text>원래 가격</Text>
              <Text>할인된 가격</Text>
              <Text>할인율</Text>
            </View>
            <View style={[styles.rowBox, {justifyContent: 'space-between'}]}>
              <Text>{formatPrice(originalPrice.toString())}</Text>
              <Text>{formatPrice(discountedPrice.toString())}</Text>
              <Text>{calcDiscountRate(originalPrice, discountedPrice)} %</Text>
            </View>
          </View>
        </View>
        <View style={styles.semiContainer}>
          <Text style={styles.titleText}>결제 수단</Text>
          <TouchableOpacity style={styles.rowBox}>
            <IonIcon name={'radio-button-on'} size={13} />
            <Text style={styles.semiText}>카카오페이</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={handlePay} style={styles.button}>
          <Text style={styles.buttonText}>결제하기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  semiContainer: {
    padding: 20,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  rowBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    color: 'black',
    fontSize: 15,
    marginBottom: 10,
  },
  semiText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    marginBottom: 3,
    paddingHorizontal: 3,
  },
  productBox: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#94E048',
    marginVertical: 3,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#94E048',
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    bottom: 105,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
  },
});
