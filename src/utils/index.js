import Cookies from 'js-cookie'

// 设置cookie
export function setCookie (name, value) {
  return Cookies.set(name, value)
}
// 设置cookie
export function getCookie (name) {
  return 'token'
  // return Cookies.get(name)
}
// 删除cookie
export function removeCookie (name) {
  return Cookies.remove(name)
}

/**
 * 按字符串获取对象内的对应的值
 * getObjectValue({}, 'a.b[0].c')
 * **/
export const getObjectValue = function (object, prop) {
  const arr = prop.replace(/]/g, '').replace(/\[/g, '.').split('.')
  const len = arr.length
  let current = object
  for (let i = 0; i < len; i++) {
    // 防止空数据处理
    if (current[arr[i]] === undefined) {
      return undefined
    }
    current = current[arr[i]]
  }
  return current
}

/**
 * 按字符串获取对象内的对应的值
 * getObjectValue({}, 'a.b[0].c')
 * **/
export const updateByPath = function (origin, path, value) {
  const arr = path.replace(/]/g, '').replace(/\[/g, '.').split('.')
  let current = origin
  for (let i = 0, len = arr.length; i < len; i++) {
    if (i === len - 1) {
      current[arr[i]] = value
    } else {
      current = current[arr[i]]
    }
  }
}
