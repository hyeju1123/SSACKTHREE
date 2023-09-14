import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import {ChatStackParamList} from '../navigation/ChatStack';
import {useRecoilValue} from 'recoil';
import {AuthUser} from '../model/user';
import {meData} from '../service/atom';
import useChat from '../api/useChat';

export type ChatPageProps = NativeStackScreenProps<
  ChatStackParamList,
  'ChatPage'
>;

export default function ChatPage({navigation}: ChatPageProps) {
  const {userId} = useRecoilValue<AuthUser>(meData);
  const {chatRoomData} = useChat(userId);

  return (
    <View style={styles.container}>
      <ScrollView>
        {chatRoomData &&
          chatRoomData
            .reverse()
            .map(
              ({
                chatRoomId,
                counterpartUserId,
                counterpartName,
                counterpartProfile,
                counterpartRole,
              }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      name: counterpartName,
                      role: counterpartRole,
                      userId: userId,
                      counterpartId: counterpartUserId,
                      roomId: chatRoomId,
                    })
                  }
                  key={counterpartName}
                  style={styles.chatItemContainer}>
                  <Image
                    source={
                      counterpartProfile
                        ? {uri: counterpartProfile}
                        : require('../../images/olaf.jpeg')
                    }
                    style={styles.profileImage}
                  />
                  <View style={styles.chatItemContent}>
                    <View style={styles.chatItemHeader}>
                      <Text style={styles.name}>{counterpartName}</Text>
                      <Text style={styles.role}>{counterpartRole}</Text>
                    </View>
                    <Text>{counterpartName}님으로부터 채팅이 왔어요</Text>
                  </View>
                </TouchableOpacity>
              ),
            )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
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
    marginTop: 5,
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
    marginRight: 5,
    color: 'black',
  },
  role: {
    fontSize: 13,
    color: 'black',
  },
  chatItemBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    flex: 1,
    fontSize: 15,
    marginRight: 10,
    color: 'black',
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
