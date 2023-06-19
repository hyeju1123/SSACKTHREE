import useSWR from 'swr';

type Props = {
  address: string;
  m: number;
};

export default function useLocation(id: string) {
  const {
    data: locData,
    error,
    isLoading,
  } = useSWR<Props[]>(`/api/customer/show/location/${id}`);

  return {locData, error, isLoading};
}
