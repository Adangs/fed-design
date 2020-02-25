import fetch from '~/utils/x-fetch'
import { setCookie, getCookie } from '~/utils/index'

export default {
  namespaced: true,
  state: {
    token: null,
    roles: []
  },
  mutations: {
    SET_TOKEN: (state, data) => {
      state.token = data
    },
    SET_ROLES: (state, data) => {
      state.roles = data
    }
  },
  actions: {
    // 全局请求状态
    login ({ commit, state }, data) {
      return fetch({ url: 'login', data }).then(res => {
        setCookie('token', res.token)
        commit('SET_TOKEN', res.token)
        return Promise.resolve(res)
      }).catch(err => {
        return Promise.reject(err)
      })
    },

    // 获取用户信息
    getUserInfo ({ commit }) {
      return fetch({ url: 'getUserInfo' }).then(res => {
        commit('SET_ROLES', res.roles || [])
        commit('SET_TOKEN', getCookie('token'))
        return Promise.resolve(res)
      }).catch(err => {
        return Promise.reject(err)
      })
    }
  }
}
