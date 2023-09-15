import useSWR from 'swr';
import customAxios from './customAxios';
type Props = {
  address: string;
  m: number;
};

export const registerLoc = async (
  userId: number,
  address: string,
  m: number,
): Promise<number | undefined> => {
  const url = '/api/customer/register/location';
  const fetcher = await customAxios();
  if (!fetcher) {
    return;
  }
  console.log(userId, address, m);
  const res = await fetcher.post(url, {userId, address, m});
  return res.data;
};

export default function useLocation(id: string) {
  const {
    data: locData,
    error,
    isLoading,
    mutate,
  } = useSWR<Props[]>(`/api/customer/show/location/${id}`);

  return {locData, error, isLoading, mutate};
}
