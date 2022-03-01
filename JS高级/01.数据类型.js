console.log(typeof NaN) // number
console.log(typeof Infinity) // number

console.log(NaN === NaN) // false
console.log(Object.is(NaN, NaN)) // true

/**
 * 把其他数据类型转换为 number 类型：
 *  - 显式转换：Number() 、parseInt() 、parseFloat()
 *  - 隐式转换：数学运算(- / * / \)、基于 == 比较、isNaN()
 */

console.log(1 + '2') // '12'
console.log(1 - '2') // -1
console.log(1 * '2') // 2
console.log(1 / '2') // 0.5
console.log(+'2') // 2

/**
 * 把其他值转换为字符串：
 *  - 显示转换：.toString()
 *  - 隐式转换：value + ''
 */

/**
 * parseInt(string, redix)：解析一个字符串并返回指定基数的十进制整数， radix 是2-36之间的整数，表示被解析字符串的基数
 *  + redix 值为0 或 空，默认是 10 进制，如果为 1 ，结果为 NaN
 *  + string 参数不是一个字符串，则将其转换为字符串，如果以数字0开头认为是 8 进制，以0x开头认为是 16 进制
 */
let arr = [1, 2, 3]
console.log(arr.map(parseInt)) // => arr.map((item, index) => parseInt(item, index)) => parseInt(1,0) parseInt(2,1) parseInt(3,2)

/**
 * typeof null 为什么等于 object ?
 *
 *  在 javscript 的第一版本中，只有五种数据类型，在栈中占 32 位存储单元，又分为标记位和数据：
 *   + 000：表示 object
 *   + 001：表示 integer
 *   + 010：表示 double
 *   + 100：表示 string
 *   + 101：表示 boolean
 *
 *  null 的 32 位全都是 0
 */

/**
 * 使用 + 将数据装换为数字，需要注意的两个点：
 *  1. + 转换 BigInt 类型的数据会报错
 *  2. + 转换 Symbol 类型的数据也会报错
 */

/**
 * 使用位移运算符是需注意，如果是 Number.MAX_SAFE_INTERGER 会有问题
 */

/**
 * 宽松比较：
 *  - NaN: 和谁都不相等
 *  - BigInt, Symbol 首先会判断数据类型，数据类型不相等，一定不相等
 *  - null, undefined 只和 null 或 undefined 相等
 *  - 布尔值和其他类型的数据相等比较，布尔值会转换为数字比较
 *  - 数字类型和字符串类型相等比较，会转成数字比较
 *  - 对象类型和原始类型相等比较，对象会转成原始类型
 *  - 对象类型和对象类型相等比较，比较的是引用地址
 */

/**
 * 怎么样判断一个数据是不是 undefined ?
 *  - typeof
 *  - Object.prototype.toString.call()
 *  - void 0 （void 任何数字都是 undefined）
 * 注意：在 ie8 undefined 的值不一定是可靠的，它是可以被改写的
 */

// 判断 NaN

function isNaNVal(val) {
  return Object.is(val, NaN)
}

function isNaNVal(val) {
  return val !== val
}

function isNaNVal(val) {
  return typeof val === 'number' && isNaN(val)
}

// 综合垫片
function isNaNVal(val) {
  if (!('isNaN' in Number)) {
    Number.isNaN = function (val) {
      return typeof val === 'number' && isNaN(val)
    }
  }
}

/**
 * arr
 */
let arr = [NaN]
console.log(arr.includes(NaN)) // true
console.log(arr.indexOf(NaN)) // -1

/**
 * 二元操作符 + 规则：
 *  - 如果操作数是对象，则对象会转换为原始值
 *  - 如果其中一个操作数是字符串，另一个操作数也会转换成字符串，进行字符串拼接
 *  - 否则，两个操作数都将转换成数字或 NaN，进行加法操作
 */

/**
 * 对象转换为原始数据类型的值：
 *  - Symbol.ToPrimitive
 *  - Object.prototype.valueOf
 *  - Object.prototype.toString
 */

/**
 * [] 的原始值是什么呢？
 *  1. typeof [][Symbol.toPrimitive] // undefined
 *  2. [].valueOf() // []
 *  3. [].toString() // ''
 * 结论：[] 的原始值是 ''
 */

/**
 * {} 的原始值是什么呢？
 *  1. typeof {}[Symbol.toPrimitive] // undefined
 *  2. ({}).valueOf() // {}
 *  3. ({}).toString() // '[object Object]'
 * 结论：[] 的原始值是 '[object Object]'
 */

console.log({} + {}) // => '[object Object]' + '[object Object]' '[object Object][object Object]'
console.log({} + []) // 这里需要区分 node 和 浏览器环境，在 node 中，等价于 '[object Object]' + '' === '[object Object]'; 在浏览器中 {} 会被认为是语句，等价于 {}; + []，也就是等价于 + [] === 0
console.log([] + []) // => '' + '' === ''
console.log([] + {}) // => '' + '[object Object]' === '[object Object]'
