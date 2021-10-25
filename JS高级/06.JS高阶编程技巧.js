/**
 * JS高阶编程技巧：利用闭包的机制，实现出来的一些高阶编程技巧
 *  + 模块化思想
 *  + 惰性函数
 *  + 科里化函数
 *    1. 高阶组件 -> React
 *    2. 防抖、节流
 *    3. bind
 *    4. ...
 *  + compose组合函数
 *  + ...
 */

// 模块化思想 单例 -> AMD(require.js) -> CMD(sea.js) -> CommonJS(Node) -> ESModule

// 对象的特点：每一个对象都是一个单独的堆内存空间(单独的实例 -> Object)，这样即使多个对象中的成员名字相同，也互不影响
// 每一个对象都是一个单独的实例，用来管理自己的私有信息，即使名字相同，也互不影响，其实这就是 “JS中的单例设计模式”

// ------------------- 高级单例模式：闭包 + 单例的结合，样式最早期的JS模块化思想
/* var moduleA = (function () {
  var time = Date.now()
  function queryData() {}
  return {
    time,
    queryData
  }
})() */

/* function getCss (el, attr) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el)[attr]
  }
  return el.currentStyle(attr)
} */

// ------ 优化思想：第一次执行 getCss 方法时，已经知道是否兼容了，再次执行的 getCss 方法，不想再处理判断兼容的逻辑了，这种思想就是“惰性思想”
/* function getCss (el, attr) {
  if (window.getComputedStyle) {
    getCss = function getCss (el, attr) {
      return window.getComputedStyle(el)[attr]
    }
  } else {
    getCss = function getCss (el, attr) {
      return el.currentStyle(attr)
    }
  }
  return getCss(el, attr)
}
const body = document.body
console.log(getCss(body, 'height'))
console.log(getCss(body, 'width'))
console.log(getCss(body, 'margin')) */

// 函数科里化：
/* function curring (x) {
  return function (...args) {
    return args.reduce((prev, next) => prev + next, x)
  }
}

console.log(curring(10)(20))
console.log(curring(10)(20, 30)) */

// compose组合函数
/* const add = x => x + 1
const multi = x => x * 3
const divide = x => x / 2
function compose (...funcs) {
  return function (x) {
    if (funcs.length === 0) return x
    return funcs.reduceRight((prev, next) => {
      if (typeof next !== 'function') return prev
      return next(prev)
    }, x)
  }
}
const operate = compose(divide, multi, add)
console.log(operate(0))
 */

function add (...params) {
  const proxy = (...args) => {
    params = params.concat(args)
    return proxy
  }
  proxy.toString = () => params.reduce((prev, next) => prev + next)
  return proxy
}

console.log(add(1)(2)(3))
console.log(add(1, 2, 3)(4))
console.log(add(1)(2)(3)(4, 5))