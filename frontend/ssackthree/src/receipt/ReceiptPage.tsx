import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '../components/text';
import TabBar from '../components/TabBar';
import ReceiptCard, {cardState} from '../components/receipt/ReceiptCard';

export default function ReceiptPage(): JSX.Element {
  const menuTexts = ['주문', '흥정'];
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.headerText}>주문 및 흥정 내역</Text>
        <TabBar
          menuTexts={menuTexts}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        {activeIndex === 0 ? (
          <>
            <ReceiptCard state={cardState.orderComplete} />
            <ReceiptCard state={cardState.orderComplete} />
          </>
        ) : (
          <>
            <ReceiptCard state={cardState.bargaining} />
            <ReceiptCard state={cardState.successBargain} />
            <ReceiptCard state={cardState.bargainComplete} />
            <ReceiptCard state={cardState.failedBargain} />
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  scrollView: {
    width: '100%',
    display: 'flex',
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 30,
  },
});
