import axios from 'axios';

import { List } from '@/store/modules/lists/types/lists';
import { apiUrl } from './apiUrl';

export const listsApi = {
  async fetchLists() {
    const { data } = await axios.get<List[]>(
      `${apiUrl}/lists?_expand=color&_embed=tasks`
    );
    return data;
  },
  async fetchAddList(list: List) {
    await axios.post<List[]>(
      `${apiUrl}/lists?_expand=color&_embed=tasks`,
      list
    );
  },
  async fetchDeleteList(listId: number) {
    await axios.delete<List[]>(`${apiUrl}/lists/${listId}`);
  },
};
