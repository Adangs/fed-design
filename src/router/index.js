import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getCookie } from '~/utils/index'
import staticRouter from './static' // 静态路由列表
// import store from '../store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
Vue.use(Router)

// 路由白名单
const whiteList = ['/', '/login']

const router = new Router({
  mode: 'hash',
  routes: staticRouter
})

// 路由开始钩子
router.beforeEach(async (to, from, next) => {
  if (getCookie('token')) {
    if (to.path === '/login') {
      next({ path: '/design' })
    } else {
      /**
       * 登录权限
       * **/
      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   await store.dispatch('user/getUserInfo').then(async (res) => { // 拉取user_info
      //     const roles = res.roles // note: roles must be a array! such as: ['editor','develop']
      //     await store.dispatch('app/generateRoutes', roles).then((asyncRoutes) => { // 根据roles权限生成可访问的路由表
      //       router.addRoutes(asyncRoutes) // 动态添加可访问路由表
      //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //     })
      //   }).catch((err) => {
      //     switch (err.code) {
      //       // 用户不存在时API报的code
      //       case 500:
      //       case 401:
      //         store.dispatch('user/fedLogOut').then(() => {
      //           next({ path: '/login' })
      //         })
      //         break
      //       default:
      //         // 接口报错时是否要退出
      //         console.log(err)
      //         next()
      //     }
      //   })
      // } else {
      //   next()
      // }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`) // 否则全部重定向到登录页
    }
  }
})

// 路由结束钩子
router.afterEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // finish progress bar
  NProgress.done()
})

export default router
