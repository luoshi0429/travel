import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/layout/tabbar-layout'),
      children: [
        {
          path: '',
          meta: {},
          component: () => import('@/pages/home')
        },
        {
          path: 'attention',
          meta: {},
          component: () => import('@/pages/attention')
        },
        {
          path: 'my',
          meta: {},
          component: () => import('@/pages/my')
        }
      ]
    }
  ]
});

export default router;
