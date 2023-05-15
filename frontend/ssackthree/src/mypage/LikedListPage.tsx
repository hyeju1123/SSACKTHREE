import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MyPageCard from '../components/MyPageCard';

export default function LikedListPage(): JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView>
        <MyPageCard page={'LIKED'} />
        <MyPageCard page={'LIKED'} />
        <MyPageCard page={'LIKED'} />
        <MyPageCard page={'LIKED'} />
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
