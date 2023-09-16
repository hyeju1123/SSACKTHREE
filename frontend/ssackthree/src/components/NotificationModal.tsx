import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from './text';
import AiIcon from 'react-native-vector-icons/AntDesign';
import {useNotification} from '../context/NotificationContext';

export default function NotificationModal() {
  const {SHOW, MESSAGE, handleModal} = useNotification();

  return (
    <View style={SHOW ? styles.container : {display: 'none'}}>
      <View style={styles.modalBox}>
        <TouchableOpacity
          onPress={() => handleModal(false, '')}
          style={styles.closeIcon}>
          <AiIcon name="close" size={15} color={'#FD8535'} />
        </TouchableOpacity>
        <Text style={styles.message}>{MESSAGE}</Text>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 200,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  message: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
});
