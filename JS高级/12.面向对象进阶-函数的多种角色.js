/**
 * 函数的多种角色：
 *  + 函数
 *    1. 普通函数 -> 作用域
 *    2. 构造函数(类) -> 原型和原型链
 *  + 对象
 * 
 * 三种角色之间没有必然的联系
 */

/**
 * 所有函数都是 Function 类的实例，不管是自定义的函数还是内置的函数
 */
console.log(Array instanceof Function) // true
console.log(Array.__proto__ === Function.prototype) // true
console.log(Array.__proto__.__proto__ === Object.prototype) // true
console.log([].__proto__ === Array.prototype) // true
console.log(Array.prototype.__proto__ === Object.prototype) // true
console.log(Array.prototype.__proto__ === Array.__proto__.__proto__) // true

// 问题：Function 大 还是 Object 大
console.log(Object instanceof Function)
console.log(Function instanceof Object)

/**
 * 原型对象与内置类：
 *  原型对象上的属性和方法是供实例调用的，内置类的方法是供类调用
 */
// Array.from() Array.isArray() Object.keys() Object.create() Object.assign()

/**
 * 不具备 prototype 的函数：不能被 new 执行，即不能作为构造函数
 *  1. 箭头函数
 *  2. let obj = { fn() {} }
 *  3. Function.prototype
 */