/**
 * Object.is 不会转换被比较的两个值的类型，这点和 === 相似，但是它们之间也存在一些差别：
 *  + NaN 和 NaN 用 Object.is 判断是相等的
 *  + +0 和 -0 在 === 判断是相等的，但是用 Object.is 判断是不等的
 */

Object.is = function (x, y) {
  if (x === y) {
    // 如果 x, y 分别是 +0 和 -0 也是相等的，我们需要特殊处理
    return x !== 0 || 1 / x === 1 / y
  }

  // x !== y 时，我们需要特殊处理 x,y 都是 NaN 的情况
  return x !== x && y !== y
}

console.log(Object.is(NaN, NaN))
console.log(Object.is(+0, -0))

function objectIs (a, b) {
  // a, b 都是 NaN 的时候，return true
  if (a !== a && b !== b) {
    return  true
  }
  // 特殊判断 +0 和 -0 的情况
  return a === b && 1 / a === 1 / b
}