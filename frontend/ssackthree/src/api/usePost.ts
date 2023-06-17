import {DetailPost} from '../model/post';
import useSWR from 'swr';
import customAxios from './customAxios';

type LikeProps = {
  menuId: number;
  userId: number;
};

const addLike = async ({menuId, userId}: LikeProps) => {
  const url = '/api/customer/like/menu';
  return customAxios().then(
    axios => axios && axios.post(url, {menuId, userId}).then(res => res.data),
  );
};

const deleteLike = async ({menuId, userId}: LikeProps) => {
  const url = '/api/customer/like/menu';
  return customAxios().then(
    axios =>
      axios &&
      axios
        .delete(url, {
          data: {
            menuId,
            userId,
          },
        })
        .then(res => res.data),
  );
};

export default function usePost(id: number, userId: number) {
  const {
    data: postData,
    error,
    isLoading,
    mutate,
  } = useSWR<DetailPost>(`/api/menu/get/detail/${id}/${userId}`);

  const handleLike = (add: boolean, menuId: number) => {
    if (!postData) {
      return;
    }
    const newData = {
      menuOther: postData.menuOther,
      menuStore: postData.menuStore,
      menuDetail: {
        ...postData.menuDetail,
        isMenuLike: add ? 'T' : 'F',
      },
    };

    const handleFC = add ? addLike : deleteLike;
    return mutate(handleFC({menuId, userId}), {
      optimisticData: newData,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return {postData, error, isLoading, handleLike};
}
