import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PostCodePage, {AddressProps} from '../postcode/PostCodePage';
import PostCodeWrapper from '../components/PostCodeWrapper';
import SetDetailAddressPage from '../postcode/SetDetailAddressPage';

export type PostCodeStackParamList = {
  PostCode: undefined;
  PostCodeWrapper: {userId: string};
  SetDetailAddress: {addressData: AddressProps; userId: string};
};

const Stack = createNativeStackNavigator<PostCodeStackParamList>();

export default function PostCodeStack(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerTitle: '위치 설정',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
        name="PostCode"
        component={PostCodePage}
      />
      <Stack.Screen
        options={{
          headerTitle: '주소 검색',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
        name="PostCodeWrapper"
        component={PostCodeWrapper}
      />
      <Stack.Screen
        options={{
          headerTitle: '상세 정보 입력',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
        name="SetDetailAddress"
        component={SetDetailAddressPage}
      />
    </Stack.Navigator>
  );
}
