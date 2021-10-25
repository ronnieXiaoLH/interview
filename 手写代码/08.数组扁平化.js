const arr = [
  1,
  [2, 3],
  [4, [5, 6]]
]

// ES10 的 flat 方法
// function flatten (arr) {
//   return arr.flat(Infinity)
// }

// arr.toString()方法
// function flatten (arr) {
//   return arr.toString().split(',').map(item => Number(item))
// }

// JSON.stringify(arr)
// function flatten (arr) {
//   return JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item => Number(item))
// }

// 递归遍历
// function flatten (arr) {
//   let res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(flatten(arr[i]))
//     } else {
//       res = res.concat(arr[i])
//     }
//   }
//   return res
// }

// 利用 reduce 简化递归
function flatten (arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

// 利用扩展运算符 [].concat(...arr)
// function flatten (arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }

// 利用生成器函数
// function * flatten (arr) {
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       yield * flatten(arr[i])
//     } else {
//       yield arr[i]
//     }
//   }
// }
// console.log([...flatten(arr)])

console.log(flatten(arr))