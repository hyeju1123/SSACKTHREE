import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from './text';

export default function StoreInfo(): JSX.Element {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>영업정보</Text>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>상호명</Text>
          <Text style={styles.businessInfoDes}>파리바게트</Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>영업시간</Text>
          <Text style={styles.businessInfoDes}>09:00~18:00</Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>휴무일</Text>
          <Text style={styles.businessInfoDes}>매주 월요일</Text>
        </View>
        <View style={styles.businessInfoTextBox}>
          <Text style={styles.businessInfoTitle}>전화번호</Text>
          <Text style={styles.businessInfoDes}>02-1234-5678</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>가게위치</Text>
        <Image
          source={require('../../images/loc.png')}
          style={styles.locImage}
        />
        <Text style={styles.locInfoText}>
          서울특별시 용산구 청파로 47길 100
        </Text>
        <Text style={styles.locInfoText}>
          (나의 주소로부터 약 100m 거리에 있습니다.)
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.businessInfoText}>가게공지</Text>
        <View style={styles.notificationTextBox}>
          <Text style={styles.businessInfoDes}>
            안녕하세요~ 파리바게뜨입니다! ......
          </Text>
          <Text style={styles.businessInfoDes}>앞으로 잘부탁드려요~~~</Text>
          <Text style={styles.businessInfoDes}>쓸 게 없네.......</Text>
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
  locImage: {
    marginTop: 15,
    width: '100%',
    height: 200,
    borderRadius: 10,
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
