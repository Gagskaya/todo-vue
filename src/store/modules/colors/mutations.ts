import { MutationTree } from 'vuex';
import { Color } from './types/colors';
import { Mutations, ColorsMutationsTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ColorsMutationsTypes.SET_COLORS](state, payload: Color[]) {
    state.items = payload;
  },
};
