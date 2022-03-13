import { createStore } from 'vuex';

import lists from './modules/lists';
import colors from './modules/colors';
import modal from './modules/modal';

export default createStore({
  modules: {
    lists,
    colors,
    modal,
  },
});
