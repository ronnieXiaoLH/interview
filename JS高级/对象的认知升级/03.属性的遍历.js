/**
 * 属性的类型：
 *  + 普通属性
 *  + 不可枚举的属性
 *  + 原型属性
 *  + Symbol属性
 *  + 静态属性
 */

/**
 * 属性的遍历：
 *  + for in 可以遍历普通属性和原型属性，不可以遍历不可枚举的属性和Symbol属性
 *  + Object.keys() 可以遍历普通属性，不可以遍历原型属性、不可枚举的属性和Symbol属性
 *  + Reflect.ownKeys() 可以遍历普通属性、Symbol属性和不可枚举的属性，不可以遍历和原型属性
 *  + Object.getOwnPropertyNames() 可以遍历普通属性和不可枚举的属性，不可以遍历原型属性和Symbol属性
 *  + Object.getOwnPropertySymbols() 可以遍历Symbol属性和不可枚举的属性，不可以遍历普通属性和原型属性
 */

const symbolSay = Symbol.for('say1')

class Person {
  static flag = '人' // 静态属性
  static getFlag() {
    // 静态方法
    return Person.flag
  }

  static [Symbol.for('symbolPro')]() {
    return 'symbolPro'
  }

  constructor(name) {
    this.name = name // 普通属性
    this[symbolSay] = 'haha' // Symbol 属性
  }

  getName() {
    // 原型属性(方法)
    return this.name
  }
}

// 获取对象的所有静态属性
function getOwnPropertyStatics(_obj) {
  const KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true,
  }

  let result = []

  // const keys = Reflect.ownKeys(_obj)
  const keys = Object.getOwnPropertyNames(_obj).concat(
    Object.getOwnPropertySymbols(_obj)
  )
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!KNOWN_STATICS[key]) {
      result.push(key)
    }
  }
  return result
}

console.log(getOwnPropertyStatics(Person))
