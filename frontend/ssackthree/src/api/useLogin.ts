import {SetterOrUpdater, useRecoilState} from 'recoil';
import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';
import useSWR from 'swr';
import {meData} from '../service/atom';

async function login(setProfile: SetterOrUpdater<AuthUser>): Promise<AuthUser> {
  const {data} = await customAxios().then(
    res =>
      res &&
      res.post('/api/user/login', {
        username: 'hyeju',
        password: '123123',
      }),
  );

  const parsedData = JwtDecoder(data.accessToken);

  const {data: imageURL} = await customAxios().then(
    res => res && res.get(`/api/customer/profile/show/${parsedData.userId}`),
  );
  console.log('imageURL in login', imageURL);

  setProfile({...parsedData, imageURL});

  return parsedData;
}

export default function useAuth() {
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR<AuthUser>('login', login);

  const [_, setProfile] = useRecoilState(meData);

  const handleLogin = () => {
    return mutate(() => login(setProfile));
  };

  const handleLogout = () => {
    return mutate(undefined, {revalidate: false});
  };

  return {userData, error, isLoading, handleLogin, handleLogout};
}
