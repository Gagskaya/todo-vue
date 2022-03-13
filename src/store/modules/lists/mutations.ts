import { MutationTree } from 'vuex';

import { List } from './types/lists';
import { Mutations, ListsMutationTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ListsMutationTypes.SET_LISTS](state, payload: List[]) {
    state.items = payload;
  },
  [ListsMutationTypes.ADD_LIST](state, payload: List) {
    state.items = [...state.items, payload];
  },
  [ListsMutationTypes.SET_LOADING_STATUS](state, payload: string) {
    state.loadingStatus = payload;
  },
};
