import React from 'react';
import Header from './Header';
import OptionTags from './OptionTags';
import LatestProducts from './LatestProducts';
import {HomeStackParamList} from '../stack/HomeStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainPageProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function MainPage({
  navigation,
  route,
}: MainPageProps): JSX.Element {
  return (
    <>
      <Header />
      <OptionTags />
      <LatestProducts navigation={navigation} route={route} />
    </>
  );
}
