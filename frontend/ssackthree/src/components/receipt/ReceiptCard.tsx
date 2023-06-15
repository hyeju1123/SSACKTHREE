import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';

export enum cardState {
  orderComplete = '주문 완료',
  bargaining = '흥정 진행',
  successBargain = '흥정 성공',
  failedBargain = '흥정 실패',
  bargainComplete = '흥정 완료',
}

type Props = {
  state: cardState;
};

export default function ReceiptCard({state}: Props): JSX.Element {
  const setCardStateColor = () => {
    if (
      state === cardState.orderComplete ||
      state === cardState.bargainComplete
    ) {
      return '#398908';
    }
    if (state === cardState.bargaining) {
      return '#94E048';
    }
    if (state === cardState.successBargain) {
      return '#27E288';
    }
    if (state === cardState.failedBargain) {
      return '#000000';
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>2023.04.12</Text>
      <View style={styles.dirRowView}>
        <View
          style={[styles.stateView, {backgroundColor: setCardStateColor()}]}>
          <Text style={[styles.stateText]}>{state}</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.dirRowView}>
            <Text style={styles.menuNameText}>클럽 샌드위치</Text>
            <Text style={{marginLeft: 10}}>이한빵집</Text>
          </View>
          <View style={styles.dirRowView}>
            <Text style={styles.originalPrice}>21,000</Text>
            <AdIcon style={styles.arrowIcon} name="arrowright" />
            <Text style={styles.menuNameText}>19,000</Text>
            {(state === cardState.bargainComplete ||
              state === cardState.orderComplete) && (
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
