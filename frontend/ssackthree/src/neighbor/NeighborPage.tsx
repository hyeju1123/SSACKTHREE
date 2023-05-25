import React from 'react';
import {View} from 'react-native';
import Header from '../main/Header';
import OptionTags from '../main/OptionTags';
import {HomeAndNeighborProps} from '../navigation/types';
import SecondhandGoods from './SecondhandGoods';

export default function NeighborPage({
  navigation,
  route,
}: HomeAndNeighborProps): JSX.Element {
  return (
    <View style={{backgroundColor: 'white', minHeight: '100%'}}>
      <Header navigation={navigation} route={route} />
      <OptionTags page="NEIGHBOR" />
      <SecondhandGoods navigation={navigation} route={route} />
    </View>
  );
}
