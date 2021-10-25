
/**
 * 支持取消定时
 * @param {*} cb 
 * @param {*} delay 
 * @returns 
 */
/* function mySetInterval (cb, delay) {
  let timer
  function proxy() {
    cb()
    timer = setTimeout(proxy, delay)
  }
  setTimeout(proxy, delay)
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
} */

/**
 * 可以控制执行次数
 * @param {*} fn 
 * @param {*} delay 
 * @param {*} n 
 */
function mySetInterval (fn, delay, n) {
  let timer
  let count = 0
  function proxy (params) {
    if (count !== n) {
      count++
      fn()
      timer = setTimeout(proxy, delay)
    } else {
      clearTimeout(timer)
    }
  }
  setTimeout(proxy, delay)
}

let a = 1

function fn () {
  console.log(a++)
}

// mySetInterval(fn, 1000, 5)

// setInterval 模拟 setTimeout
/* function mySetTimeout (fn, delay) {
  let timer
  timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, delay)
}

mySetTimeout(fn, 1000) */

// setInterval(() => {
//   if (a < 5) {
//     console.log(a++)
//   }
// }, 1000)

/**
 * setInterval 的缺点：
 *  + 与 setTimeout 不同的是，setTimeout 是立即 push 到任务队列中，setInterval 是到时间间隔了才把它推进队列，所以真正何时执行取决于何时被主线程的事件循环取到
 *  + setInterval 将回调任务加入到队列前，会先看任务队列中是否有 setInterval 的回调任务，如果没有就加入任务队列
 */

/**
 * 所以 setInterval 会导致这些问题：
 *  1. 某些间隔可能会被跳过
 *  2. 执行的时间间隔越来越大，越来越不准
 */

/**
 * setTimeout 的嵌套层数大于等于 5 层后，执行的间隔最少为 4ms
 */
