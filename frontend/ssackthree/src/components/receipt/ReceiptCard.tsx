import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import {Receipt} from '../../model/receipt';
import {formatPrice} from '../../service/calculator';

export enum cardState {
  READY = '주문 준비',
  CANCEL = '주문 취소',
  COMPLETED = '주문 완료',
  BARGAIN_ACTIVE = '흥정 진행',
  BARGAIN_SUCCESS = '흥정 성공',
  BARGAIN_FAIL = '흥정 실패',
  BARGAIN_COMPLETED = '흥정 완료',
}

type Props = {
  data: Receipt;
};

export default function ReceiptCard({data}: Props): JSX.Element {
  const {menuName, originalPrice, discountedPrice, status, storeName} = data;

  const setCardStateColor = () => {
    if (status === 'COMPLETED' || status === 'BARGAIN_COMPLETED') {
      return '#398908';
    }
    if (status === 'BARGAIN_ACTIVE' || 'READY') {
      return '#94E048';
    }
    if (status === 'BARGAIN_SUCCESS') {
      return '#27E288';
    }
    if (status === 'BARGAIN_FAIL' || 'CANCEL') {
      return '#000000';
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>2023.04.12</Text>
      <View style={styles.dirRowView}>
        <View
          style={[styles.stateView, {backgroundColor: setCardStateColor()}]}>
          <Text style={[styles.stateText]}>{cardState[status]}</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.dirRowView}>
            <Text style={styles.menuNameText}>{menuName}</Text>
            <Text style={{marginLeft: 10}}>{storeName}</Text>
          </View>
          <View style={styles.dirRowView}>
            <Text style={styles.originalPrice}>
              {formatPrice(originalPrice.toString())}
            </Text>
            <AdIcon style={styles.arrowIcon} name="arrowright" />
            <Text style={styles.menuNameText}>
              {formatPrice(discountedPrice.toString())}
            </Text>
            {(status === 'BARGAIN_COMPLETED' || status === 'COMPLETED') && (
              <View style={styles.reviewButton}>
                <Text style={styles.menuNameText}>리뷰 쓰기</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    padding: 20,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
  },
  dirRowView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  stateView: {
    alignSelf: 'flex-start',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 20,
  },
  stateText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  originalPrice: {
    fontFamily: 'Inter-SemiBold',
    color: '#DADADA',
    textDecorationLine: 'line-through',
  },
  arrowIcon: {
    color: 'black',
    marginHorizontal: 10,
  },
  menuNameText: {
    fontFamily: 'Inter-SemiBold',
    color: 'black',
  },
  dateText: {
    position: 'absolute',
    top: 8,
    right: 20,
  },
  reviewButton: {
    position: 'absolute',
    right: 0,
    borderWidth: 1,
    borderColor: '#94E048',
    borderRadius: 3,
    padding: 2,
  },
});
