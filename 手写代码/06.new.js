// 1. 创建一个新的对象 p1
// 2. 将 对象 p1 的 __proto__ 指向 构造函数 Player 的 prototype(原型)
// 3. 将 this 指向新创建的对象 p1
// 4. 返回对象
//   1. 无 return ，返回 p1
//   2. return this , 返回 p1
//   3. return 基础数据类型 ，返回 p1
//   4. return 复杂数据类型 , 返回这个复杂数据类型

function Player (name, age) {
  this.name = name
  this.age = age
}

function _new () {
  // 1. 创建一个新的对象
  let o = new Object()
  let classFn = Array.prototype.shift.call(arguments)
  // 2. 将对象的 __porto__ 指向 构造器的 prototype
  o.__proto__ = classFn.prototype
  // 3. 执行构造函数，并将 this 指向新创建的对象
  const res = classFn.call(o, ...arguments)
  // 4. 返回对象
  return (typeof res === 'object' && res !== null) || typeof res === 'function' ? res : o
}

let p1 = _new(Player, 'zhangshan', 18)
console.log(p1)
console.log(p1 instanceof Player)