import { state } from '../state';

export enum ModalMutationsTypes {
  TOGGLE_IS_VISIBLE_ADD_LIST = 'TOGGLE_IS_VISIBLE_ADD_LIST',
  TOGGLE_IS_VISIBLE_ADD_TASK = 'TOGGLE_IS_VISIBLE_ADD_TASK',
  TOGGLE_IS_VISIBLE_EDIT_LIST_NAME = 'TOGGLE_IS_VISIBLE_EDIT_LIST',
  TOGGLE_IS_VISIBLE_EDIT_TASK_TEXT = 'TOGGLE_IS_VISIBLE_EDIT_TASK',
  TOGGLE_IS_VISIBLE_DELETE_TASK = 'TOGGLE_IS_VISIBLE_DELETE_TASK',
  TOGGLE_IS_VISIBLE_DELETE_LIST = 'TOGGLE_IS_VISIBLE_DELETE_LIST',
}

export type Mutations<S = typeof state> = {
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_LIST](
    state: S,
    payload: boolean
  ): void;
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_TASK](
    state: S,
    payload: boolean
  ): void;
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_LIST_NAME](
    state: S,
    payload: boolean
  ): void;
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_TASK_TEXT](
    state: S,
    payload: boolean
  ): void;
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_LIST](
    state: S,
    payload: boolean
  ): void;
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_TASK](
    state: S,
    payload: boolean
  ): void;
};
