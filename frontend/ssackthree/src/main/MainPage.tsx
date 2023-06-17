import React from 'react';
import {View} from 'react-native';
import Header from './Header';
import OptionTags from './OptionTags';
import LatestProducts from './LatestProducts';
import {HomeAndNeighborProps} from '../navigation/types';
import {OptionProvider} from '../context/OptionContext';

export default function MainPage({
  navigation,
  route,
}: HomeAndNeighborProps): JSX.Element {
  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      <Header navigation={navigation} route={route} />
      <OptionProvider>
        <OptionTags page="HOME" />
        <LatestProducts navigation={navigation} route={route} />
      </OptionProvider>
    </View>
  );
}
