import React, {useState} from 'react';
import {PostCodeStackParamList} from '../navigation/PostCodeStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import DragHorizontal from '../components/DragHorizontal';
import {registerLoc} from '../api/useLocation';
import {convertToMeter} from '../service/calculator';

export type SetDetailAddress = NativeStackScreenProps<
  PostCodeStackParamList,
  'SetDetailAddress'
>;

export default function SetDetailAddressPage({
  navigation,
  route,
}: SetDetailAddress): JSX.Element {
  const {
    addressData: {address, detailAddress},
    userId,
  } = route.params;

  const [distance, setDistance] = useState(0);

  const handleRegisterLoc = async () => {
    const res = await registerLoc(
      parseInt(userId, 10),
      address,
      convertToMeter(distance),
    );
    console.log('handleRegisterLoc res:: ', res);
    if (res === 1) {
      navigation.pop(2);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewStyle}>
        <View>
          <Text style={styles.addressText}>{address}</Text>
          <Text>{detailAddress}</Text>
        </View>
        <DragHorizontal distance={distance} handleDistance={setDistance} />
      </ScrollView>
      <TouchableOpacity
        onPress={handleRegisterLoc}
        style={styles.completeButton}>
        <Text style={styles.completeText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: 'white',
    padding: 20,
  },
  scrollViewStyle: {
    width: '100%',
  },
  addressText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
  completeButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#79B53E',
    borderRadius: 5,
  },
  completeText: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 20,
  },
});
