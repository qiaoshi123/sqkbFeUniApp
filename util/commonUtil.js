/**js通用工具库*/

/**
 * 不足10补0
 */
const addZero = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 将{key:value}转换成 querystring
 * @param [param 对象]
 */
const queryToString = (param = {}) => {
  var paramStr = ''
  for (var key in param) {
    paramStr += `${key}=${param[key]}&`
  }
  if (paramStr) {
    paramStr = paramStr.replace(/\&$/, '')
    return `?${paramStr}`
  } else {
    return ''
  }
}
/**
 * ?参数转为object
 */
const stringToQuery = (str = '') => {
  var obj = {}
  var reg = /([^?=&]+)=([^?=&]+)/g
  str.replace(reg, function() {
    obj[arguments[1]] = arguments[2]
  })
  return obj
}
/**
 * 时间格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
const formatDate = (date, fmt) => {
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  let week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[date.getDay() + ""])
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt;
}
/**
 * 数字格式化
 */
const formatNumber = (num) => {
  let item = null;
  if (num < 10000) {
    item = num + '';
  } else {
    debugger
    item = (num / 10000) + '';
    let ary = item.split('.');
    if (ary[1][0] == '0') {
      item = ary[0] + '万'
    } else {
      item = ary[0] + '.' + ary[1][0] + '万'
    }
  }
  return item;
}

/**
 * 将wx上的所有方法，生成pomise调用方式。
 */
const wxPromisifyAll = (wx) => {
  for (let key in wx) {
    if (wx.hasOwnProperty(key) && typeof wx[key] == 'function') {
      wx[key + 'Sqkb'] = wxPromisify(wx[key])
    }
  }
}
/**
 * 将wx的某个方法，转换为promise方法。
 */
const wxPromisify = (fn) => {
  return function(obj = {}) {
    let promise = new Promise(function(resolve, reject) {
      obj.success = resolve;
      obj.fail = reject;
      fn(obj)
    })
    return promise;
  }
}
module.exports = {
  addZero,
  queryToString,
  stringToQuery,
  formatDate,
  formatNumber,
  wxPromisify,
  wxPromisifyAll
}