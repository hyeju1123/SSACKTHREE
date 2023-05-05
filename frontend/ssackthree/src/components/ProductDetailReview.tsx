import React from 'react';
import {View} from 'react-native';
import ReviewCard from './ReviewCard';

export default function ProductDetailReview(): JSX.Element {
  return (
    <View>
      <ReviewCard />
      <ReviewCard />
    </View>
  );
}
