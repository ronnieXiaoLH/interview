/**
 * 生成器对象是由一个 GeneratorFunction 返回的，并且它符合迭代器协议和可迭代协议
 * 普通函数 VS 生成器函数:
 *   1. 普通函数是 Function 的实例，普通函数实例.__proto__ === Function.prototype
 *    生成器函数是 GeneratorFunction 的实例，生成器函数实例.__proto__ === GeneratorFunction.prototype，GeneratorFunction.prototype.__proto__ === Function.prototype
 *   2. 生成器函数 [[IsGenerator]]: true
 */

// function func () {

// }

/* function* func () {}
// 生成器函数的实例不是通过 new 而是执行生成器函数，此时生成器函数的函数体并未执行
let itor = func()
console.log(Object.prototype.toString.call(func)) // [object GeneratorFunction]
console.log(Object.prototype.toString.call(itor)) // [object Generator] */


/**
 * 生成器函数的实例是一个 Generator 对象，符合迭代器协议和可迭代协议
 * 生成器函数的实例执行 next 方法，遇到 yield 或 return 结束，返回一个包含 value 和 done 属性的对象
 * value 的值是 yield 或 return 的值，如果是 yield ，done 的值就是 false，如果是 return ，done 的值就是 true；如果没有 yield 和 return done 的值是 true ，且 value 的值是 undefined 
 */

/* function* func () {
  console.log('1')
  yield 111
  console.log('2')
  yield 222
  console.log('3')
  yield 333
  console.log('4')
  return 444
  console.log('5')
  yield 555
}

let itor = func()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
 */

/**
 * async/await VS promise:
 *    async/await 是基于 Generator 管理异步编程
 *    promise 是基于一种约定模式管理异步编程
 */


/**
 * yield 既然作为执行的断点，那它应该也是有返回值的，那 yiled 的返回值是什么呢？
 * yield 的返回值是由 next 传递的，下一次的 next 执行给 yiled 传值
 * next 传值：下一次 next 传值给上一次 yield 执行的返回值(第一个next不给任何人传值)
 */

/* function* func () {
  let res = yield 'a'
  console.log(res)
  let res2 = yield 'b'
  console.log(res2)
}

let itor = func()
console.log(itor.next())
console.log(itor.next(10))
console.log(itor.next(20)) */

// 生成器函数如果有 return 语句，return 语句后面的 yiled 还是能执行，其他的代码不会执行
/* function * gen () {
  console.log('1')
  const res = yield 'a'
  console.log('2', res)
  const res2 = yield 'b'
  console.log('3', res2)
  return 'c'
  console.log('4') // 不会执行
  const res4 = yield 'd' // 会执行
  console.log('5', res4) // 不会执行
  const res5 = yield 'e' // 会执行
  console.log('6', res5) // 不会执行
}

let handler = gen()
console.log(handler.next(100))
console.log(handler.next(200))
console.log(handler.next(300))
console.log(handler.next(400))
console.log(handler.next(500))
console.log(handler.next(600)) */

/**
 * yield* 生成器嵌套生成器
 */

/* function* func1 () {
  yield 1
  yield 2
}

function* func2 () {
  yield 3
  yield* func1()
  yield 4
}

let itor = func2()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next()) */

const query = x => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(++x)
    }, 1000)
  })
}

function* func (n) {
  const res = yield query(n)
  console.log('res', res)
  const res2 = yield query(res)
  console.log('res2', res2)
  const res3 = yield query(res2)
  console.log('res3', res3)
}

let itor = func(1)
// itor.next().value.then(res => {
//   itor.next(res).value.then(res => {
//     itor.next(res).value.then(res => {
//       itor.next(res)
//     })
//   })
// })

function runGenerators (handler) {
  function nextAction (val) {
    let { value, done } = handler.next(val)
    if (done) return value
    value.then(res => nextAction(res))
  }
  return nextAction()
}

runGenerators(itor)