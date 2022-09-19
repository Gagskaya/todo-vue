import { ActionContext } from 'vuex';
import { Mutations } from '../types/mutations';
import { State } from '../types/state';

export enum ListsActionsTypes {
  FETCH_LISTS = 'FETCH_LISTS',
  FETCH_TASKS_BY_ID = 'FETCH_TASKS_BY_ID',
  FETCH_ADD_LIST = 'FETCH_ADD_LIST',
  FETCH_EDIT_LIST_NAME = 'FETCH_EDIT_LIST_NAME',
  FETCH_DELETE_LIST = 'FETCH_DELETE_LIST',
  FETCH_ADD_TASK_TO_LIST = 'FETCH_ADD_TASK_TO_LIST',
  FETCH_EDIT_TASK_TEXT = 'FETCH_EDIT_TASK_TEXT',
  FETCH_DELETE_TASK_FROM_LIST = 'FETCH_DELETE_TASK_FROM_LIST',
  FETCH_TOGGLE_TASK_IS_COMPLETED = 'FETCH_TOGGLE_TASK_IS_COMPLETED',
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;
