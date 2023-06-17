import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/text';
import {useOption} from '../context/OptionContext';

type OptionName = {
  name: string;
};

type OptionMapProps = {
  [index: string]: string;
  B: string;
  WRONG_ORDER: string;
  EXPIRATION: string;
};

const optionMap: OptionMapProps = {
  B: 'B급 상품',
  WRONG_ORDER: '주문 착오 상품',
  EXPIRATION: '유통기한 임박',
  IS_MINE: '내 상품',
};

export default function TagButton({name}: OptionName): JSX.Element {
  const [selected, setSelected] = useState(false);
  const {PRODUCT, handleOptions} = useOption();

  const handleSelect = () => {
    if (selected) {
      setSelected(false);
      const newData = PRODUCT.filter(tag => tag !== name);
      handleOptions('PRODUCT', newData);
    } else {
      setSelected(true);
      handleOptions('PRODUCT', [...PRODUCT, name]);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSelect}
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
        {optionMap[name]}
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
