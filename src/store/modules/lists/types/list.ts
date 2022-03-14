import { Color } from '../../colors/types/colors';
import { ListTask } from './listTask';

export interface List {
  id: number;
  name: string;
  colorId: number;
  color: Color;
  tasks: ListTask[];
}
