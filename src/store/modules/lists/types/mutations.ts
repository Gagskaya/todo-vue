import { state } from '../state';
import { List } from '../types/lists';
export enum ListsMutationTypes {
  SET_LISTS = 'SET_LISTS',
  ADD_LIST = 'ADD_LIST',
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
}

export type Mutations<S = typeof state> = {
  [ListsMutationTypes.SET_LISTS](state: S, payload: List[]): void;
  [ListsMutationTypes.ADD_LIST](state: S, payload: List): void;
  [ListsMutationTypes.SET_LOADING_STATUS](state: S, payload: string): void;
};
