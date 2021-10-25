function fn () {
  this.a = 0
  this.b = function() {
    console.log(this.a)
  }
}

/**
 * 每一个函数都自带 prototype 属性，它的值是一个对象
 * 下面的代码重定向了 fn.prototype(构造函数的“原型重定向”) ，fn 自带的 prototype 创建的堆内存会被释放
 */

/**
 * 原型重定向：
 *   优势：
 *    1. 把原型上为其实例提供的公共属性和方法全部写在一起，提高了整体性或模块性
 *    2. 向其原型上扩展方法更容易一些
 *   弊端：
 *    1. 重定向后的原型对象中，缺失了 constructor 属性
 *      解决：fn.prototype = {
 *              constructor: fn // 手动设置
 *            }
 *    2. 如果原始内置的原型对象中已经有了一些属性和方法，属性重定向后，原有的属性和方法就丢失了
 *      解决：Object.assign(fn.prototype, {}) // 有另外的问题
 */

/**
 * 通过 fn.prototype = {constructor: fn} 这种方式给原型设置 constructor，会改变 constructor 的 enumerable 为 true，而内置的 constructor 的 enumerable 为 false
 */
// fn.prototype.d = 'd'
fn.prototype = {
  b: function() {
    this.a = 20
    console.log(this.a)
  },
  c: function() {
    this.a = 30
    console.log(this.a)
  }
}
// 如果是在重定向之后再通过如下方式扩展原型上的属性或方法，不会丢失
// fn.prototype.d = 'd'

/* Object.defineProperty(fn.prototype, 'constructor', {
  enumerable: false,
  get () {
    return fn
  }
}) */

var f = new fn()
f.b() // 0
f.c() // 30 // 执行 f.c 的时候修改了 f 里属性 a 的值(一定要考虑每一行代码执行所会产生的影响)

/**
 * 两者的区别：
 *  obj.fn1 是没有 prototype 属性，不能作为构造函数
 */
let obj = {
  fn1() {},
  fn2: function fn2 () {}
}
