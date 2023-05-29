import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {PostCodeStackParamList} from '../navigation/PostCodeStack';

export type PostCodePageProps = NativeStackScreenProps<
  PostCodeStackParamList,
  'PostCode'
>;

export type AddressProps = {
  address: string;
  detailAddress: string;
};

export default function PostCodePage({
  navigation,
}: PostCodePageProps): JSX.Element {
  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <ScrollView style={{width: '100%'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PostCodeWrapper');
            }}
            style={styles.textInput}>
            <Text>지번, 도로명, 건물명으로 검색</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#EDEDED',
  },
});
