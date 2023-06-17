import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import TagDropdown from '../components/TagDropdown';
import TagButton from '../components/TagButton';

type pageTypeProps = {
  page: 'HOME' | 'NEIGHBOR';
};

export default function OptionTags({page}: pageTypeProps): JSX.Element {
  return (
    <View style={styles.optionTagsContainer}>
      <ScrollView horizontal={true}>
        <TagDropdown optionType="SORT" />
        {page === 'HOME' ? (
          <>
            <TagDropdown optionType="BARGAIN" />
            <TagButton name="EXPIRATION" />
            <TagButton name="B" />
            <TagButton name="WRONG_ORDER" />
          </>
        ) : (
          <TagButton name="IS_MINE" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  optionTagsContainer: {
    paddingTop: 15,
    paddingLeft: 20,
  },
});
