/**
 * JS中的异步编程：
 *    + 定时器
 *    + ajax(HTTP网络请求)
 *    + Promise
 *    + async/await(generator)
 *    + 事件绑定
 *    + requestAnimationFrame
 *    + ...
 * 
 * JS是单线程的，不能同时处理多个事情
 *    1. JS中大部分代码都是同步线程
 *    2. 但是可以基于单线程的 EventLoop(事件循环机制) 实现异步效果
 * 
 * 浏览器是多线程的，打开一个页面，浏览器会分配很多线程，同时处理
 *    + GUI渲染线程：自上而下渲染页面
 *    + JS引擎(渲染)线程：JS单线程是因为浏览器只会开辟这一个线程用来执行JS代码
 *    + HTTP网络请求线程：加载资源文件和数据
 *    + 定时器监听线程：监听定时器是否到达时间
 *    + DOM事件监听线程：监听 DOM 事件的触发
 */

/**
 * 定时任务放置完成，浏览器会开辟一个定时器监听线程，此时定时器已经开始计时了
 * 定时器计时时间已经到了，但是同步任务没有执行完，仍然需先等同步任务执行完
 * 因此使用 requestAnimationFrame 来做动画，因为定时器不靠谱
 */
/* setTimeout(() => {
  console.log(1)
}, 20)
console.log(2)
setTimeout(() => {
  console.log(3)
}, 10)
console.log(4)
console.time()
for (let i = 0; i < 90000000; i++) {
  // TODO
}
console.timeEnd()
console.log(5)
setTimeout(() => {
  console.log(6)
}, 8)
console.log(7)
setTimeout(() => {
  console.log(8)
}, 15)
console.log(9) */
// 2 4 5 7 9 6 3 8 1

/* setTimeout(() => {
  console.log(1)
}, 0)
console.log(2)
while (1) {
  // TODO
}
console.log(3)
setTimeout(() => {
  console.log(4)
}, 10)
console.log(5) */
// 2

// 只要 .then 就是一个 微任务
setTimeout(() => {
  console.log(0)
}, 0)
new Promise((resolve, reject) => {
  console.log(1)
  resolve()
}).then(() => {
  console.log(2)
  new Promise((resolve, reject) => {
    console.log(3)
    resolve()
  }).then(() => {
    console.log(4)
  }).then(() => {
    console.log(5)
  })
}).then(() => {
  console.log(6)
})

new Promise((resolve, reject) => {
  console.log(7)
  resolve()
}).then(() => {
  console.log(8)
})
// 1 7 2 3 8 4 6 5 0