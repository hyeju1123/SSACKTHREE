import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from '../main/MainPage';
import ProductDetailPage from '../product/ProductDetailPage';
import OrderPage from '../order/OrderPage';
import MyPageStack from './MyPageStack';
import {MenuDetail} from '../model/post';
import PostCodeStack from './PostCodeStack';

export type HomeStackParamList = {
  Home: undefined;
  Product: {postId: number};
  Order: {menuDetail: MenuDetail};
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
