import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import AiIcon from 'react-native-vector-icons/AntDesign';

type OptionName = {
  name: string;
};

export default function TagDropdown({name}: OptionName): JSX.Element {
  return (
    <TouchableOpacity style={styles.tagDropdown}>
      <Text style={styles.tagDropdownText}>{name}</Text>
      <AiIcon name="down" size={10} color={'white'} style={{marginLeft: 5}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagDropdown: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#79B53E',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#79B53E',
  },
  tagDropdownText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: 'white',
  },
});
