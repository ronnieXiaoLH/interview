// 首先我们要清楚 call 方法执行时，内部做了什么
// 1. 将函数的 this 指向 call 方法的第一个参数
// 2. 将 call 方法除第一个参数外的其他参数作为实参传递给 fn
// 3. 立即执行函数

Function.prototype._call = function (context, ...args) {
  // this -> fn , context -> obj , args -> [1, 2]
  context = context == null ? window : context
  // 这里需要注意的是，我们借用给对象添加属性的方式来实现，对于基础数据类型是不能加属性的
  if (!(typeof context === 'object' || typeof context === 'function')) {
    context = Object(context)
  }
  let key = Symbol('key')
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}

let obj = {a:1}

function fn (a, b) {
  console.log(this)
  return a + b
}

let res = fn.call(obj, 1, 2)
console.log(res, obj)

let res2 = fn._call(obj, 1, 2)
console.log(res2, obj)

Function.prototype._apply = function (context, args) {
  // this -> fn , context -> obj , args -> [1, 2]
  let key = Symbol('key')
  context[key] = this
  const result = context[key](args)
  delete context[key]
  return result
}

let res3 = fn._apply(obj, [1, 2])
console.log(res2, obj)


// 首先我们要清楚 bind 方法执行时，内部发生了什么
// 1. 返回一个新的函数
// 2. 返回的函数的 this 指向 bind 函数的第一个参数
// 3. 将 bind 函数的其他参数作为实参传递给这个返回的新的函数

Function.prototype._bind = function (context, ...args) {
  let fn = this
  return function () {
    let result = fn.call(context, ...args)
    return result
  }
}

let res4 = fn.bind(obj, 1, 2)
console.log(res4, res4())

let res5 = fn._bind(obj, 1, 2)
console.log(res5, res5())