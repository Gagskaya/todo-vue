import axios from 'axios';

import { List } from '@/store/modules/lists/types/list';

import { apiUrl } from '../constants/apiUrl';
import { Task } from '@/store/modules/lists/types/task';

export const listsApi = {
  async fetchLists() {
    try {
      const { data } = await axios.get<List[]>(
        `${apiUrl}/lists?_expand=color&_embed=tasks`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async fetchTasksById(listId: string) {
    try {
      const { data } = await axios.get<List>(
        `${apiUrl}/lists/${listId}?_expand=color&_embed=tasks`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAddList(list: List) {
    try {
      await axios.post(`${apiUrl}/lists`, list);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchEditListName(listId: string, newName: string) {
    try {
      await axios.patch(`${apiUrl}/lists/${listId}`, { name: newName });
    } catch (e) {
      console.log(e);
    }
  },
  async fetchDeleteList(listId: string) {
    try {
      await axios.delete(`${apiUrl}/lists/${listId}`);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchAddTaskToList(task: Task) {
    try {
      await axios.post(`${apiUrl}/tasks`, task);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchEditListTaskText(taskId: string, newText: string) {
    try {
      await axios.patch(`${apiUrl}/tasks/${taskId}`, { text: newText });
    } catch (e) {
      console.log(e);
    }
  },
  async fetchToggleTaskIsCompleted(isCompleted: boolean, taskId: string) {
    try {
      await axios.patch(`${apiUrl}/tasks/${taskId}`, { isCompleted });
    } catch (e) {
      console.log(e);
    }
  },
  async fetchDeleteTaskFromList(taskId: string) {
    try {
      await axios.delete(`${apiUrl}/tasks/${taskId}`);
    } catch (e) {
      console.log(e);
    }
  },
};
