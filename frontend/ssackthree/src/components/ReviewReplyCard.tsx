import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from './text';

export default function ReviewReplyCard(): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.userInfoBox}>
          <Image
            source={require('../../images/olaf.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.userNameText}>파리바게뜨</Text>
          <Text style={styles.dateText}>2023.2.4 작성</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>소중한 리뷰 감사합니다. ^^</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    marginHorizontal: 20,
    padding: 10,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  userInfoBox: {
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: 'black',
    paddingHorizontal: 10,
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#858585',
  },
  reviewText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginVertical: 10,
  },
});
