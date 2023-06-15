/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IonIcon from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import NeighborStack from './NeighborStack';
import ReceiptPage from '../receipt/ReceiptPage';
import ChatStack from './ChatStack';
import ChatScreen from '../chat/ChatScreen';

const Tab = createBottomTabNavigator();

type TabBarIconParams = {
  route: {
    name: string;
  };
  focused: boolean;
  color: string;
  size: number;
};

const tabBarIconHander = ({route, focused, color, size}: TabBarIconParams) => {
  let iconName;

  if (route.name === '홈') {
    iconName = focused ? 'md-home' : 'md-home-outline';
  } else if (route.name === '우리동네') {
    iconName = focused ? 'md-people' : 'md-people-outline';
  } else if (route.name === '주문/흥정 내역') {
    iconName = focused ? 'md-receipt' : 'md-receipt-outline';
  } else if (route.name === '채팅') {
    iconName = focused ? 'md-chatbubbles' : 'md-chatbubbles-outline';
  }

  return <IonIcon name={iconName || ''} size={size} color={color} />;
};

export default function MainTab(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabelStyle: {fontSize: 5, marginTop: -10, marginBottom: 8},
          headerShown: false,
          tabBarIcon: props => tabBarIconHander({route, ...props}),
          tabBarActiveTintColor: '#94E048',
          tabBarInactiveTintColor: 'black',
        })}>
        <Tab.Screen name="홈" component={HomeStack} />
        <Tab.Screen name="우리동네" component={NeighborStack} />
        <Tab.Screen name="주문/흥정 내역" component={ReceiptPage} />
        <Tab.Screen name="채팅" component={ChatScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
