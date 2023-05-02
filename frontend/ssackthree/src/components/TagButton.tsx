import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';

type OptionName = {
  name: string;
};

export default function TagButton({name}: OptionName): JSX.Element {
  const [selected, setSelected] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={
        selected
          ? [styles.tagButton, {backgroundColor: '#3C6117'}]
          : styles.tagButton
      }>
      <Text
        style={
          selected
            ? [styles.tagButtonText, {color: 'white'}]
            : styles.tagButtonText
        }>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tagButton: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 1,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3C6117',
  },
  tagButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: 'black',
  },
});
