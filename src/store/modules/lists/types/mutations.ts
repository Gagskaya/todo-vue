import { state } from '../state';
import { List } from './list';

export enum ListsMutationsTypes {
  SET_LISTS = 'SET_LISTS',
  SET_LIST_TASKS = 'SET_LIST_TASKS',
  ADD_LIST = 'ADD_LIST',
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
  SET_ACTIVE_LIST = 'SET_ACTIVE_LIST',
}

export type Mutations<S = typeof state> = {
  [ListsMutationsTypes.SET_LISTS](state: S, payload: List[]): void;
  [ListsMutationsTypes.SET_LIST_TASKS](state: S, payload: List): void;
  [ListsMutationsTypes.ADD_LIST](state: S, payload: List): void;
  [ListsMutationsTypes.SET_LOADING_STATUS](state: S, payload: string): void;
  [ListsMutationsTypes.SET_ACTIVE_LIST](state: S, payload: number): void;
};
