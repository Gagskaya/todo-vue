import { LoadingStatus } from '@/types/LoadingStatus';
import { List } from './types/list';
import { State } from './types/state';

export const state: State = {
  items: [],
  item: {} as List,
  loadingStatus: LoadingStatus.NEVER,
  taskLoadingStatus: LoadingStatus.NEVER,
  activeList: null,
  editedListName: '',
};
