import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AuthUser} from '../model/user';
import {meData} from '../service/atom';
import {useRecoilValue} from 'recoil';

export default function Avatar() {
  const {imageURL} = useRecoilValue<AuthUser>(meData);

  return (
    <>
      {imageURL ? (
        <Image source={{uri: imageURL}} style={styles.profileImage} />
      ) : (
        <Image
          source={require('../../images/olaf.jpeg')}
          style={styles.profileImage}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
