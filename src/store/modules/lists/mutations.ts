import { MutationTree } from 'vuex';

import { Mutations, ListsMutationsTypes } from './types/mutations';
import { State } from './types/state';
import { List } from './types/list';

export const mutations: MutationTree<State> & Mutations = {
  [ListsMutationsTypes.SET_LISTS](state, lists) {
    state.items = lists;
  },
  [ListsMutationsTypes.SET_LIST](state, list) {
    state.item = list;
  },
  [ListsMutationsTypes.ADD_LIST](state, list: List) {
    state.items = [...state.items, list];
  },
  [ListsMutationsTypes.EDIT_LIST_NAME](state, payload) {
    state.items = state.items.map((item) => {
      if (item.id === payload.listId) {
        item.name = payload.newName;
        state.item.name = payload.newName;
      }
      return item;
    });
  },
  [ListsMutationsTypes.DELETE_LIST](state, listId) {
    state.items = state.items.filter((item) => item.id !== listId);
  },
  [ListsMutationsTypes.SET_LOADING_STATUS](state, loadingStatus) {
    state.loadingStatus = loadingStatus;
  },
  [ListsMutationsTypes.SET_ACTIVE_LIST](state, activeList) {
    state.activeList = activeList;
  },
  [ListsMutationsTypes.ADD_TASK_TO_LIST](state, task) {
    state.item.tasks = [...state.item.tasks, task];
  },
  [ListsMutationsTypes.EDIT_TASK_TEXT](state, payload) {
    state.item.tasks = state.item.tasks.map((item) => {
      if (item.id === payload.taskId) {
        item.text = payload.newText;
      }
      return item;
    });
  },
  [ListsMutationsTypes.DELETE_TASK_FROM_LIST](state, taskId) {
    state.item.tasks = state.item?.tasks?.filter((item) => item.id !== taskId);
  },
  [ListsMutationsTypes.TOGGLE_TASK_IS_COMPLETED](
    state,
    payload: { isCompleted: boolean; taskId: string }
  ) {
    state.item.tasks = state.item.tasks.map((item) => {
      if (item.id === payload.taskId) {
        item.isCompleted = payload.isCompleted;
      }
      return item;
    });
  },
  [ListsMutationsTypes.SET_TASK_LOADING_STATUS](state, taskLoadingStatus) {
    state.taskLoadingStatus = taskLoadingStatus;
  },
};
