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