import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from '../main/MainPage';
import ProductDetailPage from '../product/ProductDetailPage';
import OrderPage from '../order/OrderPage';
import MyPage from '../mypage/MyPage';
import LikedListPage from '../mypage/LikedListPage';
import ReviewListPage from '../mypage/ReviewListPage';
import RegularStoreListPage from '../mypage/RegularStoreListPage';

export type HomeStackParamList = {
  Home: undefined;
  Product: undefined;
  Order: {bargain: boolean};
  MyPage: undefined;
  LikedList: undefined;
  RegularStoreList: undefined;
  ReviewList: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={MainPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
        name="Product"
        component={ProductDetailPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
        name="Order"
        component={OrderPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '마이페이지',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="MyPage"
        component={MyPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '찜한 목록',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="LikedList"
        component={LikedListPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '단골 가게',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="RegularStoreList"
        component={RegularStoreListPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '리뷰 관리',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
        }}
        name="ReviewList"
        component={ReviewListPage}
      />
    </Stack.Navigator>
  );
}
