import axios from 'axios'
import store from '~/store'
import API from '~/api/index'
import { Message } from 'element-ui'
/**
 *
 调用request方法
 调用方式:
 方式一，只返回接口正确的状态数据，统一处理错误信息：
 const res = await this.$http({
   url: 'apiMapKey',
   data: {'test': 1}
 });
 console.log(res)
 方式二，单独处理错误情况：
 this.$http({
   url: 'apiMapKey',
   data: {'test': 1}
 }).then(res => {
   console.log(res)
 }).catch(err => {
   console.log(err)
 });
 *
 */
const http = options => {
  options = {
    cancel: options.cancel === undefined ? true : options.cancel, // 重复请求拦截
    loading: options.loading === undefined ? true : options.loading, // 是否维护全局loading
    globalError: options.globalError === undefined ? true : options.globalError, // 统一进行错误处理
    timeout: options.timeout || 20000, // 超时
    url: API[options.url] || options.url,
    method: options.method || 'post', // 调整为默认post请求
    headers: options.headers || {},
    params: options.params || {}, // get 方式参数,
    data: options.data || {} // post daata
  }
  const CancelToken = axios.CancelToken
  // create an axios instance
  const service = axios.create({
    timeout: options.timeout // request timeout
  })
  // request interceptor
  service.interceptors.request.use(
    request => {
      // 请求取消机制
      if (options.cancel) {
        store.dispatch('app/removePending', {
          url: options.url,
          cancel: true
        })
        request.cancelToken = new CancelToken(cancel => {
          // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
          store.dispatch('app/pushPending', {
            url: options.url,
            cancel: cancel
          })
        })
      }
      // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      request.headers['token'] = 'token'
      // 是否维护全局请求状态
      if (options.loading) {
        store.dispatch('app/setLoading', true)
      }
      return request
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
  // response interceptor
  service.interceptors.response.use(
    // response => response,
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     **/
    response => {
      // 请求取消机制
      store.dispatch('app/removePending', {
        url: options.url
      })
      const res = response.data
      // 全局请求状态
      store.dispatch('app/setLoading', false)
      if (!res.success) {
        // 统一错误处理
        switch (res.code) {
          // 不进行统一处理错误提示信息的code
          case 10001:
            return Promise.reject(res)
          default:
            // API接口错误提示信息统一处理，前期把报错的API地址一同暴露给用户，便于开发人员排查问题
            console.warn('API地址：', response.config.url)
            console.warn('API结果：', res)
            // 更换成ui对象的提示方法
            Message.error(res.msg || '出错啦~')
            // alert()
        }
        return Promise.reject(res)
      } else {
        // 成功
        return Promise.resolve(res.body || {})
      }
    },
    err => {
      // 全局请求状态
      store.dispatch('app/setLoading', false)
      console.log('request---> ', err.request) // for debug
      console.log('response---> ', err.response) // for debug

      if (err.request || err.response) {
        // 401
        if (err.response && err.response.status === 401) {
          // 没有请求接口权限处理
          // router.push({ path: '/login' })
          // 更换成ui对象的提示方法
          Message.error('登录状态失效，请重新登录')
          // alert(JSON.stringify({
          //   content: '登录状态失效，请重新登录',
          //   duration: 5
          // }))
          return Promise.reject(err)
        } else {
          let msg = [err.message]
          if (err.response && err.response.data) {
            // API response 返回非200情况下的处理逻辑
            msg = [err.response.data.message, err.response.data.path]
          } else if (err.request && err.request.timeout) {
            msg = ['网络繁忙，请稍后再试！']
          }
          // 更换成ui对象的提示方法
          Message.error(msg.join(' - '))
          // alert(JSON.stringify({
          //   content: msg.join(' - '),
          //   duration: 5
          // }))
          return Promise.reject(err)
        }
      } else {
        // 如cancel等特殊情况走这边
        console.log('err---> ', err)
        return Promise.reject(err)
      }
    }
  )
  return service(options)
}

export default http
