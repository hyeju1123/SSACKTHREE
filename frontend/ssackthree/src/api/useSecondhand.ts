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

export const uploadSecondhandProducts = async (dtoData, products) => {
  const url = '/api/town/register';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }

  const body = new FormData();

  const json = JSON.stringify(dtoData);
  const dto = new Blob([json], {type: 'application/json', lastModified: 1});

  body.append('dto', dto);
  body.append('products', products);

  // console.log(body);
  const {data} = await fetcher.post(url, body, {
    headers: {
      Accept: 'application/json',
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
