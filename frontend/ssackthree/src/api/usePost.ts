import {DetailPost} from '../model/post';
import useSWR from 'swr';

export default function usePost(id: number) {
  const {
    data: postData,
    error,
    isLoading,
  } = useSWR<DetailPost>(`/api/menu/get/detail/${id}`);

  return {postData, error, isLoading};
}