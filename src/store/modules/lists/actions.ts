import { AugmentedActionContext, ListsActionsTypes } from './types/actions';
import { ListsMutationsTypes } from './types/mutations';
import { listsApi } from '@/services/listsApi';
import { List } from './types/list';
import { LoadingStatus } from '@/types/LoadingStatus';
import { Task } from '@/store/modules/lists/types/task';
import { ColorsActionsTypes } from '@/store/modules/colors/types/actions';

export const actions = {
  async [ListsActionsTypes.FETCH_LISTS]({ commit }: AugmentedActionContext) {
    try {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);
      const lists = await listsApi.fetchLists();

      if (lists) {
        commit(ListsMutationsTypes.SET_LISTS, lists);
      }
    } catch (e) {
      console.log(e);
    } finally {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
    }
  },
  async [ListsActionsTypes.FETCH_TASKS_BY_ID](
    { commit }: AugmentedActionContext,
    listId: string
  ) {
    try {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.LOADING
      );

      const list = await listsApi.fetchTasksById(listId);

      if (list) {
        commit(ListsMutationsTypes.SET_LIST, list);
      }
    } catch (e) {
      console.log(e);
    } finally {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.SUCCESS
      );
    }
  },
  async [ListsActionsTypes.FETCH_ADD_LIST](
    { commit, dispatch }: any,
    list: List
  ) {
    try {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);

      await listsApi.fetchAddList(list);

      commit(ListsMutationsTypes.ADD_LIST, list);
      dispatch(ColorsActionsTypes.FETCH_COLORS);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(ListsActionsTypes.FETCH_LISTS);
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
    }
  },
  async [ListsActionsTypes.FETCH_EDIT_LIST_NAME](
    { commit }: AugmentedActionContext,
    payload: { listId: string; newName: string }
  ) {
    try {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);

      await listsApi.fetchEditListName(payload.listId, payload.newName);

      commit(ListsMutationsTypes.EDIT_LIST_NAME, {
        listId: payload.listId,
        newName: payload.newName,
      });
    } catch (e) {
      console.log(e);
    } finally {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
    }
  },
  async [ListsActionsTypes.FETCH_DELETE_LIST](
    { commit }: AugmentedActionContext,
    listId: string
  ) {
    try {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.LOADING);

      await listsApi.fetchDeleteList(listId);

      commit(ListsMutationsTypes.DELETE_LIST, listId);
    } catch (e) {
      console.log(e);
    } finally {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
    }
  },
  async [ListsActionsTypes.FETCH_ADD_TASK_TO_LIST](
    { commit }: AugmentedActionContext,
    task: Task
  ) {
    try {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.LOADING
      );

      await listsApi.fetchAddTaskToList(task);

      commit(ListsMutationsTypes.ADD_TASK_TO_LIST, task);
    } catch (e) {
      console.log(e);
    } finally {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.SUCCESS
      );
    }
  },
  async [ListsActionsTypes.FETCH_EDIT_TASK_TEXT](
    { commit }: AugmentedActionContext,
    payload: { taskId: string; newText: string }
  ) {
    try {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.LOADING
      );

      await listsApi.fetchEditListTaskText(payload.taskId, payload.newText);

      commit(ListsMutationsTypes.EDIT_TASK_TEXT, {
        taskId: payload.taskId,
        newText: payload.newText,
      });
    } catch (e) {
      console.log(e);
    } finally {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.SUCCESS
      );
    }
  },
  async [ListsActionsTypes.FETCH_DELETE_TASK_FROM_LIST](
    { commit }: AugmentedActionContext,
    taskId: string
  ) {
    try {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.LOADING
      );

      await listsApi.fetchDeleteTaskFromList(taskId);

      commit(ListsMutationsTypes.DELETE_TASK_FROM_LIST, taskId);
    } catch (e) {
      console.log(e);
    } finally {
      commit(
        ListsMutationsTypes.SET_TASK_LOADING_STATUS,
        LoadingStatus.SUCCESS
      );
    }
  },
  async [ListsActionsTypes.FETCH_TOGGLE_TASK_IS_COMPLETED](
    { commit }: AugmentedActionContext,
    payload: { isCompleted: boolean; taskId: string }
  ) {
    try {
      await listsApi.fetchToggleTaskIsCompleted(
        payload.isCompleted,
        payload.taskId
      );

      commit(ListsMutationsTypes.TOGGLE_TASK_IS_COMPLETED, {
        isCompleted: payload.isCompleted,
        taskId: payload.taskId,
      });
    } catch (e) {
      console.log(e);
    } finally {
      commit(ListsMutationsTypes.SET_LOADING_STATUS, LoadingStatus.SUCCESS);
    }
  },
};
