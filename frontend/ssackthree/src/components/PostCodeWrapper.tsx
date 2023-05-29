import React from 'react';
import PostCode from '@actbase/react-daum-postcode';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PostCodeStackParamList} from '../navigation/PostCodeStack';

export type PostCodePageProps = NativeStackScreenProps<
  PostCodeStackParamList,
  'PostCodeWrapper'
>;

type ResultProps = {
  address: string;
  apartment: string;
  buildingName: string;
};

export default function PostCodeWrapper({
  navigation,
}: PostCodePageProps): JSX.Element {
  const handleAddressData = (data: ResultProps) => {
    let addressData = {detailAddress: data.address};

    if (data.buildingName === 'N') {
      navigation.navigate('SetDetailAddress', {
        addressData: {
          ...addressData,
          address: data.apartment,
        },
      });
    } else {
      navigation.navigate('SetDetailAddress', {
        addressData: {
          ...addressData,
          address: data.buildingName,
        },
      });
    }
  };

  return (
    <>
      <PostCode
        style={{width: '100%', height: '100%'}}
        jsOptions={{animation: true}}
        onSelected={handleAddressData}
        onError={e => console.error(e)}
      />
    </>
  );
}
