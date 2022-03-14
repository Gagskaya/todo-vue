import { ColorsActionsTypes, AugmentedActionContext } from './types/actions';
import { ColorsMutationsTypes } from './types/mutations';
import { colorsApi } from '@/services/colorsApi';

export const actions = {
  async [ColorsActionsTypes.FETCH_COLORS]({ commit }: AugmentedActionContext) {
    const colors = await colorsApi.fetchColors();
    commit(ColorsMutationsTypes.SET_COLORS, colors);
  },
};
