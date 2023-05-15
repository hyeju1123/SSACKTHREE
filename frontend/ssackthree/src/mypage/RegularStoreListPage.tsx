import React from 'react';
import {StyleSheet, View} from 'react-native';
import MyPageCard from '../components/MyPageCard';

export default function RegularStoreListPage(): JSX.Element {
  return (
    <View style={styles.container}>
      <MyPageCard page={'REGULAR'} />
      <MyPageCard page={'REGULAR'} />
      <MyPageCard page={'REGULAR'} />
      <MyPageCard page={'REGULAR'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
