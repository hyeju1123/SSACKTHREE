import React, {useState} from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../navigation/HomeStack';
import ProductDetailMenu from '../components/meneDetail/ProductDetailMenu';
import StoreInfo from '../components/meneDetail/StoreInfo';
import ProductDetailReview from '../components/meneDetail/ProductDetailReview';
import usePost from '../api/usePost';
import StoreHeader from '../components/meneDetail/StoreHeader';
import TabBar from '../components/TabBar';

export type ProductPageProps = NativeStackScreenProps<
  HomeStackParamList,
  'Product'
>;

export default function ProductDetailPage({
  navigation,
  route,
}: ProductPageProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const {postId} = route.params;
  const {postData} = usePost(postId);
  const menuTexts = ['메뉴', '가게정보', '리뷰'];

  return (
    <>
      {postData && (
        <View style={styles.pageContainer}>
          <ScrollView>
            <StatusBar translucent backgroundColor="transparent" />
            <Image
              source={{uri: postData.menuStore.storeImagePath}}
              style={styles.backgroundImage}
            />
            <View style={styles.detailsContainer}>
              <StoreHeader post={postData} />
              <TabBar
                menuTexts={menuTexts}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              {activeIndex === 0 && (
                <ProductDetailMenu
                  post={postData}
                  navigation={navigation}
                  route={route}
                />
              )}
              {activeIndex === 1 && (
                <StoreInfo menuStore={postData.menuStore} />
              )}
              {activeIndex === 2 && <ProductDetailReview />}
            </View>
          </ScrollView>
        </View>
      )}
    </>
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
});
