import {ChatRoom} from '../model/chat';
import useSWR from 'swr';

export default function useChat(id: string) {
  const {
    data: chatRoomData,
    error,
    isLoading,
  } = useSWR<ChatRoom[]>(`/api/chat/room/list/${id}`);

  return {chatRoomData, error, isLoading};
}
