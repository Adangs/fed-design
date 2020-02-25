// set function parseTime,formatTime to filter
export function formatDate (input, b = 'yyyy-MM-dd hh:mm:ss') {
  if (!input) return '-'
  const date = new Date(Number(input) || (input.indexOf('T') !== -1 ? input : input.replace(/-/gi, '/')))
  const c = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  if (/(y+)/.test(b)) {
    b = b.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const a in c) {
    if (new RegExp('(' + a + ')').test(b)) {
      b = b.replace(RegExp.$1, RegExp.$1.length === 1 ? c[a] : ('00' + c[a]).substr(('' + c[a]).length))
    }
  }
  return b
}

/**
 * 数据格式化保留小数点   ==>  12,345.12 || 12345.12
 * **/
export function formatNumber (value = 0, precision = 2, type = false) {
  const multiple = Math.pow(10, precision)
  if (type) {
    return Math.round(value * multiple) / multiple
  } else {
    return (Math.round(value * multiple) / multiple).toLocaleString()
  }
}

/**
 * 小数点后补多位0   ==>  12.00000000 || 12.12340000
 * */
export function formatZero (number = 0, n = 2) {
  if (n <= 0) {
    return Math.round(number)
  }
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n) // 四舍五入
  number = Number(number).toFixed(n) // 补足位数
  return number
}
