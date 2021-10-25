function debounce (fn, delay, immediate) {
  let timer = null
  // return function (...args) {
  //   timer && clearTimeout(timer)
  //   timer = setTimeout(() => {
  //     fn(...args)
  //   }, delay)
  // }
  return function (...args) {
    let context = this
    if (immediate) {
      fn.call(context, ...args)
      immediate = false
    }
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.call(context, ...args)
    }, delay)
  }
}

function throttle (fn, delay, immediate) {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) return
    timer = setTimeout(function () {
      fn.call(context, ...args)
      timer = null
    }, delay)
  }
}

function fn (e) {
  console.log('resize', e)
}

// window.addEventListener('resize', debounce(fn, 1000))
window.addEventListener('resize', throttle(fn, 1000))