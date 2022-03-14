import { ActionContext } from 'vuex';
import { Mutations } from '../types/mutations';
import { State } from '../types/state';

export enum ListsActionsTypes {
  FETCH_LISTS = 'FETCH_LISTS',
  FETCH_LIST_TASKS_BY_ID = 'FETCH_LIST_TASKS_BY_ID',
  FETCH_ADD_LIST = 'FETCH_ADD_LIST',
  FETCH_DELETE_LIST = 'FETCH_DELETE_LIST',
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;
