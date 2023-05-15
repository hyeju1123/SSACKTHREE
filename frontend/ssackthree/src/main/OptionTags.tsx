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
        <TagDropdown name="최신순" />
        {page === 'HOME' ? (
          <>
            <TagDropdown name="흥정없음" />
            <TagButton name="유통기한 임박" />
            <TagButton name="b급 상품" />
            <TagButton name="주문 착오 상품" />
          </>
        ) : (
          <TagButton name="내 상품" />
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
