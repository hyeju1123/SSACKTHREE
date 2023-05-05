import React, {useState} from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text} from '../components/text';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../stack/HomeStack';
import ProductDetailMenu from './ProductDetailMenu';
import StoreInfo from '../components/StoreInfo';
import ProductDetailReview from '../components/ProductDetailReview';

export type ProductPageProps = NativeStackScreenProps<
  HomeStackParamList,
  'Product'
>;

export default function ProductDetailPage({
  navigation,
  route,
}: ProductPageProps): JSX.Element {
  const [storeInfoState, setstoreInfoState] = useState(0);

  return (
    <View style={styles.pageContainer}>
      <ScrollView>
        <StatusBar translucent backgroundColor="transparent" />
        <Image
          source={require('../../images/paris.jpeg')}
          style={styles.backgroundImage}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.titleBox}>
            <View>
              <Text style={styles.titleText}>파리바게트</Text>
              <Text style={styles.descriptionText}>가게 한줄소개입니다</Text>
            </View>
            <View style={styles.titleIconBox}>
              <FaIcon name="comments-o" size={30} color={'black'} />
              <FaIcon name="star" size={30} color={'#ffc107'} />
            </View>
          </View>
          <View style={styles.storeInfoBox}>
            <View style={styles.storeInfoToggleBox}>
              <TouchableOpacity
                onPress={() => setstoreInfoState(0)}
                style={
                  storeInfoState === 0
                    ? [
                        styles.storeInfoToggleButton,
                        {borderBottomColor: '#94E048', borderBottomWidth: 3},
                      ]
                    : [styles.storeInfoToggleButton]
                }>
                <Text
                  style={
                    storeInfoState === 0
                      ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                      : styles.storeInfoToggleText
                  }>
                  메뉴
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setstoreInfoState(1)}
                style={
                  storeInfoState === 1
                    ? [
                        styles.storeInfoToggleButton,
                        {borderBottomColor: '#94E048', borderBottomWidth: 3},
                      ]
                    : [styles.storeInfoToggleButton]
                }>
                <Text
                  style={
                    storeInfoState === 1
                      ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                      : styles.storeInfoToggleText
                  }>
                  가게정보
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setstoreInfoState(2)}
                style={
                  storeInfoState === 2
                    ? [
                        styles.storeInfoToggleButton,
                        {borderBottomColor: '#94E048', borderBottomWidth: 3},
                      ]
                    : [styles.storeInfoToggleButton]
                }>
                <Text
                  style={
                    storeInfoState === 2
                      ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                      : styles.storeInfoToggleText
                  }>
                  리뷰
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {storeInfoState === 0 && (
            <ProductDetailMenu navigation={navigation} route={route} />
          )}
          {storeInfoState === 1 && <StoreInfo />}
          {storeInfoState === 2 && <ProductDetailReview />}
        </View>
      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: 'white',
    width: width,
    minHeight: height,
    display: 'flex',
  },
  backgroundImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: -30,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
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
  storeInfoBox: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
  storeInfoToggleBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  storeInfoToggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  storeInfoToggleText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-Light',
  },

  headerContainer: {
    backgroundColor: '#94E048',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMenuLeft: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    alignItems: 'center',
  },
  locText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  headerMenuRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  inputContainer: {
    height: 40,
    marginTop: 7,
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 20,
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: '#94E048',
    borderBottomWidth: 1,
  },
});
