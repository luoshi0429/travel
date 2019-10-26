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
          component: () => import('@/pages/home/home')
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
    },
    {
      path: '/search',
      component: () => import('@/pages/home/search')
    },
    {
      path: '/city',
      component: () => import('@/pages/city/city')
    },
    {
      path: '/vip',
      name: 'vip',
      component: () => import('@/pages/vip/vip'),
    },
    {
      path: '/vip/success',
      name: 'vipSuccess',
      component: () => import('@/pages/vip/success')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/pages/detail/detail')
    },
    {
      path: '/pay',
      name: 'pay',
      component: () => import('@/pages/pay/pay')
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import('@/pages/tag/tag')
    }
  ]
});

export default router;
