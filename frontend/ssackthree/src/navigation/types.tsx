import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParamList} from './HomeStack';
import {NeighborStackParamList} from './NeighborStack';

export type HomeAndNeighborProps = NativeStackScreenProps<
  HomeStackParamList & NeighborStackParamList,
  'Home' | 'Neighbor'
>;
