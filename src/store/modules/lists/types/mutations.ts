import { state } from '../state';
import { List } from './list';
import { Task } from './task';

export enum ListsMutationsTypes {
  SET_LISTS = 'SET_LISTS',
  SET_LIST = 'SET_LIST_TASKS',
  ADD_LIST = 'ADD_LIST',
  EDIT_LIST_NAME = 'EDIT_LIST_NAME',
  DELETE_LIST = 'DELETE_LIST',
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
  SET_ACTIVE_LIST = 'SET_ACTIVE_LIST',
  ADD_TASK_TO_LIST = 'ADD_TASK_TO_LIST',
  EDIT_TASK_TEXT = 'EDIT_LIST_TASK_TEXT',
  DELETE_TASK_FROM_LIST = 'DELETE_TASK_FROM_LIST',
  TOGGLE_TASK_IS_COMPLETED = 'TOGGLE_TASK_IS_COMPLETED',
  SET_TASK_LOADING_STATUS = 'SET_TASK_LOADING_STATUS',
}

export type Mutations<S = typeof state> = {
  [ListsMutationsTypes.SET_LISTS](state: S, list: List[]): void;
  [ListsMutationsTypes.SET_LIST](state: S, list: List): void;
  [ListsMutationsTypes.ADD_LIST](state: S, list: List): void;
  [ListsMutationsTypes.EDIT_LIST_NAME](
    state: S,
    payload: { listId: string; newName: string }
  ): void;
  [ListsMutationsTypes.DELETE_LIST](state: S, listId: string): void;
  [ListsMutationsTypes.SET_LOADING_STATUS](
    state: S,
    loadingStatus: string
  ): void;
  [ListsMutationsTypes.SET_ACTIVE_LIST](
    state: S,
    activeList: string | null
  ): void;
  [ListsMutationsTypes.ADD_TASK_TO_LIST](state: S, task: Task): void;
  [ListsMutationsTypes.EDIT_TASK_TEXT](
    state: S,
    payload: { taskId: string; newText: string }
  ): void;
  [ListsMutationsTypes.DELETE_TASK_FROM_LIST](state: S, taskId: string): void;
  [ListsMutationsTypes.TOGGLE_TASK_IS_COMPLETED](
    state: S,
    payload: { isCompleted: boolean; taskId: string }
  ): void;
  [ListsMutationsTypes.SET_TASK_LOADING_STATUS](
    state: S,
    taskLoadingStatus: string
  ): void;
};
