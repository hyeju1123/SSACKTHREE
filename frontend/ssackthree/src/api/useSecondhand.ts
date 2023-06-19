import {SecondProduct, SecondProductDetail} from '../model/secondhand';
import customAxios from './customAxios';
import useSWR from 'swr';

type UploadProps = {
  dto: {
    userId: string;
    title: string;
    price: string;
    content: string;
    hopingPlaceAddress: string;
  };
  file: {
    name: string;
    type: string;
    uri: string;
  };
};

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

export const uploadSecondhandProducts = async ({dto, file}: UploadProps) => {
  const {userId, title, price, content, hopingPlaceAddress} = dto;
  const url = '/api/town/register';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const body = new FormData();

  body.append('userId', userId);
  body.append('title', title);
  body.append('price', price);
  body.append('content', content);
  body.append('hopingPlaceAddress', hopingPlaceAddress);
  body.append('productImages[0]', file);

  const {data} = await fetcher.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
