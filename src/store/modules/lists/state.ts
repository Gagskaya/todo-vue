import { LoadingStatus } from '@/types/LoadingStatus';
import { State } from './types/state';

export const state: State = {
  items: [],
  loadingStatus: LoadingStatus.NEVER,
};
