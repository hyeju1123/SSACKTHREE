import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import NeighborPage from '../neighbor/NeighborPage';
import MyPageStack from './MyPageStack';
import GoodsDetailPage from '../neighbor/GoodsDetailPage';
import PostGoodsPage from '../neighbor/PostGoodsPage';
import ChatScreen from '../chat/ChatScreen';

export type NeighborStackParamList = {
  Neighbor: undefined;
  GoodsDetail: {userId: string; productId: number};
  RegistGoods: undefined;
  PostGoods: undefined;
  MyPageStack: undefined;
  ChatScreen: {name: string; role: string; userId: string; roomId: number};
};

const Stack = createNativeStackNavigator<NeighborStackParamList>();

export default function NeighborStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Neighbor"
        component={NeighborPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: 'white',
        }}
        name="GoodsDetail"
        component={GoodsDetailPage}
      />
      <Stack.Screen
        options={{
          headerTitle: '상품 등록',
          headerTitleAlign: 'center',
        }}
        name="PostGoods"
        component={PostGoodsPage}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MyPageStack"
        component={MyPageStack}
      />
      <Stack.Screen
        options={{
          headerTitle: '채팅',
          headerTitleAlign: 'center',
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
}
