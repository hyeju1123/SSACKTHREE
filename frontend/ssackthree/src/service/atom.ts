import {atom} from 'recoil';
import {AuthUser} from '../model/user';

let meData = atom<AuthUser>({
  key: 'me',
  default: {
    userId: '',
    sub: '',
    role: '',
    exp: 0,
    imageURL: '',
  },
});

export {meData};
