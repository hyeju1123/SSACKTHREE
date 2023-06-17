import useSWR from 'swr';
import {Menu} from '../model/menu';
import customAxios from './customAxios';
import {LOCAL_IP} from '../ipConfig';
import {useOption} from '../context/OptionContext';
import {useRecoilValue} from 'recoil';
import {AuthUser} from '../model/user';
import {meData} from '../service/atom';

type OptionMapProps = {
  [index: string]: string;
  최신순: string;
  거리순: string;
  좋아요: string;
  흥정있음: string;
  흥정없음: string;
};

const optionMap: OptionMapProps = {
  최신순: 'latest',
  거리순: 'shortest',
  좋아요: 'like',
  흥정있음: 'T',
  흥정없음: 'F',
};

export default function useMenu() {
  const {SORT, BARGAIN, PRODUCT} = useOption();
  const {userId} = useRecoilValue<AuthUser>(meData);

  const data = {
    sortType: optionMap[SORT],
    isBargainning: optionMap[BARGAIN],
    typeList: PRODUCT.length === 0 ? null : PRODUCT,
    userId: parseInt(userId, 10),
  };

  const url = `http://${LOCAL_IP}:8080/api/menu/get/distance`;
  const {
    data: menuData,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<Menu[]>(url, () =>
    customAxios().then(
      axios => axios && axios.post(url, data).then(res => res.data),
    ),
  );

  console.log('menu data::: ', menuData);

  return {menuData, error, isLoading, isValidating, mutate};
}
