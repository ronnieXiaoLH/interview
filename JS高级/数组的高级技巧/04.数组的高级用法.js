// 万能数据生成器
const createValues = (creator, length = 10) => {
  return Array.from({ length }, creator)
}

// 随机数数组生成器
const createRandomValues = (len) => createValues(Math.random, len)
// console.log(createRandomValues(3))

// 序列生成器
const createRangeValues = (start, stop, step) =>
  createValues((_, i) => start + i * step, (stop - start) / step + 1)
// console.log(createRangeValues(1, 10, 2)) // 1, 3, 5, 7, 9

// 数据生成器
const createDataValues = (len) =>
  createValues(
    (_, i) => ({
      name: `user-${i + 1}`,
      age: (Math.random() * 100) | 0,
    }),
    len
  )
// console.log(createDataValues(3))

/**
 * 清空数组：
 *  + arr.length = 0
 *  + arr.splice(0)
 */
// let arr = [1, 2, 3]
// arr.splice(0)
// console.log(arr.length)

/**
 * 数组去重：
 *  + new Set()，对于属性和值都相同的对象没办法去重
 */
// let arr = createDataValues(3)
// arr = arr.concat({ name: 'user-2', age: arr[1].age })
// // console.log(Array.from(new Set(arr)))

// function uniqueArray(arr = [], key) {
//   const keyValues = new Set()
//   let val
//   return arr.filter((obj) => {
//     val = obj[key]
//     if (keyValues.has(val)) return false
//     keyValues.add(val)
//     return true
//   })
// }
// console.log(uniqueArray(arr, 'name'))
// 多个 key 的另外再处理

/**
 * 数组求交集：
 *  + new Set + includes (存在两个问题：1.引用类型相同的判断 2.性能问题)
 */
// function intersectSet(arr1, arr2) {
//   return [...new Set(arr1)].filter((item) => arr2.includes(item))
// }

// let arr1 = [1, 2, 3],
//   arr2 = [3, 4, 5]
// const res = intersectSet(arr1, arr2)
// console.log(res)

// const users1 = createDataValues(2)
// const users2 = createDataValues(3)
// const res2 = intersectSet(users1, users2)
// console.log(res2) // []

/**
 * 删除数组中的虚值
 */
// const arr = [false, 0, undefined, '', NaN, [], {}, 1, true, null, 'str']
// const res = arr.filter(Boolean)
// console.log(res) // [ [], {}, 1, true, 'str'

/**
 * 数组的最大值和最小值：
 *  + 最大值 Math.max.apply(Math, arr)
 *  + 最小值 Math.min.apply(Math, arr)
 */
// const arr = [3, 5, 1, 4, 8, 9, 2, 6]
// const max = Math.max.apply(Math, arr)
// const min = Math.min.apply(Math, arr)
// console.log(max, min)

// 数据合并
const length = 10000
const usersInfo = Array.from({ length }, (_, i) => ({
  uid: `${i + 1}`,
  name: `user-${i + 1}`,
  age: (Math.random() * 50) | (0 + 20),
}))
const scoresInfo = Array.from({ length }, (_, i) => ({
  uid: `${i + 1}`,
  score: ~~(Math.random() * 10000),
  comments: ~~(Math.random() * 10000),
  stars: ~~(Math.random() * 1000),
}))
// console.log(usersInfo, scoresInfo)

// 1. 基础版，两层 for 循环
console.time('a')
for (let i = 0; i < length; i++) {
  let user = usersInfo[i]
  for (let j = 0; j < length; j++) {
    const score = scoresInfo[j]
    if (user.uid === score.uid) {
      Object.assign(user, score)
    }
  }
}
console.timeEnd('a')
// console.log(usersInfo)

// 2. 改进版，两次 for 循环 + map
console.time('b')
let map = {}
for (let i = 0; i < length; i++) {
  const score = scoresInfo[i]
  map[score.uid] = score
}
for (let i = 0; i < length; i++) {
  const user = usersInfo[i]
  const score = map[user.uid]
  Object.assign(user, score)
}
console.timeEnd('b')
// console.log(usersInfo)
