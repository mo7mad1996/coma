export default [
  {
    path: '/',
    name: 'home',
    component: () => import('~/pages/index.vue')
  },
  {
    path: '/dashboard',
    children: [
      {
        path: 'home',
        name: 'dashboard-home',
        component: () => import('~/pages/dashboard/home.vue')
      },
      {
        path: 'settings',
        name: 'dashboard-settings',
        component: () => import('~/pages/dashboard/settings.vue')
      },
      {
        path: 'donor',
        name: 'dashboard-donor',
        component: () => import('~/pages/dashboard/donor.vue')
      }
    ]
  }
];