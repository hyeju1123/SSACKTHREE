import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: string; time: number; date: string }>>([]);
  const [inputText, setInputText] = useState('');

  const navigation = useNavigation();
  const route = useRoute();
  const { name, role } = route.params;

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const currentTime = new Date().getTime();
      const currentDate = new Date().toLocaleDateString('ko-KR');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: 'me', time: currentTime, date: currentDate },
      ]);
      setInputText('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const receivedMessage = '상대방이 보낸 메시지';
      const currentTime = new Date().getTime();
      const currentDate = new Date().toLocaleDateString('ko-KR');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: receivedMessage, sender: 'other', time: currentTime, date: currentDate },
      ]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IonIcon name="chevron-back-outline" size={30} color="#616161" />
        </TouchableOpacity>
        <View style={styles.pageContainer}>
          <View style={styles.pageTitleContainer}>
            <Text style={styles.pageTitle}>{name}</Text>
            <Text style={styles.pageTitle2}>{role}</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => {
          const previousMessage = messages[index - 1];
          const currentDate = message.date;
          const previousDate = previousMessage?.date;

          const shouldDisplayDate = currentDate !== previousDate;

          return (
            <React.Fragment key={index}>
              {shouldDisplayDate && <Text style={styles.dateSeparator}>{currentDate}</Text>}
              <View
                style={[
                  styles.messageItem,
                  message.sender === 'me' ? styles.myMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.messageTime}>{formatTime(message.time)}</Text>
              </View>
            </React.Fragment>
          );
        })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="메시지를 입력하세요"
          placeholderTextColor="#FFFFFF"
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <IonIcon name="paper-plane-outline" size={30} color="#231F20" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 10,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  pageTitle2: {
    fontSize: 14,
    color: 'black',
    marginLeft: 5,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageItem: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  messageTime: {
    fontSize: 12,
    color: '#808080',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#398908',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#94E048',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#94E048',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginRight: 8,
    color: 'white',
  },
  dateSeparator: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    color: '#808080',
    fontSize: 12,
  },
});

export default ChatScreen;
