// 1. Symbol 可以表示一个独一无二的值
let key = 'a'
const symbol1 = Symbol(key)
const symbol2 = Symbol(key)
console.log(symbol1 === symbol2) // false

// 2. Symbol.for 方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中
const symbol3 = Symbol.for(key)
const symbol4 = Symbol.for(key)
console.log(symbol3 === symbol4) // true

// 3. Symbol 的元编程能力(改写语法本身)，比如手写 Promise 的时候，定义它的 [Symbol.toStringTag] 为 Promise
let obj = {
  a: '1',
  [Symbol.toStringTag]: 'not Object'
}
console.log(Object.prototype.toString.call(obj)) // [object not Object]

// 4. Symbol.hasInstance 用于判断某对象是否为某构造器的实例
let instance = {
  [Symbol.hasInstance](value) {
    return 'name' in value
  }
}
console.log({name:'zf'} instanceof instance) // true

// 5. Symbol.toPrimitive