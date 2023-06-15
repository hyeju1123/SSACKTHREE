import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  menuTexts: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

export default function TabBar({
  menuTexts,
  activeIndex,
  setActiveIndex,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {menuTexts.map((text, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveIndex(index)}
            style={[
              styles.tabButton,
              activeIndex === index && styles.activeTabButton,
            ]}>
            <Text
              style={[
                styles.tabButtonText,
                activeIndex === index && styles.activeTabButtonText,
              ]}>
              {text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomColor: '#94E048',
    borderBottomWidth: 3,
  },
  tabButtonText: {
    color: 'black',
    fontSize: 17,
    fontFamily: 'Inter-Light',
  },
  activeTabButtonText: {
    fontFamily: 'Inter-Bold',
  },
});
