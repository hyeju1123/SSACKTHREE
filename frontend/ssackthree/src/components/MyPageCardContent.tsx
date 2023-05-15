import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './text';
import {MyPageCardProps} from './MyPageCard';
import {handleStar} from '../service/uiHook';

export default function MyPageCardContent(
  pageProps: MyPageCardProps,
): JSX.Element {
  const contents = fillContents(pageProps);
  return <>{contents}</>;
}

const fillContents = ({page}: MyPageCardProps) => {
  if (page === 'LIKED') {
    return (
      <View style={styles.container}>
        <Text>파리바게뜨 | 70m</Text>
        <View style={styles.rowWrapper}>
          <Text style={styles.nameText}>런치 샌드위치</Text>
          <Text style={styles.ratioText}>40%</Text>
        </View>
        <View style={styles.rowWrapper}>
          <Text style={styles.originalPriceText}>5,400원</Text>
          <Text style={styles.discountedPriceText}>3,200원</Text>
        </View>
      </View>
    );
  } else if (page === 'REVIEW') {
    return (
      <View style={styles.container}>
        <Text style={styles.reivewProductText}>파리바게뜨 런치 샌드위치</Text>
        <Text style={styles.reviewText}>
          너무 맛있어요 싸게 살 수 있어서 좋았어요.
        </Text>
        <View style={styles.rowWrapper}>{handleStar(4)}</View>
        <TouchableOpacity style={styles.fixReviewButton}>
          <Text style={styles.fixReviewButtonText}>수정</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{...styles.container, justifyContent: 'center'}}>
        <Text style={styles.nameText}>파리바게뜨</Text>
        <Text style={styles.locationText} oneline={true}>
          서울 용산구 효창원로 149
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
  rowWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
    marginRight: 10,
  },
  ratioText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: '#FD8535',
  },
  originalPriceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#CDCDCD',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountedPriceText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: 'black',
  },
  reivewProductText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#434343',
  },
  reviewText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'black',
  },
  fixReviewButton: {
    alignSelf: 'flex-end',
  },
  fixReviewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: 'black',
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
    paddingHorizontal: 3,
  },
  locationText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#6D6D6D',
    marginTop: 3,
  },
});
