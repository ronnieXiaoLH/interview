let obj = {
  num: 0,
  str: 'a',
  boolean: true,
  null: null,
  unf: undefined,
  arr: [3, 4, 5],
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

const isComplexDataType = obj => typeof obj === 'object' && obj !== null

function deepClone (obj, hash = new WeakMap) {
  if (obj.constructor === 'Date') return new Date(obj)
  if (obj.constructor === 'RegExp') return new RegExp(obj)

  if (hash.has(obj)) return obj
  hash.set(obj)
  
  let cloneObj = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))

  Reflect.ownKeys(obj).forEach(key => {
    cloneObj[key] = isComplexDataType(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  })

  return cloneObj
}