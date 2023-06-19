import {SecondProduct, SecondProductDetail} from '../model/secondhand';
import customAxios from './customAxios';
import useSWR from 'swr';

export const getSecondhandProducts = async (
  userId: number,
  sortType: string,
  isMine: string,
): Promise<SecondProduct[] | undefined> => {
  const url = '/api/town/list';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const {data} = await fetcher.post(url, {userId, sortType, isMine});
  return data;
};

export default function useSecondhandDetail(id: string) {
  const {
    data: secondhandDetailData,
    error,
    isLoading,
  } = useSWR<SecondProductDetail>(`/api/town/list/detail/${id}`);

  return {secondhandDetailData, error, isLoading};
}
