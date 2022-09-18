import { createRouter, createWebHistory } from 'vue-router';

import SingleList from '@/routes/SingleList.vue';
import AllLists from '@/routes/AllLists.vue';

const routes = [
  {
    path: '/',
    name: 'AllLists',
    component: AllLists,
  },
  {
    path: '/lists/:id',
    name: 'SingleList',
    component: SingleList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
