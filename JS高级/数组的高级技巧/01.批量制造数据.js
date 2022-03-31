// 批量制造数据 - Array.fill.map
// function crateData(length) {
//   return (
//     Array(length)
//       // 这里一定要加 fill 处理，如果没有 fill 填充数据，创建的数组的元素都是 empty，empty 是不会参与 map 运算的
//       .fill(0)
//       .map((_, index) => ({ name: `name${index + 1}` }))
//   )
// }
// console.log(crateData(10))

// 批量制造数据 - Array.from
function crateData(length) {
  return Array.from({ length }, (_, index) => ({ name: `name${index + 1}` }))
}
console.log(crateData(10))

// Array.form 经常被用来创建二维数组
console.log(Array.from({ length: 10 }, () => Array(10).fill(0)))
