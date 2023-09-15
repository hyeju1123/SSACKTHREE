import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import {Text} from '../components/text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {convertTime, formatPrice} from '../service/calculator';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import usePay, {offerBargain} from '../api/usePay';
import {useRecoilValue} from 'recoil';
import {meData} from '../service/atom';
import {HomeStackParamList} from '../navigation/HomeStack';

export type OrderPageProps = NativeStackScreenProps<
  HomeStackParamList,
  'Order'
>;

export default function OrderPage({
  navigation,
  route,
}: OrderPageProps): JSX.Element {
  const {postId, post} = route.params;
  const {
    writerId,
    menuDetail: {
      name,
      isBargainning,
      bargainLimitTime,
      saleEndTime,
      discountedPrice,
      imagePath,
    },
  } = post;
  const [showModal, setShowModal] = useState(false);
  const [bargainResult, setBargainResult] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const tabBarHeight = useBottomTabBarHeight();
  const {userId} = useRecoilValue(meData);
  const {payData} = usePay(postId.toString());
  const height = Dimensions.get('window').height - tabBarHeight + 25;
  const onOfferPrice = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setOfferPrice(e.nativeEvent.text);
  };

  const handleBargain = async () => {
    const result = await offerBargain(
      writerId,
      parseInt(userId, 10),
      postId,
      parseInt(offerPrice, 10),
    );
    if (result === 1) {
      setBargainResult(true);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      console.log('bargain failed');
    }
  };

  return (
    <View style={[styles.container, {minHeight: height}]}>
      {showModal && (
        <>
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.modalBack}
            onPress={() => setShowModal(false)}
          />
          <View style={styles.bargainModal}>
            <View style={styles.bargainTitleBack}>
              <Text style={styles.bargainTitle}>흥정 제안</Text>
            </View>
            <View style={styles.offerPriceBox}>
              <Text style={styles.offerPriceText}>흥정 제안가</Text>
              <TextInput
                value={offerPrice}
                onChange={onOfferPrice}
                placeholder="0"
                style={styles.offerPriceInput}
              />
              <Text style={styles.offerPriceText}> 원</Text>
            </View>
            <TouchableOpacity
              onPress={handleBargain}
              style={styles.offerButton}>
              <Text>제안하기</Text>
            </TouchableOpacity>
            {bargainResult && (
              <Text style={styles.bargainCompleteText}>
                흥정 제안하였습니다!
              </Text>
            )}
          </View>
        </>
      )}
      <Image source={{uri: imagePath}} style={styles.backgroundImage} />
      <View style={styles.infoBox}>
        <Text style={styles.foodNameText}>{name}</Text>
        {isBargainning === 'T' && (
          <Text style={styles.bargainInfoText}>
            흥정 마감 시간 {`${convertTime(payData?.bargainEndTime || '')} `}(
            {bargainLimitTime} 분간 흥정 가능)
          </Text>
        )}

        <Text style={styles.endTimeText}>
          판매 마감 시간 {convertTime(saleEndTime)}
        </Text>
      </View>
      <View style={styles.mediumSpace}>
        {isBargainning === 'T' && (
          <Text style={styles.highestBargainText}>
            현재 최고 흥정가:{' '}
            {formatPrice(payData?.maxBargainPrice?.toString() || '0')}
          </Text>
        )}
      </View>
      <View style={styles.orderPriceBox}>
        <Text style={styles.orderPriceInfoText}>총 주문금액</Text>
        <Text style={styles.orderPriceText}>
          {formatPrice(discountedPrice.toString())}원
        </Text>
      </View>
      <View style={styles.buttonBox}>
        {isBargainning === 'T' && (
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={[styles.button, {backgroundColor: 'white'}]}>
            <Text style={[styles.buttonText, {color: '#94E048'}]}>
              흥정하기
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Pay', {
              post: post,
              userId: userId,
              postId: postId,
            })
          }
          style={styles.button}>
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
    height: height,
    width: width,
  },
  modalBack: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 9,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bargainModal: {
    backgroundColor: 'white',
    top: 180,
    marginHorizontal: 30,
    width: width - 60,
    position: 'absolute',
    zIndex: 10,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
  },
  bargainTitleBack: {
    backgroundColor: '#94E048',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  bargainTitle: {
    fontFamily: 'Inter-Bold',
    padding: 10,
    fontSize: 20,
  },
  offerPriceBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerPriceText: {
    fontFamily: 'Inter-Bold',
    padding: 10,
    fontSize: 13,
  },
  offerPriceInput: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#94E048',
  },
  offerButton: {
    paddingHorizontal: 10,
    margin: 20,
    borderWidth: 1,
    borderColor: '#94E048',
  },
  bargainCompleteText: {
    fontFamily: 'Inter-Bold',
    paddingBottom: 10,
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
