import {Receipt} from '../model/receipt';
import customAxios from './customAxios';

export const getReceipt = async (
  userId: number,
  type: string,
): Promise<Receipt[] | undefined> => {
  const url = '/api/customer/orderBargain/history';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const {data} = await fetcher.post(url, {userId, type});
  return data;
};
