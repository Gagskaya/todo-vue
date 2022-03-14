import { List } from './list';

export type State = {
  items: List[];
  item: List;
  loadingStatus: string;
  activeList: number;
};
