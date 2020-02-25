import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import { Button, Input, ColorPicker, Divider, Slider, Upload, Select, Option, Form, FormItem, Tooltip, Popover, Dialog, Dropdown, DropdownMenu, DropdownItem, Progress, Message } from 'element-ui'
// bus
import bus from './utils/x-bus'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less' // global css

// global request
import http from './utils/x-request'

import * as filters from './utils/x-filters' // global request
// ui
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Slider)
Vue.use(Upload)
Vue.use(ColorPicker)
Vue.use(Divider)
Vue.use(Progress)
Vue.prototype.$message = Message
// vue bus
Vue.use(bus)
// request
Vue.use(http)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局滚动事件
Vue.directive('xscroll', {
  bind (el, binding) {
    const container = el.attributes['x-scroll-container']
    const selectWrap = container ? el.querySelector(container.nodeValue) : el
    selectWrap.addEventListener('scroll', function () {
      const sign = el.attributes['xscroll-threshold'] ? el.attributes['xscroll-threshold'].nodeValue : 10
      const scrollDistance = this.scrollHeight - this.scrollTop - this.clientHeight
      if (scrollDistance <= sign) {
        // console.log('滚动到底了')
        binding.value({ type: 'bottom', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      } else if (this.scrollTop <= 0) {
        // console.log('滚动到顶了')
        binding.value({ type: 'top', scrollTop: this.scrollTop, scrollHeight: this.scrollHeight, clientHeight: this.clientHeight })
      }
    })
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
