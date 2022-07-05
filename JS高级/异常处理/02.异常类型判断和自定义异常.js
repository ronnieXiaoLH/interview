/**
 * catch 的一定是 Error 吗？
 *  在 JavaScript 中，throw 关键字可以将错误抛出，但是 throw 不仅仅只能抛出错误对象，还可以抛出基本类型数据
 */
/* try {
  throw '错误字符串'
} catch (error) {
  console.log(error) // '错误字符串'
}

try {
  throw 123
} catch (error) {
  console.log(error) // 123
} */

/**
 * 捕获到错误的思考：
 *  + 是否致命，会不会导致连带错误
 *  + 是否会影响用户操作
 *  + 是否需要将错误信息反馈给用户
 *  + 是否将错误上报
 *  + 是否需要抛出错误
 */

// 自定义异常
// es6实现
/* class CustomError extends Error {
  constructor(foo = 'bar', ...params) {
    super(...params)

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, CustomError)
    // }

    this.name = 'CustomError'
    this.foo = foo
    this.date = new Date()
  }
}

function trace() {
  try {
    throw new CustomError('baz', 'bazMessage')
  } catch (error) {
    console.log(error instanceof CustomError)
    console.log(error.message)
    console.log(error.name)
    console.log(error.foo)
    console.log(error.date)
    console.log(error)
  }
} */

// es5实现
/* function MyError(message) {
  this.name = 'MyError'
  this.message = message || 'Default Message'
  Error.captureStackTrace(this, MyError)
}

MyError.prototype = Object.create(Error.prototype)
MyError.prototype.constructor = MyError

function trace() {
  try {
    throw new MyError('bazMessage')
  } catch (error) {
    console.log(error instanceof MyError)
    console.log(error.message)
    console.log(error.name)
    console.log(error.foo)
    console.log(error.date)
    console.log(error)
  }
} */

/* function b() {
  trace()
}
function a() {
  b()
}
a() */

/**
 * 异常类型判断：
 *  + instanceof(AggregateError 不能使用 instanceof 来判断)
 *  + constructor
 *  + Error.prototype.name
 */
