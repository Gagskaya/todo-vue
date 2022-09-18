import { Color } from '../../colors/types/color';
import { Task } from './task';

export interface List {
  id: string;
  name: string;
  colorId: number;
  color: Color;
  tasks: Task[];
}
