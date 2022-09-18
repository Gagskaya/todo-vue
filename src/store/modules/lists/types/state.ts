import { List } from './list';

export type State = {
  items: List[];
  item: List;
  activeList: string | null;
  loadingStatus: string;
  taskLoadingStatus: string;
  editedListName: string;
};
