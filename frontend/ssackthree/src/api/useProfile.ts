import useSWR from 'swr';

export default function useProfile(id: string) {
  const {
    data: imageURL,
    error,
    isLoading,
  } = useSWR(`/api/customer/profile/show/${id}`);

  return {imageURL, error, isLoading};
}
