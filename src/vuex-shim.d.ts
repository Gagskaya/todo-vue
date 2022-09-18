import { Store } from 'vuex';

import { List } from './store/modules/lists/types/list';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    lists: {
      items: List[];
      item: List;
      loadingStatus: string;
      taskLoadingStatus: string;
      activeList: number;
      editedListName: string;
    };
    colors: {
      items: Color[];
    };
    modal: {
      isVisibleAddList: boolean;
      isVisibleAddTask: boolean;
      isVisibleDeleteList: false;
      isVisibleDeleteTask: false;
      isVisibleEditListName: false;
      isVisibleEditTaskText: false;
    };
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
