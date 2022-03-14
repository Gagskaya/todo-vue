import { MutationTree } from 'vuex';

import { List } from './types/list';
import { Mutations, ListsMutationsTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ListsMutationsTypes.SET_LISTS](state, payload: List[]) {
    state.items = payload;
  },
  [ListsMutationsTypes.SET_LIST_TASKS](state, payload: List) {
    state.item = payload;
  },
  [ListsMutationsTypes.ADD_LIST](state, payload: List) {
    state.items = [...state.items, payload];
  },
  [ListsMutationsTypes.SET_LOADING_STATUS](state, payload: string) {
    state.loadingStatus = payload;
  },
  [ListsMutationsTypes.SET_ACTIVE_LIST](state, payload: number) {
    state.activeList = payload;
  },
};
