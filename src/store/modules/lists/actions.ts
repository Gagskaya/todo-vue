import { ListsActionsTypes, AugmentedActionContext } from './types/actions';
import { ListsMutationsTypes } from './types/mutations';
import { listsApi } from '@/services/listsApi';
import { List } from './types/list';
import { LoadingStatus } from '@/types/LoadingStatus';

export const actions = {
  async [ListsActionsTypes.FETCH_LISTS]({ commit }: AugmentedActionContext) {
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    const lists = await listsApi.fetchLists();
    commit(ListsMutationsTypes.SET_LISTS, lists);
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
  },
  async [ListsActionsTypes.FETCH_LIST_TASKS_BY_ID](
    { commit }: AugmentedActionContext,
    listId: number
  ) {
    const list = await listsApi.fetchListTasksById(listId);
    commit(ListsMutationsTypes.SET_LIST_TASKS, list);
  },
  [ListsActionsTypes.FETCH_ADD_LIST](
    { commit }: AugmentedActionContext,
    list: List
  ) {
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    listsApi.fetchAddList(list);
    commit(ListsMutationsTypes.ADD_LIST, list);
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
  },
  [ListsActionsTypes.FETCH_DELETE_LIST](
    { commit }: AugmentedActionContext,
    listId: number
  ) {
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    listsApi.fetchDeleteList(listId);
    commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
  },
};
