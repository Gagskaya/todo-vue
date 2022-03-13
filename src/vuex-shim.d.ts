import { Store } from 'vuex';
import { List } from './store/modules/lists/types/lists';

declare module '@vue/runtime-core' {
  // Declare your own store states.
  interface State {
    lists: {
      items: List[];
      loadingStatus: string;
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
