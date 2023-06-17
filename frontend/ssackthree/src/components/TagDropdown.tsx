import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '../components/text';
import AiIcon from 'react-native-vector-icons/AntDesign';
import {useOption} from '../context/OptionContext';

type OptionName = {
  optionType: string;
};

type TagStateProps = {
  [index: string]: string;
  SORT: string;
  BARGAIN: string;
};

type ShowTagsProps = {
  [index: string]: boolean;
  SORT: boolean;
  BARGAIN: boolean;
};

export default function TagDropdown({optionType}: OptionName): JSX.Element {
  const {handleOptions} = useOption();

  const [tagState, setTagState] = useState<TagStateProps>({
    SORT: '최신순',
    BARGAIN: '흥정없음',
  });
  const [showTags, setShowTags] = useState<ShowTagsProps>({
    SORT: false,
    BARGAIN: false,
  });

  const handleDropdown = () => {
    setShowTags({...showTags, [optionType]: !showTags[optionType]});
  };

  const handleSelect = (tag: string) => {
    setTagState({...tagState, [optionType]: tag});
    setShowTags({...showTags, [optionType]: false});
    handleOptions(optionType, tag);
  };

  const handleDropdownList = () => {
    const sortList = ['최신순', '거리순', '좋아요'];
    const bargainList = ['흥정없음', '흥정있음'];

    if (optionType === 'SORT') {
      return sortList
        .filter(tag => tag !== tagState[optionType])
        .map((tag, index) => (
          <TouchableOpacity
            onPress={() => handleSelect(tag)}
            key={index}
            style={styles.tagButton}>
            <Text style={styles.tagButtonText}>{tag}</Text>
          </TouchableOpacity>
        ));
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
            handleSelect(
              bargainList.filter(tag => tag !== tagState[optionType])[0],
            )
          }
          style={styles.tagButton}>
          <Text style={styles.tagButtonText}>
            {bargainList.filter(tag => tag !== tagState[optionType])[0]}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handleDropdown} style={styles.tagDropdown}>
        <Text style={styles.tagDropdownText}>{tagState[optionType]}</Text>
        <AiIcon
          name="right"
          size={10}
          color={'white'}
          style={{marginLeft: 5}}
        />
      </TouchableOpacity>
      <View
        style={[
          optionType === 'SORT' && showTags[optionType]
            ? styles.dropdownWrapper
            : {display: 'none'},
        ]}>
        {handleDropdownList()}
      </View>
      <View
        style={[
          optionType === 'BARGAIN' && showTags[optionType]
            ? styles.dropdownWrapper
            : {display: 'none'},
        ]}>
        {handleDropdownList()}
      </View>
    </>
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
  dropdownWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
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
