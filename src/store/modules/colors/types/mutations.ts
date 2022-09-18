import { state } from '../state';
import { Color } from './color';

export enum ColorsMutationsTypes {
  SET_COLORS = 'SET_COLORS',
}

export type Mutations<S = typeof state> = {
  [ColorsMutationsTypes.SET_COLORS](state: S, colors: Color[]): void;
};
