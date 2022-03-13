import { MutationTree } from 'vuex';
import { Mutations, ModalMutationsTypes } from './types/mutations';
import { State } from './types/state';

export const mutations: MutationTree<State> & Mutations = {
  [ModalMutationsTypes.TOGGLE_MODAL](state, payload: boolean) {
    state.modal = payload;
  },
};
