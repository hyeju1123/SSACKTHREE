import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '../components/text';
import TabBar from '../components/TabBar';
import ReceiptCard from '../components/receipt/ReceiptCard';
import {getReceipt} from '../api/useReceipt';
import {useRecoilValue} from 'recoil';
import {meData} from '../service/atom';
import {Receipt} from '../model/receipt';

export default function ReceiptPage() {
  const [receiptData, setReceiptData] = useState<Receipt[]>([]);
  const menuTexts = ['주문', '흥정'];
  const [activeIndex, setActiveIndex] = useState(0);
  const {userId} = useRecoilValue(meData);

  useEffect(() => {
    const option = activeIndex === 0 ? 'order' : 'bargain';
    getReceipt(parseInt(userId, 10), option).then(
      data => data && setReceiptData(data),
    );
  }, [userId, activeIndex]);

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
            {receiptData &&
              receiptData.map((data, index) => (
                <ReceiptCard data={data} key={index} />
              ))}
          </>
        ) : (
          <>
            {receiptData &&
              receiptData.map((data, index) => (
                <ReceiptCard data={data} key={index} />
              ))}
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
