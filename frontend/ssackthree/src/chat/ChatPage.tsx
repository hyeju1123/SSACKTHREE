import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, StyleSheet,ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

interface ChatItem {
  id: number;
  profileImage: any;
  name: string;
  role: string;
  message: string;
  unreadCount: number;
}

const Chatpage: React.FC = () => {
  const [chatData, setChatData] = useState<ChatItem[]>([
    {
      id: 1,
      profileImage: 'https://via.placeholder.com/150',
      name: '가게이름',
      role: '점주',
      message: '마감시간이 10분 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ연장되어 채팅드립니다',
      unreadCount: 2,
    },
    {
      id: 2,
      profileImage: 'https://via.placeholder.com/150',
      name: '눈송와플집',
      role: '점주',
      message: '알겠습니다.',
      unreadCount: 0,
    },

  ]);

  const navigation = useNavigation();

  const renderChatItem = ({ item }: { item: ChatItem }) => {
    const { profileImage, name, role, message, unreadCount } = item;

    return (
      <TouchableOpacity style={styles.chatItemContainer} onPress={() => navigation.navigate('ChatScreen', { name,role })}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <View style={styles.chatItemContent}>
          <View style={styles.chatItemHeader}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
          <View style={styles.chatItemBody}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.message}>{message}</Text>
            {unreadCount > 0 && <View style={styles.unreadBadge}><Text style={styles.unreadCount}>{unreadCount}</Text></View>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name="chevron-back-outline" size={30} color="#616161" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>채팅</Text>
      </View>
      <View style={styles.container2}>
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:1,
    backgroundColor:'white'
  },
  container2: {
    flex: 1,
    padding:10,
    backgroundColor:'white'
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 56,
    paddingHorizontal: 10,
  },
  pageTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginRight: 30,
  },
  chatItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop:5,
  },
  chatItemContent: {
    marginLeft: 16,
    flex: 1,
  },
  chatItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:5,
    color:'black'
  },
  role: {
    fontSize: 13,
    color:'black'
  },
  chatItemBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 15,
    marginRight:10,
    color:'black'
  },
  unreadBadge: {
    width: 30,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#94E048',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 8,
  },
});

export default Chatpage;
