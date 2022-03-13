import axios from 'axios';

import { Color } from '@/store/modules/colors/types/colors';
import { apiUrl } from './apiUrl';

export const colorsApi = {
  async fetchColors() {
    const { data } = await axios.get<Color[]>(`${apiUrl}/colors`);
    return data;
  },
};
