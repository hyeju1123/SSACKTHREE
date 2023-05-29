import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AiIcon from 'react-native-vector-icons/AntDesign';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from '../components/text';
import {HomeAndNeighborProps} from '../navigation/types';
import useAuth from '../api/useLogin';
import Avatar from '../components/Avatar';

export default function Header({
  navigation,
}: HomeAndNeighborProps): JSX.Element {
  const {handleLogout} = useAuth();

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
            <TouchableOpacity onPress={handleLogout}>
              <McIcon
                name="bell"
                size={24}
                color={'white'}
                style={{marginRight: 7}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('MyPageStack')}>
              <Avatar />
            </TouchableOpacity>
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
