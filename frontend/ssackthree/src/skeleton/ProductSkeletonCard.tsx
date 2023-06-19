import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ProductSkeletonCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.image} />
      <View>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.longLine} />
        <View style={styles.longLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ededed',
  },
  line: {
    width: 150,
    height: 7,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#ededed',
    borderRadius: 20,
  },
  longLine: {
    width: 200,
    height: 7,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#ededed',
    borderRadius: 20,
  },
});
