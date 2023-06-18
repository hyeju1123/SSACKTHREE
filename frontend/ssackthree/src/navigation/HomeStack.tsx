import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from '../main/MainPage';
import ProductDetailPage from '../product/ProductDetailPage';
import OrderPage from '../order/OrderPage';
import MyPageStack from './MyPageStack';
import {DetailPost} from '../model/post';
import PostCodeStack from './PostCodeStack';
import PayPage from '../order/PayPage';

export type HomeStackParamList = {
  Home: undefined;
  Product: {postId: number};
  Order: {post: DetailPost; postId: number};
  Pay: {post: DetailPost; postId: number; userId: string};
  MyPageStack: undefined;
  PostCodeStack: undefined;
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
          headerTintColor: 'white',
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
          headerTitle: '주문하기',
          headerTitleAlign: 'center',
        }}
        name="Pay"
        component={PayPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyPageStack"
        component={MyPageStack}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PostCodeStack"
        component={PostCodeStack}
      />
    </Stack.Navigator>
  );
}
