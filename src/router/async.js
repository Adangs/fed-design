export default [
  {
    path: '/design',
    component: () => import('~/views/design/index')
  },

  { path: '*', redirect: '/404', hidden: true }
]
