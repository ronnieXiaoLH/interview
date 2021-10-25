/**
 * async：修饰函数，最后默认返回一个 promise 实例。
 *  1. 函数执行报错，promise 实例的状态是 rejected，值是报错的原因
 *  2. 函数执行未报错，promise 实例的状态是 fulfilled，值是函数的返回值
 */

/* async function fn() {
  // return 10
  console.log(a.b)
}
console.log(fn()) */

/* async function fn() {
  const res = await 10 // 等价于 await Promise.resolve(10)
  console.log(1)
  return res
}
const res = fn()
console.log(res)
 */

/* function computed() {
  console.log(1)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
}
console.log(3)
async function fn() {
  console.log(4)
  let result = await computed()
  console.log(result)
  console.log(5)
}
fn()
console.log(6)
// 3 4 1 6 2 5 */

// async await 错误处理
async function fn() {
  try {
    const result = await Promise.reject('err')
    return result
  } catch (error) {
    console.log(error)
  }
}
fn()