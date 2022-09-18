import { MutationTree } from 'vuex';

import { Mutations, ModalMutationsTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_LIST](
    state,
    isVisibleAddList: boolean
  ) {
    state.isVisibleAddList = isVisibleAddList;
  },
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_ADD_TASK](
    state,
    isVisibleAddTask: boolean
  ) {
    state.isVisibleAddTask = isVisibleAddTask;
  },
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_LIST_NAME](
    state,
    isVisibleEditListName: boolean
  ) {
    state.isVisibleEditListName = isVisibleEditListName;
  },
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_EDIT_TASK_TEXT](
    state,
    isVisibleEditTaskText: boolean
  ) {
    state.isVisibleEditTaskText = isVisibleEditTaskText;
  },
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_LIST](
    state,
    isVisibleDeleteList: boolean
  ) {
    state.isVisibleDeleteList = isVisibleDeleteList;
  },
  [ModalMutationsTypes.TOGGLE_IS_VISIBLE_DELETE_TASK](
    state,
    isVisibleDeleteTask: boolean
  ) {
    state.isVisibleDeleteTask = isVisibleDeleteTask;
  },
};
