/**
 * 错误类型：
 *  + 语法错误：代码中存在拼写错误，将导致程序完全或部分不能运行
 *  + 逻辑错误：代码语法正确，但执行结果不匹配预期
 */

/**
 * 错误对象：
 *  + Error: 通用的 Error
 *  + EvalError: eval 的错误
 *  + InternalError: 引擎内部错误
 *  + RangeError: 数值变量或参数超出其有效范围
 *  + ReferenceError: 无效引用
 *  + SyntaxError: 语法错误
 *  + TypeError: 变量或参数不属于有效类型
 *  + URIError: URI编码/解码错误
 *  + AggregateError: 包含多个错误的错误
 */

/**
 * Error：
 *  + 基础的错误对象，其他错误对象均继承自它
 *  + name: 错误名。用于识别错误类别
 *  + message: 错误文本信息
 *  + stack: 错误堆栈信息
 */

/**
 * InternalError:
 *  + 高级编程的红皮书和 MDN 都有提到这个对象，可惜的是只有 firefox 支持
 *  + 产生：过多的 case 语句、正则表达式中括号过多、递归过深等
 */

/**
 * RangeError:
 *  + 当一个值不在其所允许的范围或者集合中
 *  + 当传递一个不合法的 length 值作为 Array 构造器的参数创建数组
 *  + 传递错误值到数值计算方法(Number.toExponential(),Number.toFixed(),Number.toPrecision())
 */
/* try {
  // new Array(Number.MAX_VALUE) // RangeError: Invalid array length
  // const n = 12
  // n.toFixed(101) // RangeError: toFixed() digits argument must be between 0 and 100
  'abc'.repeat(-1) // RangeError: Invalid count value
} catch (error) {
  console.log(error)
} */

/**
 * ReferenceError:
 *  + 当一个不存在的变量被引用时发生的错误
 */
/* function foo() {
  'use strict'
  bar = true
}
foo() // ReferenceError: bar is not defined

foo = 10 // ReferenceError: Cannot access 'foo' before initialization
let foo */

/**
 * SyntaxError:
 *  + 解析语法上不合法的代码的错误
 *  + 不能被用户代码 catch 的 SyntaxError
 *  + 可以被用户代码捕获的
 */

/**
 * TypeError:
 *  + 值的类型非预期类型时发生的错误
 */
/* // undefined.a ypeError: Cannot read property 'a' of undefined
// new 1() // TypeError: 1 is not a constructor
// Object.defineProperty({}, 'key', null) // TypeError: Property description must be an object: null
// 'hello' in 'hello world' // TypeError: Cannot use 'in' operator to search for 'hello' in hello world
const A = 10
A = 20 // TypeError: Assignment to constant variable. */

/**
 * URIError:
 *  + URI 处理函数而产生
 *  + 不是 encodeURI, encodeURIComponent, decodeURI, decodeURIComponent 方法产生的错误都是 URIError
 */
// encodeURI('\uD800') // URIError: URI malformed
// encodeURIComponent('\uD800') // URIError: URI malformed
// decodeURIComponent('%') // URIError: URI malformed
// decodeURIComponent('\ud*00') // SyntaxError: Invalid Unicode escape sequence

/**
 * AggregateError:
 *  + 包含多个错误信息的错误
 */
Promise.any([
  Promise.reject(new Error('error1')),
  Promise.reject(new Error('error2')),
]).catch((e) => {
  console.log('e instanceof AggregateError', e instanceof AggregateError) // true
  console.log('e.errors', e.errors)
})
