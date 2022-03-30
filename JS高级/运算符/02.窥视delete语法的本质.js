/**
 * delete 操作符：
 *  + 返回值：boolean 类型，返回值 true，并不代表删除成功，仅表示，删除没有发生异常；false 表示没有删除成功
 *  + 与直接释放内存无关，内存管理是通过断开引用来间接完成的
 *  + 只能删除对象自身的私用属性，不能删除原型链上的属性(delete 本身就不会遍历原型链)
 *  + 不能删除任何全局作用域的变量和函数
 *  + 任何用 let 和 const 声明的属性，不能够从它被声明的作用域中删除
 *  + 不可配置的(Non-configurable)属性不能被移除
 *
 * delete 到底删除的是什么？
 *  + 如果删除的不是一个引用值(常量或字面量)，return true
 *  + 如果删除的是一个不可达的引用值，return true
 *
 * delete 语法的本质是什么？
 *  + 操作`表达式`的结果
 *  + 值、字面量，不操作，直接返回 true
 *  + 引用类型，删除引用
 */

// 不能删除任何全局作用域的变量和函数
// var b = 12
// console.log('delete b:', delete b) // false
// function fn() {}
// console.log('delete fn:', delete fn) // false

// 只能删除对象自身的私用属性，不能删除原型链上的属性
// var obj = {}
// console.log('delete .toString:', delete obj.toString) // true
// console.log('obj.toString:', obj.toString) // toString() { [native code] }

// 如果我想要删除原型链上的属性，怎么办呢
// function Foo() {
//   this.bar = 1
// }
// Foo.prototype.bar = 2
// console.log('delete Foo.prototype.bar', delete Foo.prototype.bar) // true
// console.log(Foo.prototype.bar) // undefined

// 不可配置的(Non-configurable)属性不能被移除
// undefined 是 window 的一个不可配置的属性
// console.log(Object.getOwnPropertyDescriptor(global, undefined)) // 注：node 环境 global, 浏览器环境 window
// console.log('delete undefined', delete undefined) // false

// 值、字面量，不操作，直接返回 true
// console.log(delete null) // true
// console.log(delete 1) // true
// console.log(delete xx) // true

// 非严格模式下
// var name = '帅哥'
// console.log(delete name) // false
// function fn() {}
// console.log(delete fn) // false
// function func(name) {
//   console.log(delete name) // undefined
// }

/**
 * 严格模式抛出的几种异常:
 *  + SyntaxError: 变量、函数名、函数参数
 *  + TypeError: configurable: false
 *  + ReferenceError: 典型的就是 delete super.prototype
 */
'use strict'
// SyntaxError: 变量、函数名、函数参数
// var name = '帅哥'
// delete name // SyntaxError: Delete of an unqualified identifier in strict mode

// function fn() {}
// delete fn // SyntaxError: Delete of an unqualified identifier in strict mode.

// function func(name) {
//   console.log(delete name) // SyntaxError: Delete of an unqualified identifier in strict mode.
// }

// TypeError: configurable: false
// var person = { name: '帅哥' }
// Object.defineProperty(person, 'name', {
//   configurable: false,
// })
// delete person.name // TypeError: Cannot delete property 'name' of #<Object>

// ReferenceError: 典型的就是 delete super.prototype
// class Parent {
//   constructor(name) {
//     this.name = name
//   }
// }
// class Child extends Parent {
//   constructor(name, age) {
//     super(name)
//     this.age = age
//   }

//   deleteAny() {
//     console.log('super', super.getName)
//     delete super.prototype // ReferenceError: Unsupported reference to 'super'
//   }
// }
// var c = new Child('帅哥', 18)
// c.deleteAny()
