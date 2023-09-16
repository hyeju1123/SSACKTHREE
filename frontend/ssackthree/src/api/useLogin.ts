import {SetterOrUpdater, useRecoilState} from 'recoil';
import {AuthUser} from '../model/user';
import JwtDecoder from '../service/jwtDecoder';
import customAxios from './customAxios';
import useSWR from 'swr';
import {meData} from '../service/atom';
import 'react-native-url-polyfill/auto';
import EventSource from 'react-native-sse';
import {LOCAL_IP} from '../ipConfig';
import {useNotification} from '../context/NotificationContext';

let es: EventSource | null = null;

export type LoginProps = {
  username: string;
  password: string;
  setProfile: SetterOrUpdater<AuthUser>;
};

async function login({
  username,
  password,
  setProfile,
  handleModal,
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

  console.log(parsedData);

  if (!es) {
    es = new EventSource(
      `http://${LOCAL_IP}:8080/notifications/subscribe/${parsedData.userId}`,
    );

    es.addEventListener('open', () => {
      console.log('Open SSE connection');
    });

    es.addEventListener('sse', event => {
      console.log('new message event: ', event.data);
      handleModal(true, event.data);
    });

    es.addEventListener('error', event => {
      if (event.type === 'error') {
        console.error('Connection error:', event.message);
      } else if (event.type === 'exception') {
        console.error('Error:', event.message, event.error);
      }
    });

    es.addEventListener('close', () => {
      console.log('Close SSE connection.');
    });
  }

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
  const {handleModal} = useNotification();

  const handleLogin = (username: string, password: string) => {
    return mutate(() => login({username, password, setProfile, handleModal}));
  };

  const handleLogout = () => {
    es = null;
    return mutate(undefined, {revalidate: false});
  };

  return {
    userData,
    error,
    isLoading,
    handleLogin,
    handleLogout,
  };
}
