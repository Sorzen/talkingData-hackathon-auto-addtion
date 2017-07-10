module.exports = [
  {
    path: '/',
    name: 'Hello',
    meta: {
      auth: 1,
      title: '订单管理',
    },
    component(resolve) {
      require(['../views/index.vue'], resolve);
    },
  },
  {
    path: '/appdetail/:id',
    name: 'appdetail',
    meta: {
      auth: 1,
      title: '订单管理',
    },
    component(resolve) {
      require(['../views/appdetail.vue'], resolve);
    },
  },
  {
    path: '/appdetail/:id',
    name: 'appdetail_id',
    meta: {
      auth: 1,
      title: '订单管理',
    },
    component(resolve) {
      require(['../views/appdetail.vue'], resolve);
    },
  },
];
