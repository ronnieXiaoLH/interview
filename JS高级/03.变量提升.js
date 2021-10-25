// 1. var 定义的变量，只会变量提升
// console.log(a)
// var a = 12
// a = 13
// console.log(a)

// 2. function 关键字定义的变量会变量提升和定义
// func()
// function func () {
//   console.log('ok')
// }
// var func = function A () {
//   /**
//    * 匿名函数“具名化”：
//    *  这个名字不能在外面访问，当前上下文中不会创建这个名字
//    *  这个函数执行时，在形成的私有上下文中，会把这个具名化的名字作为私有上下文中的变量，对应的值就是这个函数
//    *  函数具名化的作用：递归调用，严格模式下不支持 arguments.callee
//    */
//   console.log('ok')
// }

// console.log(a) // a is not defined
// a = 13
// console.log(a)

// console.log(a) // a is not defined
// let a = 13
// console.log(a)

// 3. 条件判断不管成立与否，var 和 function 关键字 都会变量提升
// if (false) {
//   var a = 1
// }
// console.log(a)

// var foo = 1
// function bar() {
//   if (!foo) {
//     console.log('a')
//     var foo = 10
//   }
//   console.log(foo)
// }
// bar()

/**
 * 注意：函数变量提升这个操作不会重复执行，但是定义操作会再次执行
 * 1. 声明 fn，定义 fn `console.log(1)`
 * 2. 定义 fn `console.log(2)`
 * 3. var fn 已经声明过了，不再重复声明
 * 4. 定义 fn `console.log(4)`
 * 5. 定义 fn `console.log(5)`
 * 执行：
 *  1. fn() -> 5
 *  2. fn() -> 5
 *  3. fn() -> 5
 *  4. fn = function() {console.log(3)} fn 赋值
 *  5. fn() -> 3
 *  6. fn() -> 3
 *  7. fn() -> 3
 */
// fn()
// function fn() {console.log(1)}
// fn()
// function fn() {console.log(2)}
// fn()
// var fn = function() {console.log(3)}
// fn()
// function fn() {console.log(4)}
// fn()
// function fn() {console.log(5)}
// fn()

// var a = 10
// function a () {}
// console.log(a)

// T1
/* console.log(a, b, c) // undefined, undefined, undefined
var a = 12, b = 13, c = 14;
function fn(a) {
  console.log(a, b, c) // 10, 13, 14
  a = 100
  c = 200
  console.log(a, b, c) // 100, 13, 200
}
b = fn(10)
console.log(a, b, c) // 12, undefined, 200 */

// T2
/* var i = 0
function A() {
  var i = 10
  function x() {
    console.log(i) // 10, 10
  }
  return x
}
var y = A()
y()
function B() {
  var i = 20
  y()
}
B()
 */

// T3
/* var a = 1
var obj = {
  name: 'tom'
}
function fn() {
  var a2 = a
  // obj2 函数 fn 中未定义，会往全局找，全局也未定义，此时如果输出 obj2 ，会报错 obj2 is not defined
  // obj2 = obj 会在全局定义 obj2
  obj2 = obj
  a2 = a
  obj2.name = 'jack'
}
fn()
console.log(a) // 1
console.log(obj) // {name: 'jack'} */

// T4
// var a = 1
// function fn(a) {
//   /*
//    * EC(FN)
//    *  作用域链：<EC(FN), EC(G)>
//    *  形参赋值：a = 1
//    *  变量提升：
//    *    var a
//    *    a -> 0x001 [[scope]]: EC(FN) // 不会重复声明，但是需要重新赋值(定义)
//    *  ----------------------------
//    *  函数体代码执行
//    */
//   console.log(a) // function
//   var a = 2
//   function a() {}
// }
// fn(a)

// T5.1
/* console.log(a) // undefined
var a = 12
function fn() {
  console.log(a) // undefined
  var a = 13
}
fn()
console.log(a) // 12 */

// T5.2
/* console.log(a) // undefined
var a = 12
function fn() {
  console.log(a) // 12
  a = 13
}
fn()
console.log(a) // 13 */

// T5.3
/* console.log(a) // a is not undefined
a = 12
function fn () {
  console.log(a)
  a = 13
}
fn()
console.log(a) */

// T6
// var foo = 'hello';
// (function (foo) {
//   /**
//   * EC(AN)
//   *   作用域链：<EC(AN), EC(FN)>
//   *   形参赋值：foo = 'hello'
//   *   变量提升：var foo(foo 已经有了，不会重复声明)
//   */
//   console.log(foo) // hello
//   var foo = foo || 'world'
//   console.log(foo) // hello
// })(foo)
// console.log(foo) // hello

// T7.1
/**
 * 新版本浏览器要兼容ES3/ES5，也要兼容ES6，所以产生了一些变态机制：
 *    除函数/对象等大括号外，其他大括号中出现了 let/const/function 则会单独形成块级上下文
 */
/* console.log(foo)
// 变量提升：出现在其他大括号中的 function 不再是声明 + 定义，而是只声明
{
  function foo() {} // 在块级作用域内，已经在变量提升时处理过了，此时在块级作用域内跳过，但是全局作用域内也有引用到，会把函数之前所做的操作给全局一份
  foo = 1
}
console.log(foo) */

// T7.2
/* console.log(foo)
{
  console.log(foo)
  function foo() {}
  foo = 1
  function foo() {}
  console.log(foo)
  foo = 2
  console.log(foo)
}
console.log(foo) */

// T8.1
/* var x = 1
function func(x, y = function () {x=2}) {
  x = 3
  y()
  console.log(x) // 2
}
func(5)
console.log(x) // 1 */

// T8.1
/* var x = 1
function func(x, y = function () {x=2}) {
  var x = 3
  y()
  console.log(x) // 2
}
func(5)
console.log(x) // 1 */