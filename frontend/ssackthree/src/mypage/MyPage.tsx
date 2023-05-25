import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Text} from '../components/text';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MyPageStackParamList} from '../navigation/MyPageStack';

export type MyPageProps = NativeStackScreenProps<
  MyPageStackParamList,
  'MyPage'
>;

export default function MyPage({navigation}: MyPageProps): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.container}>
        <View style={styles.profileBar}>
          <Image
            source={require('../../images/olaf.jpeg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>올라프</Text>
        </View>
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceText}>재고떨이쇼핑몰</Text>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={() => navigation.navigate('LikedList')}>
            <Text>찜한 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={() => navigation.navigate('RegularStoreList')}>
            <Text>단골 가게</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.serviceButton}
            onPress={() => navigation.navigate('ReviewList')}>
            <Text>리뷰 관리</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceText}>우리동네</Text>
          <TouchableOpacity style={styles.serviceButton}>
            <Text>찜한 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Text>단골 가게</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Text>리뷰 관리</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    minHeight: '100%',
  },
  profileBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1.5,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 20,
  },
  profileText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: 'black',
  },
  serviceContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: '#d9d9d9',
    borderTopWidth: 1.5,
  },
  serviceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: 'black',
    paddingVertical: 10,
  },
  serviceButton: {
    paddingVertical: 7,
  },
});
