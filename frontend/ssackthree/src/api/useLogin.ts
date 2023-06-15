import {SetterOrUpdater, useRecoilState} from 'recoil';
import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';
import useSWR from 'swr';
import {meData} from '../service/atom';

export type LoginProps = {
  username: string;
  password: string;
  setProfile: SetterOrUpdater<AuthUser>;
};

async function login({
  username,
  password,
  setProfile,
}: LoginProps): Promise<AuthUser> {
  const {data} = await customAxios().then(
    res =>
      res &&
      res.post('/api/user/login', {
        username,
        password,
      }),
  );

  const parsedData = JwtDecoder(data.accessToken);

  const {data: imageURL} = await customAxios().then(
    res => res && res.get(`/api/customer/profile/show/${parsedData.userId}`),
  );

  setProfile({...parsedData, imageURL});

  console.log(parsedData);

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

  const handleLogin = (username: string, password: string) => {
    return mutate(() => login({username, password, setProfile}));
  };

  const handleLogout = () => {
    return mutate(undefined, {revalidate: false});
  };

  return {userData, error, isLoading, handleLogin, handleLogout};
}
