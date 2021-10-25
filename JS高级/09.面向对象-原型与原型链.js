function Fn() {
  this.x = 100
  this.y = 200
  this.getX = function () {
    console.log(this.x)
  }
}

Fn.prototype.getX = function () {
  console.log(this.x)
}

Fn.prototype.getY = function () {
  console.log(this.y)
}

let f1 = new Fn
let f2 = new Fn
console.log(f1.getX === f2.getX) // false
console.log(f1.getY === f2.getY) // true
console.log(f1.__proto__.getY === Fn.prototype.getY) // true
console.log(f1.__proto__.getX === f2.getX) // false
console.log(f1.getX === Fn.constructor.getX) // false
console.log(f1.constructor) // Fn
console.log(Fn.prototype.__proto__.constructor) // Object
f1.getX() // 100
f1.__proto__.getX() // undefined
f2.getY() // 200
Fn.prototype.getY() // undefined

console.log(Function instanceof Object)
console.log(Object instanceof Function)
console.log(Function.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Object.__proto__)
console.log(Function.__proto__.__proto__ === Object.prototype)

/**
 * JS 中面向对象的底层处理机制：
 *  1. 每一个()函数数据类型，都天生自带一个属性(prototype原型属性)，属性值是一个对象，并且原型对象自带一个属性constructor，属性值是当前构造函数本身
 *  2. 每一个对象数据类型值，都天生自带一个属性：__proto__原型链属性(隐式属性)，属性值指向所属类的原型对象prototype
 *    + 普通对象，数组对象，日期对象，正则对象
 *    + prototype 原型对象
 *    + 实例对象
 *    + 函数也是对象
 *    + ...
 *  3. 所有对象都是内置类 Object 的实例
 */

/**
 * 原型链：
 *  成员访问，首先会找自己的私有属性，如果没有找到就会找所属类的 prototype 上的，一直一层一层的往上找，直到找到 Object.prototype 为止(因为 Object.prototype 指向 null)，我们把这种查找机制成为原型链
 */

/**
 * 作用域：除了全局作用域，函数会创建自己的作用域，以及ES6中新增的块级作用域，作用域在函数定义的时候就已经确定了
 * 作用域的作用：
 *  + 收集并维护所有声明的标识符(变量和函数)
 *  + 依照特定的规则对标识符进行查找
 *  + 确定当前的代码对标识符的访问权限
 * 
 * 作用域链：
 *  多个作用域相互嵌套的时候，就形成了作用域链。
 *  词法作用域在查找标识符的时候，优先在本作用域中查找，如果本作用域中没有找到标识符，会继续向上一级查找，当抵达最外层的全局作用域仍然没有找到，则会停止对标识符的搜索
 * 
 * 原型：
 *  所有的函数都有一个特殊的属性：prototype(原型)，prototype 属性是一个指针，指向的是一个对象(原型对象)，原型对象上的属性和方法可以被函数的实例所共享。
 */

/**
 * 作用域链与原型链的区别：
 *  作用域链主要用于查找标识符，当作用域需要查找变量的时候，会沿着作用域链依次查找，如果找到标识符就会停止搜索，否则将会沿着作用域链依次向后查找，直到作用域链的结尾。
 *  而原型链是用于查找对象(引用类型)的属性，查找属性会沿着原型链依次进行，如果找到该属性会停止搜索并做相应的操作，否则将会沿着原型链依次查找直到结尾。
 */

/**
 * 执行上下文和作用域的区别：
 *  作用域是在函数定义的时候就已经确定好了的，函数当中的变量是和函数所处的作用域有关，函数运行的作用域也是与该函数定义是的作用域有关
 *  执行上下文主要就是关键字 this 的值，这个是函数运行时决定的。函数每一次调用，都会产生一个新的执行上下文环境，因为每次不同的调用参数可能不同
 */