/**
 * let VS const
 *  + let 声明的一个变量，变量存值可以修改
 *  + const 声明的变量，一旦赋值，则不能和其他值关联(不允许指针重新指向)
 */

/**
 * let VS var
 *  + var 存在变量提升，而 let 不会
 *  + 在全局上下文中，基于 var 声明的变量，也相当于给 GO(全局变量 window) 新增一个属性，并且其中一个值发生改变，另一个也随之改变；而 let 不会
 *  + 在相同的上下文中，let 不允许重复声明，而 var 很松散，重复声明也无所谓，反正浏览器也只按照一次处理
 *  + 暂时性死区 (浏览器暂存的BUG)
 *  + let/const/function 会产生块级私有上下文，而 var 不会
 */

/**
 * EC(G):
 *  变量提升 var n;
 */

/* var a = 1
let b = 1 */

/* function fn () {
  m = 13 // 相当于 window.m = 13
}

fn() */

// 在代码执行阶段，浏览器会处理很多事情，比如：词法分析
/* console.log(n) // 在词法分析阶段就会报语法错误，代码根本不会执行
var n = 1
var n = 2
let n = 3 */

// 基于 typeof 检测一个未被声明的变量，不会报错，结果是 undefined
/* console.log(n) // Uncaught ReferenceError: n is not defined
console.log(typeof n) // undefined */

/* console.log('ok')
// 运行时报错
console.log(typeof n) // Uncaught ReferenceError: n is not defined
let n = 1 */

/**
 * 上下文 & 作用域：
 *  + 全局上下文
 *  + 函数执行形成的私有上下文
 *  + 块级上下文：除了 对象、函数的大括号外，其他的大括号都可能产生块级上下文(比如：判断体、循环体)【if, for, while, switch, {}】
 *  + 暂时性死区
 */

/**
 * 使用 let 或 const 定义的变量，在定义之前该变量是不可使用的。这在语法上，被称作“暂时性死区”
 */
{
  var n = 1
  let m = 2
}
console.log(n) // 1
console.log(m) // Uncaught ReferenceError: m is not defined