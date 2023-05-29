import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {AuthUser} from '../model/user';
import {meData} from '../service/atom';
import {useRecoilValue} from 'recoil';
import useProfile from '../api/useProfile';

export default function Avatar() {
  const {userId} = useRecoilValue<AuthUser>(meData);
  const {imageURL} = useProfile(userId);

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
