import axios from 'axios';

import { Color } from '@/store/modules/colors/types/color';
import { apiUrl } from '../constants/apiUrl';

export const colorsApi = {
  async fetchColors() {
    try {
      const { data } = await axios.get<Color[]>(`${apiUrl}/colors`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
