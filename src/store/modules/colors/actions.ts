import { ColorsActionsTypes, AugmentedActionContext } from './types/actions';
import { ColorsMutationsTypes } from './types/mutations';
import { colorsApi } from '@/services/colorsApi';

export const actions = {
  async [ColorsActionsTypes.FETCH_COLORS]({ commit }: AugmentedActionContext) {
    const colors = await colorsApi.fetchColors();
    if (colors) {
      commit(ColorsMutationsTypes.SET_COLORS, colors);
    }
  },
};
