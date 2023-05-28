import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

type Props = {
  storeInfoState: number;
  setstoreInfoState: (menu: number) => void;
};

export default function MenuActionBar({
  storeInfoState,
  setstoreInfoState,
}: Props) {
  return (
    <View style={styles.storeInfoBox}>
      <View style={styles.storeInfoToggleBox}>
        <TouchableOpacity
          onPress={() => setstoreInfoState(0)}
          style={
            storeInfoState === 0
              ? [
                  styles.storeInfoToggleButton,
                  {
                    borderBottomColor: '#94E048',
                    borderBottomWidth: 3,
                  },
                ]
              : [styles.storeInfoToggleButton]
          }>
          <Text
            style={
              storeInfoState === 0
                ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                : styles.storeInfoToggleText
            }>
            메뉴
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setstoreInfoState(1)}
          style={
            storeInfoState === 1
              ? [
                  styles.storeInfoToggleButton,
                  {
                    borderBottomColor: '#94E048',
                    borderBottomWidth: 3,
                  },
                ]
              : [styles.storeInfoToggleButton]
          }>
          <Text
            style={
              storeInfoState === 1
                ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                : styles.storeInfoToggleText
            }>
            가게정보
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setstoreInfoState(2)}
          style={
            storeInfoState === 2
              ? [
                  styles.storeInfoToggleButton,
                  {
                    borderBottomColor: '#94E048',
                    borderBottomWidth: 3,
                  },
                ]
              : [styles.storeInfoToggleButton]
          }>
          <Text
            style={
              storeInfoState === 2
                ? [styles.storeInfoToggleText, {fontFamily: 'Inter-Bold'}]
                : styles.storeInfoToggleText
            }>
            리뷰
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  storeInfoBox: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
  storeInfoToggleBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  storeInfoToggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  storeInfoToggleText: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Inter-Light',
  },
});
