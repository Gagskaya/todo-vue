import { createRouter, createWebHistory } from 'vue-router';

import ListTasksView from '@/views/ListTasksView.vue';

const routes = [
  {
    path: '/lists/:id',
    name: 'listsTasks',
    component: ListTasksView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
