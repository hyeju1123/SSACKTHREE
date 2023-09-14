import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {WebView} from 'react-native-webview';
import {HomeStackParamList} from '../navigation/HomeStack';

export type KakaoPayWebViewProps = NativeStackScreenProps<
  HomeStackParamList,
  'KakaoPay'
>;

export default function KakaoPayWebView({route}: KakaoPayWebViewProps) {
  const {uri} = route.params;
  return (
    <WebView
      source={{uri}}
      style={{flex: 1}}
      allowFileAccess={true}
      scalesPageToFit={true}
      originWhitelist={['*']}
    />
  );
}
