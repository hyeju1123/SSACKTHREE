import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from '../main/MainPage';
import ProductDetailPage from '../product/ProductDetailPage';
import OrderPage from '../order/OrderPage';
import MyPageStack from './MyPageStack';

export type HomeStackParamList = {
  Home: undefined;
  Product: undefined;
  Order: {bargain: boolean};
  MyPageStack: undefined;
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
    </Stack.Navigator>
  );
}
