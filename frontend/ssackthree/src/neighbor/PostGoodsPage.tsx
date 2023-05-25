import React from 'react';
import {
  View,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../components/text';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default function PostGoodsPage(): JSX.Element {
  const inputList = [
    {title: '제목', element: <TextInput style={styles.textInput} />},
    {title: '가격', element: <TextInput style={styles.textInput} />},
    {title: '글 내용', element: <TextInput style={styles.textInput} />},
    {
      title: '거래희망장소',
      element: (
        <TextInput
          style={styles.textInput}
          placeholder="장소명을 입력해주세요"
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <View style={styles.pictureContainer}>
        <TouchableOpacity style={styles.addPictureButton}>
          <IonIcons
            style={styles.addPictureButtonText}
            name="camera"
            size={30}
            color={'#6D6D6D'}
          />
          <Text style={styles.addPictureButtonText}>1/5</Text>
        </TouchableOpacity>
      </View>
      {inputList.map(({title, element}) => (
        <View key={title}>
          <Text style={styles.inputListText} children={title} />
          {element}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
    padding: 20,
  },
  pictureContainer: {
    display: 'flex',
    marginBottom: 20,
  },
  addPictureButton: {
    borderRadius: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1.5,
    alignSelf: 'flex-start',
    aspectRatio: 1,
    padding: 4,
  },
  addPictureButtonText: {
    color: '#6D6D6D',
    textAlign: 'center',
  },
  inputListText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  textInput: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
});
