// 数组的浅拷贝
let arr = [1, [2, 3], 4]
let arr2 = [].concat(arr)
// console.log(arr === arr2, arr[2] === arr2[2])
let arr3 = arr.slice()
// console.log(arr === arr3, arr[2] === arr3[2])

// 对象的浅拷贝
let o = {a: 1, b: {c: 2}}
let o2 = Object.assign({}, o)
// console.log(o2 === o, o2.b === o.b)
let o3 = {...o}
// console.log(o3 === o, o3.b === o.b)

/**
 * 浅拷贝函数主要考虑以下几种类型
 * 1. 数组
 * 2. 对象
 * 3. 函数
 * 4. 日期和正则
 * 5. Symbol 和 BigInt
 * 6. 基础数据类型
 */
function shallowClone (obj) {
  let type = Object.prototype.toString.call(obj)
  type = type.substring(8, type.length - 1).toLowerCase()
  if (type === 'object') {
    return {...obj}
  }
  if (type === 'array') {
    return [...obj]
  }
  if (type === 'function') {
    return function () {
      obj.call(this, ...arguments)
    }
  }

  if (type === 'date' || type === 'regexp') {
    return new obj.constructor(obj)
  }

  if (type === 'symbol' || type === 'bigint') {
    return Object(obj)
  }

  return obj
}

let arr4 = shallowClone(arr)
// console.log(arr === arr4, arr[2] === arr4[2])
let o4 = shallowClone(o)
// console.log(o4 === o, o4.b === o.b)

/**
 * 深拷贝
 */

function deepClone (obj, cache = new Set()) {
  let type = Object.prototype.toString.call(obj)
  type = type.substring(8, type.length - 1).toLowerCase()

  if (type !== 'array' && type !== 'object') {
    return shallowClone(obj)
  }

  if (cache.has(obj)) return obj
  cache.add(obj)

  if (type === 'object') {
    let newObj = {}
    Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)).forEach(key => {
      newObj[key] = deepClone(obj[key], cache)
    })
    return newObj
  }

  if (type === 'array') {
    let newArr = []
    Object.keys(obj).concat(Object.getOwnPropertySymbols(obj)).forEach(key => {
      newArr.push(deepClone(obj[key]), cache)
    })
    return newArr
  }
}

let arr5 = deepClone(arr)
console.log(arr === arr5, arr[2] === arr5[2])
let o5 = deepClone(o)
console.log(o5 === o, o5.b === o.b)
console.log(arr5, o5)

let obj = {
  num: 0,
  str: 'a',
  boolean: true,
  null: null,
  unf: undefined,
  arr: [0, 1, 2],
  obj: {name: '我是一个对象', id: 1},
  func: function() {console.log('我是函数')},
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol(1)]: 1,
  bigint: BigInt(1)
}

obj.xx = {
  0: obj
}

// console.log(deepClone(obj))