import fetch from '~/utils/x-fetch'
import staticRoutes from '~/router/static'
import asyncRoutes from '~/router/async'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
function filterAsyncRoutes (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export default {
  namespaced: true,
  state: {
    loading: false,
    addRoutes: null,
    routes: null,
    pending: {}
  },
  mutations: {
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    PUSH_PENDING: (state, data) => {
      state.pending[data.url] = data
    },
    REMOVE_PENDING: (state, data) => {
      delete state.pending[data.url]
    },
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = staticRoutes.concat(routes)
    }
  },
  actions: {
    // 全局请求状态
    setLoading ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LOADING', data)
        resolve(state)
      })
    },
    // 全局拦截重复请求
    pushPending ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('PUSH_PENDING', data)
        resolve(state)
      })
    },
    // 全局拦截重复请求
    removePending ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        if (state.pending[data.url] && data.cancel) {
          state.pending[data.url].cancel() // 执行取消操作
        } else if (state.pending[data.url]) {
          commit('REMOVE_PENDING', data)
        }
        // console.log(Object.keys(state.pending))
        resolve(state)
      })
    },
    // vuex内调用api
    async getAPI ({ commit, state }, data) {
      await fetch({
        url: 'success'
      }).then(res => {
        console.log('in vuex... ', res)
      })
    },
    // 动态路由 便于以后扩展权限
    generateRoutes ({ commit }, roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }
  }
}
