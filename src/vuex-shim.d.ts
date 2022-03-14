import { Store } from 'vuex';
import { List } from './store/modules/lists/types/list';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    lists: {
      items: List[];
      item: List;
      loadingStatus: string;
      activeList: number;
    };
    colors: {
      items: Color[];
    };
    modal: {
      modal: boolean;
    };
  }

  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
