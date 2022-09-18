import { MutationTree } from 'vuex';
import { Color } from './types/color';
import { Mutations, ColorsMutationsTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ColorsMutationsTypes.SET_COLORS](state, colors) {
    state.items = colors;
  },
};
