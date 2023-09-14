import useSWR from 'swr';
import customAxios from './customAxios';

type Props = {
  menuName: string;
  saleEndTime: string;
  menuPrice: number;
  bargainEndTime: string;
  maxBargainPrice: number;
};

type KakaoProps = {
  tid: string;
  next_redirect_mobile_url: string;
  next_redirect_pc_url: string;
};

export const offerBargain = async (
  userId: number,
  menuId: number,
  bargainPrice: number,
) => {
  const url = '/api/bargain/order';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const res = await fetcher.post(url, {userId, menuId, bargainPrice});
  return res.data;
};

export const doPay = async (
  userId: number,
  menuId: number,
  name: string,
  price: number,
): Promise<KakaoProps | undefined> => {
  const url = '/api/payment/kakaopay/ready';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  const res = await fetcher.post(url, {userId, menuId, name, price});
  return res.data;
};

export default function usePay(id: string) {
  const {
    data: payData,
    error,
    isLoading,
  } = useSWR<Props>(`/api/bargain/before/${id}`);

  return {payData, error, isLoading};
}
