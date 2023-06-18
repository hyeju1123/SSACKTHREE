import React from 'react';
import {WebView} from 'react-native-webview';

type Props = {
  uri: string;
};

export default function KakaoPayWebView({uri}: Props) {
  return <WebView source={{uri}} style={{flex: 1}} />;
}
