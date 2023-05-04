import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPage from '../main/MainPage';
import ProductDetailPage from '../product/ProductDetailPage';

export type HomeStackParamList = {
  Home: undefined;
  Product: undefined;
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
    </Stack.Navigator>
  );
}
