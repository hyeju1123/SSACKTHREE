import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from './text';
import {handleStar} from '../service/uiHook';
import ReviewReplyCard from './ReviewReplyCard';

export default function ReviewCard(): JSX.Element {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.reviewTextContainer}>
          <View>
            <View style={styles.userInfoBox}>
              <Image
                source={require('../../images/olaf.jpeg')}
                style={styles.profileImage}
              />
              <Text style={styles.userNameText}>하이하이</Text>
              <Text style={styles.dateText}>2023.2.4</Text>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {handleStar(3)}
              </View>
            </View>
          </View>
          <Text style={styles.reviewText}>
            사장님이 친절해요 싸게 잘먹었습니당
          </Text>
          <Text style={styles.storeNameText}>파리바게트</Text>
        </View>
        <Image
          source={require('../../images/sandwich.jpg')}
          style={styles.foodImage}
        />
      </View>
      <ReviewReplyCard />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  reviewTextContainer: {
    flex: 1,
    paddingRight: 20,
  },
  userInfoBox: {
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userNameText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: 'black',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#858585',
  },
  reviewText: {
    color: 'black',
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    marginVertical: 10,
  },
  storeNameText: {
    backgroundColor: '#DADADA',
    alignSelf: 'flex-end',
    borderRadius: 5,
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  foodImage: {
    width: 60,
    height: 60,
    marginTop: 15,
  },
});
