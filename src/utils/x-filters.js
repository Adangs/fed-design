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
