/* var a = 4
function b(x, y, a) {
  console.log(a) // 3
  arguments[2] = 10
  console.log(a) // 10 ，'use strict' -> 3
}
a = b(1, 2, 3)
console.log(a) // undefined */

/* var a = 9
function fn () {
  a = 0
  return function (b) {
    return b + a++
  }
}
var f = fn()
console.log(f(5)) // 5
console.log(fn()(5)) // 5
console.log(f(5)) // 6
console.log(a) // 2 */

/* var x = 4
function func() {
  return function(y) { 
    console.log(y + (--x)) // 9,10,
  }
}
var f = func(5)
f(6)
func(7)(8) 
func(9)
console.log(x) // 2 */

/* var x = 5
var y = 6
function func () {
  x += y
  func = function (y) {
    console.log(y + (--x)) // 13
  }
  console.log(x, y) // (11, 6)
}
func(4)
func(3)
console.log(x, y) // (10, 6) */

// 匿名函数具名化，设置的名字不属于当前函数所在作用域中的变量，并且在匿名函数内部直接改值无效，除非函数内部重新声明这个变量（基于var/let/const/function都可以）
/* var b = 10;
(function b() {
  b = 20
  console.log(b)
})()
console.log(b) */

/* var num = 10
var obj = {
  num: 20
}
obj.fn = (function (num) {
  this.num = num * 3
  num++
  return function (n) {
    this.num += n
    num++
    console.log(num) // 22 23
  }
})(obj.num)
// 匿名函数执行完，全局 num=60 EC(AN):num=21
var fn = obj.fn
fn(5) // EC(G): num = 65 EC(AN): num=22
obj.fn(10) // EC(G): obj = {num:30} EC(AN): num=23
console.log(num, obj.num) // 65 30 */

/* let obj = {
  fn: (function () {
    return function () {
      console.log(this)
    }
  })()
}
obj.fn()
let fn = obj.fn
fn() */

/* (function() {
  var val = 1
  var json = {
    val: 10,
    dbl: function() {
      val *= 2
    }
  }
  json.dbl() // 这里计算 val *= 2，val 是变量
  console.log(json.val + val)
})() */

function fun(n, o) {
  console.log(o)
  return {
    fun: function (m) {
      return fun(m, n)
    }
  }
}
var c = fun(0).fun(1)
c.fun(2)
c.fun(3)