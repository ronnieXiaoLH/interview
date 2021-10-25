function debounce (fn, delay, immediate) {
  let timer
  return function (...args) {
    let _this = this
    if (immediate) {
      fn.call(_this, ...args)
      immediate = false
    }
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.call(_this, ...args)
    }, delay)
  }
}

// function throttle (fn, delay, immediate) {
//   let timer
//   return function (...args) {
//     let _this = this
//     if (immediate) {
//       fn.call(_this, ...args)
//       immediate = false
//     }
//     if (timer) return
//     timer = setTimeout(function () {
//       fn.call(_this, ...args)
//       timer = null
//     }, delay)
//   }
// }

function throttle (fn, delay) {
  let now = 0
  return function (...args) {
    if (Date.now() - now > delay) {
      fn(...args)
      now = Date.now()
    }
  }
}