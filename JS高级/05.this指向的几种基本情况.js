/**
 * 1. 事件绑定
 *    不论是DOM0 还是 DOM2 级事件绑定，给元素 el 的某个事件绑定行为，当事件触发时，方法中的 this 指向元素 el
 *    + 特殊情况：
 *      IE6~8中，基于 attachEvent 绑定的事件，this 指向 window
 *      call/apply/bind强制改变了函数中 this 的指向
 * 2. 普通函数执行
 *    函数执行看函数前面是否有点，有点，点前面是谁，this 指向谁；没有点，非严格模式下，指向 window，严格模式指向 undefined
 *    自执行函数: 非严格模式下，指向 window，严格模式指向 undefined
 */

// function fn () {
//   console.log(this)
// }
// // document.body.addEventListener('click', fn)
// document.body.addEventListener('click', fn.bind({a:1}))

var x = 3
var obj = {x: 5}
obj.fn = (function() {
  this.x *= ++x
  return function(y) {
    this.x *= (++x) + y
    console.log(x)
  }
})()

// {
//   this.x *= (++x) + y
//   console.log(x)
// }
var fn = obj.fn // window.x = 12 
obj.fn(6) // obj.x = obj.x * (++window.x + y) => obj.x = 5 * (++12 + 6) => obj.x = 95, window.x = 13
fn(4) // window.x = window.x * (++window.x + y) => window.x = 13 * (++13 + 4) => obj.x = 13 * 18 = 234
console.log(obj.x, x)