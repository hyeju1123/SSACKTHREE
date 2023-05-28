import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {DetailPost} from '../../model/post';

type Props = {
  post: DetailPost;
};

export default function StoreHeader({post}: Props): JSX.Element {
  const {
    menuStore: {storeName},
  } = post;

  return (
    <View style={styles.titleBox}>
      <View>
        <Text style={styles.titleText}>{storeName}</Text>
        <Text style={styles.descriptionText}>가게 한줄소개입니다</Text>
      </View>
      <View style={styles.titleIconBox}>
        <FaIcon name="comments-o" size={30} color={'black'} />
        <FaIcon name="star" size={30} color={'#ffc107'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleBox: {
    paddingHorizontal: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    marginVertical: 5,
  },
  descriptionText: {
    color: '#6D6D6D',
    fontSize: 10,
    fontFamily: 'Inter-Light',
  },
  titleIconBox: {
    display: 'flex',
    flexDirection: 'row',
    width: 90,
    justifyContent: 'space-around',
  },
});
