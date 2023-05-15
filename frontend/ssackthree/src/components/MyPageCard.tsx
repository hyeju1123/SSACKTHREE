import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import MyPageCardContent from './MyPageCardContent';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Text} from './text';

export type MyPageCardProps = {
  page: 'LIKED' | 'REGULAR' | 'REVIEW';
};

export default function MyPageCard({page}: MyPageCardProps): JSX.Element {
  return (
    <View
      style={[styles.container, page === 'REVIEW' && {paddingVertical: 30}]}>
      {page === 'REVIEW' && <Text style={styles.dateText}>2023.4.8</Text>}
      <Image
        source={require('../../images/sandwich.jpg')}
        style={styles.foodImage}
      />
      <MyPageCardContent page={page} />
      <TouchableOpacity>
        <IonIcon name="close" color={'#760c0c'} size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
  },
  dateText: {
    position: 'absolute',
    left: 10,
    top: 5,
    fontFamily: 'Inter-Medium',
    color: '#6D6D6D',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
