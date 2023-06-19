import React, {useState} from 'react';
import {
  View,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Text} from '../components/text';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useRecoilValue} from 'recoil';
import {meData} from '../service/atom';
import {uploadSecondhandProducts} from '../api/useSecondhand';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NeighborStackParamList} from '../navigation/NeighborStack';

export type PostGoodsPageProps = NativeStackScreenProps<
  NeighborStackParamList,
  'PostGoods'
>;

export default function PostGoodsPage({
  navigation,
}: PostGoodsPageProps): JSX.Element {
  const {userId} = useRecoilValue(meData);
  const [images, setImages] = useState<Asset[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [loading, setLoading] = useState(false);

  const inputList = [
    {
      title: '제목',
      element: (
        <TextInput
          value={title}
          onChange={e => setTitle(e.nativeEvent.text)}
          placeholder="제목을 입력해주세요"
          style={styles.textInput}
        />
      ),
    },
    {
      title: '가격',
      element: (
        <TextInput
          value={price}
          onChange={e => setPrice(e.nativeEvent.text)}
          placeholder="가격을 입력해주세요"
          style={styles.textInput}
        />
      ),
    },
    {
      title: '글 내용',
      element: (
        <TextInput
          value={content}
          onChange={e => setContent(e.nativeEvent.text)}
          placeholder="내용을 입력해주세요"
          style={styles.textInput}
        />
      ),
    },
    {
      title: '거래희망장소',
      element: (
        <TextInput
          value={place}
          onChange={e => setPlace(e.nativeEvent.text)}
          style={styles.textInput}
          placeholder="장소명을 입력해주세요"
        />
      ),
    },
  ];

  const selectImage = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });
    if (!response || response.didCancel) {
      return;
    }

    setImages(response.assets);
    console.log(response.assets[0].fileName);
  };

  const showSelectedImages = () => {
    let contents = [];
    for (let i = 0; i < images.length; i++) {
      contents.push(
        <Image
          key={i}
          style={styles.choosedImage}
          resizeMode="cover"
          source={{uri: images[i].uri}}
        />,
      );
    }
    return contents;
  };

  const uploadProduct = async () => {
    setLoading(true);

    const dto = {
      userId,
      title,
      price,
      content,
      hopingPlaceAddress: place,
    };
    const file = {
      name: images[0].fileName,
      type: images[0].type,
      uri: images[0].uri,
    };

    const res = await uploadSecondhandProducts({dto, file});
    if (res === 1) {
      setLoading(false);
      navigation.goBack();
    }
    console.log('res:: ', res);
  };

  return (
    <View style={styles.container}>
      <View style={loading ? styles.loadingContainer : {display: 'none'}}>
        <View style={styles.loadingModal}>
          <Text style={styles.loadingText}>등록 중입니다...</Text>
        </View>
      </View>
      <ScrollView>
        <StatusBar backgroundColor={'#fff'} />
        <View style={styles.pictureContainer}>
          <TouchableOpacity
            onPress={selectImage}
            style={styles.addPictureButton}>
            <IonIcons
              style={styles.addPictureButtonText}
              name="camera"
              size={30}
              color={'#6D6D6D'}
            />
            <Text style={styles.addPictureButtonText}>{images.length}/5</Text>
          </TouchableOpacity>
          {images?.length !== 0 && (
            <ScrollView horizontal={true} contentContainerStyle={{flexGrow: 1}}>
              {showSelectedImages()}
            </ScrollView>
          )}
        </View>
        {inputList.map(({title, element}) => (
          <View key={title}>
            <Text style={styles.inputListText} children={title} />
            {element}
          </View>
        ))}
        <TouchableOpacity onPress={uploadProduct} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>등록하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
    padding: 20,
  },
  loadingContainer: {
    position: 'absolute',
    width: width,
    height: height,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingModal: {
    marginTop: -70,
    backgroundColor: '#94E048',
    paddingTop: 20,
    borderRadius: 10,
  },
  loadingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  pictureContainer: {
    display: 'flex',
    marginBottom: 20,
    flexDirection: 'row',
  },
  addPictureButton: {
    display: 'flex',
    justifyContent: 'center',
    width: width * 0.2,
    borderRadius: 10,
    borderColor: '#D9D9D9',
    borderWidth: 1.5,
    alignSelf: 'flex-start',
    aspectRatio: 1,
    padding: 4,
  },
  choosedImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 10,
    marginHorizontal: 5,
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
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#94E048',
    paddingVertical: 10,
    marginTop: 80,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
});
