import React from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../components/text';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useSecondhandDetail from '../api/useSecondhand';
import {formatDateString, formatPrice} from '../service/calculator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NeighborStackParamList} from '../navigation/NeighborStack';

export type OrderPageProps = NativeStackScreenProps<
  NeighborStackParamList,
  'GoodsDetail'
>;

export default function GoodsDetailPage({route}: OrderPageProps) {
  const {productId} = route.params;
  const {secondhandDetailData} = useSecondhandDetail(productId.toString());
  console.log(secondhandDetailData);
  if (!secondhandDetailData) {
    return <Text>loading...</Text>;
  }

  const {
    content,
    createdDate,
    hopingPlaceAddress,
    imagePath,
    price,
    status,
    title,
    townOtherProductResponseDtoList,
  } = secondhandDetailData;

  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 180}}>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          source={
            imagePath !== ''
              ? {uri: imagePath}
              : require('../../images/spam.jpeg')
          }
          style={styles.backgroundImage}
        />
        <View style={styles.mainPostContainer}>
          <View style={styles.rowWrapper}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.onSaleText}>
              {status === 'SALE_ING' ? '판매중' : '판매완료'}{' '}
            </Text>
          </View>
          <Text style={styles.priceText}>
            {formatPrice(price.toString())}원
          </Text>
          <Text style={styles.timeLocText}>
            {hopingPlaceAddress} | {formatDateString(createdDate)}
          </Text>
          <View style={[styles.rowWrapper, {alignSelf: 'flex-end'}]}>
            <IonIcon name="eye" size={20} color="#adadad" />
            <Text style={styles.numText}>52</Text>
            <IonIcon name="heart" size={20} color="#adadad" />
            <Text style={styles.numText}>3</Text>
            <IonIcon name="chatbox" size={20} color="#adadad" />
            <Text style={styles.numText}>2</Text>
          </View>
          <Text style={styles.mainPostText}>{content}</Text>
        </View>
        <View style={styles.mainPostContainer}>
          <View style={styles.rowWrapper}>
            <Text style={styles.desiredLocText}>거래희망장소</Text>
            <Text style={styles.locText}>{hopingPlaceAddress}</Text>
          </View>
          <Image
            source={require('../../images/loc.png')}
            style={styles.locImage}
          />
        </View>
        <View style={styles.mainPostContainer}>
          <View style={styles.rowWrapper}>
            <Image
              source={require('../../images/siren.png')}
              style={styles.sirenImage}
            />
            <Text style={[styles.reportInfoText, {flex: 1, paddingLeft: 20}]}>
              {
                '음식 외의 상품은 거래 금지 품목입니다. \n거래 금지 물품이 판매되고 있다면 신고해주세요'
              }
            </Text>
            <TouchableOpacity style={styles.rowWrapper}>
              <Text style={styles.reportInfoText}>자세히 보기</Text>
              <IonIcon name="chevron-forward" size={15} color="#6d6d6d" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.button, {borderWidth: 1, borderColor: '#D9D9D9'}]}>
            <Text>신고하러 가기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomTab}>
        <View style={styles.rowWrapper}>
          <Image
            source={require('../../images/olaf.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.usernameText}>올라프</Text>
          <Text style={styles.reportInfoText}>신고 누적 횟수: 0회</Text>
        </View>
        <TouchableOpacity style={styles.showMoreGoodsButton}>
          <Text>이 판매자의 상품 더보기</Text>
          <IonIcon name="chevron-forward" size={20} color="#6d6d6d" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#94E048'}]}>
          <Text style={styles.chatButtonText}>채팅하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  mainPostContainer: {
    borderTopColor: '#6d6d6d',
    borderTopWidth: 0.3,
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  titleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
  onSaleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: 'white',
    backgroundColor: '#94E048',
    paddingHorizontal: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  priceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 23,
    color: 'black',
  },
  timeLocText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: '#6D6D6D',
    marginTop: 5,
  },
  mainPostText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#6D6D6D',
    marginTop: 15,
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  numText: {
    fontFamily: 'Inter-Medium',
    color: '#adadad',
    marginHorizontal: 5,
  },
  desiredLocText: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    color: 'black',
  },
  locText: {
    fontFamily: 'Inter-SemiBold',
    color: '#6D6D6D',
  },
  locImage: {
    marginTop: 15,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  sirenImage: {
    width: 30,
    height: 30,
  },
  bottomTab: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: 'white',
    padding: 20,
  },
  button: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
  },
  chatButtonText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 15,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  usernameText: {
    marginHorizontal: 10,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: 'black',
  },
  reportInfoText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#6D6D6D',
  },
  showMoreGoodsButton: {
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
