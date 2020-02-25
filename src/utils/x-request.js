import fetch from './x-fetch'

export default {
  install (Vue) {
    Vue.prototype.$http = fetch
  }
}
