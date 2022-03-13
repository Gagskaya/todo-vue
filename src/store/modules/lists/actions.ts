import { ListsActionsTypes, AugmentedActionContext } from './types/actions';
import { ListsMutationTypes } from './types/mutations';
import { listsApi } from '@/services/listsApi';
import { List } from './types/lists';
import { LoadingStatus } from '@/types/LoadingStatus';

export const actions = {
  async [ListsActionsTypes.FETCH_LISTS]({ commit }: AugmentedActionContext) {
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    const lists = await listsApi.fetchLists();
    commit(ListsMutationTypes.SET_LISTS, lists);
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
  },
  [ListsActionsTypes.FETCH_ADD_LIST](
    { commit }: AugmentedActionContext,
    list: List
  ) {
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    listsApi.fetchAddList(list);
    commit(ListsMutationTypes.ADD_LIST, list);
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
  },
  [ListsActionsTypes.FETCH_DELETE_LIST](
    { commit }: AugmentedActionContext,
    listId: number
  ) {
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
    listsApi.fetchDeleteList(listId);
    commit(ListsMutationTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
  },
};
