import { ActionContext } from 'vuex';
import { Mutations } from '../types/mutations';
import { State } from '../types/state';

export enum ColorsActionsTypes {
  FETCH_COLORS = 'FETCH_COLORS',
}

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;
