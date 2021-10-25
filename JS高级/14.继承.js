/**
 * 封装：类也是一个函数，把实现功能的代码进行封装，以实现“高内聚低耦合”
 * 继承：子类继承父类的方法
 * 多态：重载、重写
 *    重载：相同的方法，由于参数或者返回值不同，具备了不同的功能(JS不具备严格意义上的重载，JS重载是在同一个方法根据不同的参数做不同的事情)
 *    重写：子类重写父类上的方法(伴随着继承运行的)
 *  
 */

// 继承的概念：通过某种方式，可以让一个对象访问另一个对象的属性和方法

function Person (name) {
  this.name = name
}

// 原型链继承(一)
Person.prototype.say = function () {
  console.log('hello')
}
// 缺点：如果一两个方法这样写可以，方法太多这种方式很累赘

// 原型链继承(二)
Person.prototype = {
  constructor: Person,
  say: function() {},
  eat: function() {}
}
// 问题：函数自带的 constructor 是不可枚举，手动添加的 constructor 是可枚举的

// 原型式继承
const a = {name: 'a'}
const b = Object.create(a)

// 构造函数继承
function Person (name) {
  this.name = name
  this.play = function() {}
}
Person.prototype.say = function() {}

function Child (name, age) {
  Person.call(this, name)
  this.age = age
}
Child.prototype.eat = function() {}
// const c = new Child('xiaoming', 18)
// console.log(c)
// 缺点：只能继承父类私有属性和方法，无法继承父类原型上的属性和方法

// 组合继承
function Person (name) {
  this.name = name
  this.play = function() {}
}
Person.prototype.say = function() {}

function Child (name, age) {
  Person.call(this, name)
  this.age = age
}
Child.prototype = new Person()
Child.prototype.constructor = Child
Child.prototype.eat = function() {}
// const c = new Child('xiaoming', 18)
// console.log(c)
// 缺点：虽然可以继承父类私有属性和方法，也继承了父类原型上的属性和方法，但是两次调用了父类的构造函数，且子类实例上有父类的私有属性和方法，子类的原型链上也有父类的私有属性和方法，子类的原型链不干净

// 寄生组合继承
function Person (name) {
  this.name = name
  this.play = function() {}
}
Person.prototype.say = function() {}

function Child (name, age) {
  Person.call(this, name)
  this.age = age
}
Child.prototype = Object.create(Person.prototype)
Child.prototype.constructor = Child
const c = new Child('xiaoming', 18)
console.log(c)

// class Person {
//   constructor(name) {
//     this.name = name
//     this.play = function() {}
//   }
// }
// Person.prototype.say = function() {}

// class Child extends Person {
//   constructor(name, age) {
//     super(name)
//     this.age = age
//   }
// }
// Child.prototype.eat = function() {}
// const c = new Child('xiaoming', 18)