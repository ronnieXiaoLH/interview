// 数组长度
// const arr1 = [1]
// const arr2 = [1, ,]
// const arr3 = new Array('10')
// const arr4 = new Array(10)
// Array.from({ length: 4 }, (_, index) => {
//   console.log(eval(`arr${index + 1}.length`))
// })

/**
 * 数组空元素：
 *  + empty item: 数组的空位，指数组的某一位置没有任何值，简单来说，就是数组上没有对应的属性
 *  + 一般的遍历，自动跳过空位，比如 forEach, map 等
 *  + 基于值进行运算，空位的值作为 undefined：
 *    - 比如 index, findIndex, includes等，indexOf 除外
 *    - 被迭代的时候，参与 Object.entries，扩展运算符，for of 等
 *  + join 和 toString，空位视为空字符串
 */
// const arr = [1, ,]
// console.log(arr.includes(undefined)) // true
// console.log(arr.indexOf(undefined)) // -1
// console.log([...arr]) // [1, undefined]
// console.log(arr.join(',')) // 1,
// console.log(arr.toString()) // 1,

/**
 * 稀疏数组：
 *  + 有空元素的数组，就是稀疏数组
 *
 * 如何避免创建稀疏数组：
 *  + Array.apply(null, Array(3))
 *  + [...Array(3)]
 *  + Array.from(Array(3))
 */

/**
 * 数组不会自动添加分号
 * (, [, +, -, / 作为某一行代码的开头，很可能产生意外的情况
 */
// const arr = [1, 2, 3]
// console.log(arr)
// // 自己手动添加分号，不然代码执行报错
// ;[1, 2, 3].map((v) => v * v)

/**
 * indexof 与 includes：
 *  + indexOf 返回值是 number 类型，includes 返回值类型是 boolean
 *  + indexOf 不能用来判断数组是否含有 NaN，includes 可用来判断数组是否含有 NaN
 *  + 空位元素，indexOf 不可以找到空位元素，includes 可以找到空位元素，但是前提是用 undefined 的值来找空位元素，但是如何判断是空位元素还是数组某一项的值就是 undefined 呢？用 hasOwnProperty 来判断
 */

/**
 * 数组可变长度问题：
 *  + length 代表数组中元素个数，数组额外附加属性不计算在内
 *  + length 可写，可以通过修改 length 来改变数组的长度
 *  + 数组操作不存在越界(不会报错)，找不到下标，返回 undefined
 */
// const arr = [1, 2, 3]
// console.log(arr.length) // 3
// // length 可写，可以通过修改 length 来改变数组的长度
// arr.length = 10
// console.log(arr.length) // 10
// // 数组额外附加属性不计算在内
// arr['a'] = 'a'
// console.log(arr.length) // 10
// // 数组操作不存在越界(不会报错)，找不到下标，返回 undefined
// console.log(arr[100]) // undefined

/**
 * 数组中哪些方法可以跳出循环(特点：满足条件后终止)：
 *  + some
 *  + every
 *  + find
 *  + findIndex
 */
// const arr = [1, 2, 3]
// arr.findIndex((v) => {
//   console.log(v)
//   return v === 2
// })

/**
 * delete 误区：
 *  + 可以删除数组的元素
 *  + 不会改变数组的长度
 */
// const arr = [1, 2, 3, 4]
// delete arr[2]
// console.log(arr, arr.length) // [ 1, 2, <1 empty item>, 4 ] 4

/**
 * push vs concat：
 *  + push 的性能远高于 concat
 */
const count = 10000
const arr = [1, 2, 3, 4]
let newArr = []
console.time('push')
for (let i = 0; i < count; i++) {
  newArr.push(arr[0], arr[1], arr[2], arr[3])
}
console.timeEnd('push')

let newArr2 = []
console.time('concat')
for (let i = 0; i < count; i++) {
  newArr = newArr.concat(arr[0], arr[1], arr[2], arr[3])
}
console.timeEnd('concat')
