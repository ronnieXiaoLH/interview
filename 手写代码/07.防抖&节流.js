/**
 * 防抖：如果短时间了多次触发，在最后一次触发 delay 多长时间后执行一次
 * @param {Function} fn 需要进行防抖处理的函数
 * @param {Number} delay 延迟时间
 */
// function debounce (fn, delay) {
//   if (typeof fn !== 'function') {
//     throw Error('请传入一个函数')
//   }

//   let timer
//   return function (...args) {
//     let _this = this
//     // 核心思路：如果定时器已存在旧把它清掉
//     timer && clearTimeout(timer)
//     timer = setTimeout(() => {
//       fn.apply(_this, args)
//     }, delay)
//   }
// }

function debounce (fn, delay, immediate) {
  if (typeof fn !== 'function') {
    throw Error('请传入一个函数')
  }

  let timer
  return function (...args) {
    let _this = this
    if (immediate) {
      fn.apply(_this, args)
      immediate = false
    }
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, delay)
  }
}

/**
 * 节流：如果短时间内多次触发，以一个固定的频率执行
 * @param {*} fn 需要进行节流处理的函数
 * @param {*} delay 延迟时间
 */
// function throttle (fn, delay) {
//   if (typeof fn !== 'function') {
//     throw Error('请传入一个函数')
//   }

//   let timer
//   return function (...args) {
//     let _this = this
//     // 核心思路：如果定时器已存在，就 return ，在执行完一次定时任务，把定时任务清空，进入下一次
//     if (timer) return
//     timer = setTimeout(() => {
//       fn.apply(_this, args)
//       timer = null
//     }, delay)
//   }
// }

// function throttle (fn, delay, immediate) {
//   if (typeof fn !== 'function') {
//     throw Error('请传入一个函数')
//   }

//   let timer
//   return function (...args) {
//     let _this = this
//     if (immediate) {
//       fn.apply(_this, args)
//       immediate = false
//     }
//     if (timer) return
//     timer = setTimeout(() => {
//       fn.apply(_this, args)
//       timer = null
//     }, delay)
//   }
// }

// 节流：时间戳写法
function throttle (fn, delay) {
  let last = 0
  return function (...args) {
    let _this = this
    let now = Date.now()
    if (now - last > delay) {
      fn.apply(this, args)
      last = now
    }
  }
}