// import Layout from '~/views/layout/index'

export default [
  {
    path: '/',
    redirect: 'login',
    name: 'home'
  }, {
    path: '/login',
    component: () => import(/* webpackChunkName: "common" */ '~/views/home/index'),
    name: 'login'
  }
]
