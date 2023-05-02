import React from 'react';
import {View, StyleSheet, StatusBar, Image, TextInput} from 'react-native';
import AiIcon from 'react-native-vector-icons/AntDesign';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from '../components/text';

export default function Header(): JSX.Element {
  return (
    <>
      <StatusBar backgroundColor={'#94E048'} />
      <View style={styles.headerContainer}>
        <View style={styles.headerMenuContainer}>
          <View style={styles.headerMenuLeft}>
            <Text style={styles.locText}>숙명여자대학교</Text>
            <AiIcon
              name="down"
              size={13}
              color={'white'}
              style={{marginLeft: 3}}
            />
          </View>
          <View style={styles.headerMenuRight}>
            <McIcon
              name="bell"
              size={24}
              color={'white'}
              style={{marginRight: 7}}
            />
            <Image
              source={require('../../images/olaf.jpeg')}
              style={styles.profileImage}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <AiIcon
            name="search1"
            size={20}
            color={'#94E048'}
            style={{marginRight: 10, backgroundColor: 'white'}}
          />
          <TextInput style={styles.input} placeholder="Batch Number" />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#94E048',
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerMenuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerMenuLeft: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    alignItems: 'center',
  },
  locText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
  },
  headerMenuRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  inputContainer: {
    height: 40,
    marginTop: 7,
    padding: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 20,
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: '#94E048',
    borderBottomWidth: 1,
  },
});
