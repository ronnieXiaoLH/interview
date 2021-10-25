/**
 * new Promise 的时候必须传递一个可执行函数 [executor]
 *    + 会立即执行 executor
 *        1. executor 函数中一般管控一些异步操作
 *        2. executor 函数接收两个参数(resolve, reject)，两个参数都是函数
 *        3. executor 函数在状态改变(resolve, reject)之前报错，状态会变成 rejected，状态改变之后报错无影响
 *    + 创造一个 Promise 类的实例
 *        1. 实例的状态 [[PromiseState]] : pending / fulfilled / rejected
 *        2. 实例的结果 [[PromiseResult]]
 */

/**
 * resolve() 改变 [[PromiseState]] 为 fulfilled
 * rejected() 改变 [[PromiseState]] 为 rejected
 * 一旦 [[PromiseState]] 由 pending 改变为 fulfilled 或 rejected 便不会再发生改变
 * 如果 executor 中的代码执行报错，[[PromiseState]] 会变为 rejected，[[PromiseResult]] 的值是报错的原因(报错的位置在resolve或reject之前)
 * resolve 和 reject 执行时，改变 [[PromiseState]] 与 [[PromiseResult]] 是立刻执行的，通过 .then 和 .catch 注入的回调是异步执行的
 */

/* let p1 = new Promise((resolve, reject) => {
  console.log(a.b)
  // throw new Error('err')
})
p1.then(res => {

}, err => {
  console.log(err)
})
p1.catch(err => { console.log(err) }) */

/* let p2 = new Promise((resolve, reject) => {
  console.log(1)
  resolve('ok')
  console.log(2)
})
p2.then(res => {
  console.log(res)
})
console.log(3) */
// 1 2 3 ok

/**
 * 执行 .then 方法返回一个新的 Promise 实例
 * Promise 实例的值和状态分析：
 *    1. new Promise 出来的实例：resolve/reject 执行，或者 executor 执行报错控制
 *    2. promise 实例 .then 返回的：只要 .then 或 .catch 回调不报错，Promise 实例的状态都是 fulfilled，如果 .then 或 .catch 回调 return 返回的值不是新的 promise，则 Promise 实例的值就是 .then 或 .catch 回调 return 返回的值；如果 .then 或 .catch 回调 return 返回的值是新的 promise，则 Promise 实例的值由新的 promise 控制
 */

/* let p1 = new Promise((resolve, reject) => {
  // resolve(1)
  reject({err: 'err'})
})
let p2 = p1.then(res => {
  console.log(res)
  return new Promise(resolve => resolve('ok'))
}).catch(err => {
  // return err
  return 'err'
})
console.log(p2) */

/**
 * 对于失败的 Promise 实例，如果没有编写错误的处理方法，浏览器控制台会抛出错误信息，但是不会阻碍其他代码的执行
 * 在 .then 的时候如果没有编写错误的处理方法，将会顺延至下一个 .then 方法
 */

/* Promise.reject('No')
  .then(res => {}) // 相当于 .then(res => {}, err => Promise.reject('err'))
  .then(null, err => {
    console.log(err)
  }) */

// 真实项目中，在多个 .then 链中，除最后一个外，只注册成功的回调，只在最后一个 .then 中注册失败的回调


/* let p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
let p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 2000)
})
let p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})
Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
}) */