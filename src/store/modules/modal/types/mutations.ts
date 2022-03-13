import { state } from '../state';

export enum ModalMutationsTypes {
  TOGGLE_MODAL = 'TOGGLE_MODAL',
}

export type Mutations<S = typeof state> = {
  [ModalMutationsTypes.TOGGLE_MODAL](state: S, payload: boolean): void;
};
