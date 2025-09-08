import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/detalhes/:id',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/ocorrencia/:id/adicionar-informacao',
      name: 'infoForm',
      component: () => import('@/views/InfoFormView.vue'),
    },
    {
      path: '/erro-servidor',
      name: 'serverError',
      component: () => import('@/views/ServerErrorView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
