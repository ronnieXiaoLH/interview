/**
 * 创建数组的多种方式：
 *  + 数组对象字面量
 *  + new Array
 *  + Array.from(es6)
 *  + Array.of(es6) - 不熟悉查看 mdn
 *  + Array.prototype.slice, Array.prototype.concat 等返回数组的方法
 */

/**
 * 类数组：
 *  + 是有一个 length 属性和 从零开始索引的属性，但是没有 Array 的内置方法，比如 forEach 和 map 等一种特殊的对象
 *
 * 特征：
 *  + 是一个普通对象
 *  + 必须有 length 属性，可以有非负整数索引
 *  + 本身不具备数组所具备的方法
 *
 * 常见类数组：
 *  + arguments
 *  + NodeList, HTMLCollection, DOMTokenList(classList)
 * 奇特-字符串：
 *  + 具备类数组的所有特性，但是类数组一般指对象
 */
// console.log(Array.from('abc'))

// 判断类数组
// function isArrayLikeObject(arr) {
//   if (arr == null || typeof arr !== 'object') return false

//   if (!Object.prototype.hasOwnProperty.call(arr, 'length')) return false
//   if (!isFinite(arr.length)) return false
//   if (Array === arr.constructor) return false

//   if (arr.length >= 0 && arr.length < Number.MAX_SAFE_INTEGER) return true
//   return false
// }
