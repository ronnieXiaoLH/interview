/**
 * 内置类：
 *  - 每一种数据类型都有一个自己所属的内置类：Number, String, Boolean, Array, Object, Function, Symbol, BigInt, RegExp, Date...
 *  - 每一种 DOM 元素都有自己的所属类
 * 自定义类：
 */

function Fn (x, y) {
  let total = x + y
  this.x = x
  this.y = y
}

const res = Fn(10, 20)  // this.x = 10 -> 给 window 挂载了属性 x 
console.log(res)

/**
 * new 执行的时候，如果类不需要传递参数，可以不用加小括号(不加小括号，叫做无参数列表new，加小括号，叫做带参数列表new，除了是否传递参数的区别，在运算优先级上也有区别，new Fn -> 19 , new Fn() -> 20)
 * 每一次 new 都是把函数重新执行(重新形成一个新的私有上下文，重新创建一个实例对象，代码重新执行。...)
 */
const f1 = new Fn(20, 20)
console.log(f1)

/**
 * 检测某个成员(属性)是否属于这个对象:
 *    in: 检测成员是否属于这个对象(特点：不论是私有属性，还是公有属性，返回的结果都是 true)
 *    hasOwnProperty: 用来检测当前成员是否为对象的私有属性(只有私有属性，结果才为 true)
 * 
 * 原型链上的属性为 公有属性
 */
console.log('x' in f1)
console.log('hasOwnProperty' in f1)

console.log(f1.hasOwnProperty('x'))
console.log(f1.hasOwnProperty('hasOwnProperty'))

/**
 * 
 * @param {obj} 要检测的对象 
 * @param {attr} 要验证的成员
 * @returns 
 */
function hasPublicProperty (obj, attr) {
  // 思路一：是它的属性，且不是它的私有属性
  // 但是这种方式有个 BUG，如果一个属性既是私有的，也是公有的
  // return (attr in obj) && !obj.hasOwnProperty(attr)

  // 思路二：检测属性是否是它原型链上的属性
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    if (proto.hasOwnProperty(attr)) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

/**
 * in 和 hasOwnProperty 都可以检测 Symbol 属性
 * for in 无法遍历 Symbol 属性，但是可以遍历自己扩展的公共属性(非 Symbol 属性)，无法遍历内置的公有属性(因为内置的公有属性是不可枚举的)
 */

Object.prototype.A = 'AAA'
Object.prototype[Symbol('A')] = 'Symbol A'
let obj = {
  name: 'obj',
  [Symbol('key')]: 'symbol'
}
for (let key in obj) {
  console.log('key', key)
}

// 解决 for in 遍历自己扩展的公有属性的问题
for (let key in obj) {
  if (!obj.hasOwnProperty(key)) break; // 已经遍历到公共属性了，私有属性一定遍历完了
  console.log('private key: ', key)
}

// 解决 for in 和 Object.keys() 无法遍历 Symbol 属性的问题
Object.getOwnPropertySymbols(obj).forEach(key => {
  console.log('Symbol key: ', key)
})

function Person (name) {
  this.name = name
}

Person.prototype.name = 'person'

const p = new Person('xiaoming')