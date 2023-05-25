import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';
import useSWR from 'swr';

async function login(): Promise<AuthUser> {
  const {data} = await customAxios().then(
    res =>
      res &&
      res.post('/api/user/login', {
        username: 'hyeju',
        password: '123123',
      }),
  );

  return JwtDecoder(data.accessToken);
}

export default function useAuth() {
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR<AuthUser>('login', login);

  const handleLogin = () => {
    return mutate(login);
  };

  const handleLogout = () => {
    return mutate(undefined, {revalidate: false});
  };

  return {userData, error, isLoading, handleLogin, handleLogout};
}
