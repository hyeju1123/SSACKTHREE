import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../text';
import {MenuStore} from '../../model/post';
import {formatPhoneNumber} from '../../service/calculator';
import MapViewWrapper from '../MapViewWrapper';

type Props = {
  menuStore: MenuStore;
};

export default function StoreInfo({menuStore}: Props): JSX.Element {
  const {
    storeName,
    startTime,
    endTime,
    holiday,
    phoneNumber,
    detailAddress,
    latitude,
    longitude,
  } = menuStore;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>영업정보</Text>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>상호명</Text>
          <Text style={styles.businessInfoDes}>{storeName}</Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>영업시간</Text>
          <Text style={styles.businessInfoDes}>
            {startTime}~{endTime}
          </Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>휴무일</Text>
          <Text style={styles.businessInfoDes}>
            {holiday ? holiday : '없음'}
          </Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>전화번호</Text>
          <Text style={styles.businessInfoDes}>
            {formatPhoneNumber(phoneNumber)}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>가게위치</Text>
        <View style={styles.mapViewWrapper}>
          <MapViewWrapper latitude={latitude} longitude={longitude} />
        </View>
        <Text style={styles.locInfoText}>{detailAddress}</Text>
        <Text style={styles.locInfoText}>
          (나의 주소로부터 약 100m 거리에 있습니다.)
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>가게공지</Text>
        <View style={styles.notificationTextBox}>
          <Text style={styles.businessInfoDes}>
            안녕하세요~ 눈송와플입니다!
          </Text>
          <Text style={styles.businessInfoDes}>앞으로 잘부탁드려요~~~</Text>
          {/* <Text style={styles.businessInfoDes}>쓸 게 없네.......</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    padding: 20,
  },
  businessInfoText: {
    color: 'black',
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
  businessInfoTextBox: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  businessInfoTitle: {
    width: 70,
    color: '#5a5a5a',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  businessInfoDes: {
    color: 'black',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  mapViewWrapper: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  locInfoText: {
    color: '#434343',
    fontFamily: 'Inter-Regular',
    fontSize: 15,
  },
  notificationTextBox: {
    marginTop: 10,
  },
});
