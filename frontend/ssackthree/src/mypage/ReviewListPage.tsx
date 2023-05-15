import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MyPageCard from '../components/MyPageCard';

export default function ReviewListPage(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView>
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
        <MyPageCard page={'REVIEW'} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
