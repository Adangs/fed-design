import { updateByPath } from '@/utils'
import { v4 as uuidv4 } from 'uuid'

export default {
  namespaced: true,
  state: {
    // 画布数据
    layouts: {
      scale: 1, // 缩放比
      width: 960,
      height: 540,
      // 背景
      background: {
        id: uuidv4(),
        type: 'background',
        color: '#F8F8F8',
        image: null
      },
      // 主要元素标签
      elements: []
    },
    // 当前选中模块
    current: null,
    currentIndex: null,
    // 当前选中文本编辑器
    currentEditor: null,
    // 批量预览列表
    batchPreview: null
  },
  mutations: {
    SET_LAYOUTS: (state, data) => {
      state.layouts = data
    },
    SET_DATA: (state, req) => {
      for (const key in req) {
        updateByPath(state.layouts, key, req[key])
      }
    },
    // 数据单独更新，使用updateByPath视图更新会有问题
    SET_ELEMENT: (state, data) => {
      if (data.type === 'delete') {
        // 删除
        state.layouts.elements.splice(data.index, 1)
      } else if (data.type === 'push') {
        // 新增
        state.layouts.elements.push(data.value)
      } else {
        // 更新
        state.layouts.elements.splice(data.index, 1, data.value)
      }
    },
    SET_CURRENT: (state, data) => {
      state.current = data
    },
    SET_CURRENT_INDEX: (state, data) => {
      state.currentIndex = data
    },
    SET_CURRENT_EDITOR: (state, data) => {
      state.currentEditor = data
    },
    SET_BATCH_PREVIEW: (state, data) => {
      state.batchPreview = data
    }
  },
  actions: {
    // 设置layout
    setLayouts ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LAYOUTS', data)
        resolve()
      })
    },
    // 设置layout
    resetLayouts ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_LAYOUTS', {
          scale: 1, // 缩放比
          width: 960,
          height: 540,
          // 背景
          background: {
            id: uuidv4(),
            type: 'background',
            color: '#F8F8F8',
            image: null
          },
          // 主要元素标签
          elements: []
        })
        resolve()
      })
    },
    // 更新数据
    setData ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_DATA', data)
        resolve()
      })
    },
    // 设置图层数据
    setElement ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_ELEMENT', data)
        resolve({
          length: state.layouts.elements.length
        })
      })
    },
    // 设置当前选中模块
    setCurrent ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT', data)
        resolve()
      })
    },
    // 设置当前选中模块
    setCurrentIndex ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_INDEX', data)
        resolve()
      })
    },
    // 设置当前激活文本编辑器
    setCurrentEditor ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_CURRENT_EDITOR', data)
        resolve()
      })
    },
    // 设置批量列表
    setBatchPreview ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_BATCH_PREVIEW', data)
        resolve()
      })
    }
  }
}
