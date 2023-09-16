import {ChatRoom} from '../model/chat';
import useSWR from 'swr';
import customAxios from './customAxios';

type ChatRoomProps = {
  roomId: number;
  userId1: number;
  userId2: number;
};

export const makeChatRoom = async (
  userId1: number,
  userId2: number,
): Promise<ChatRoomProps | undefined> => {
  const url = '/api/chat/room';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const {data} = await fetcher.post(url, {userId1, userId2});
  return data;
};

export default function useChat(id: string) {
  const {
    data: chatRoomData,
    error,
    isLoading,
    mutate,
  } = useSWR<ChatRoom[]>(`/api/chat/room/list/${id}`);

  return {chatRoomData, error, isLoading, mutate};
}
