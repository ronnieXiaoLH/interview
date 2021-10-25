// T1
/**
 * == 相等：左右两边类型不同，会默认先转换为相同的类型，再去比较
 *  对象 == 字符串：对象转成字符串
 *  null == undefined: 相等，但是和其他值都不相等
 *  NaN == NaN：false, NaN 和任何值都不相等
 *  剩余的都是转换为数字
 * 对象 -> 数字/字符串
 *  1. 先调取属性 Symbol.toPrimitive
 *  2. 没有 Symbol.toPrimitive 这个属性，调用 valueOf 获取原始值(基本类型的值)
 *  3. 如果也没有 valueOf 方法，调用 toString 变为字符串
 *  4. 如果最后是转换为数字，再去调用 Number，把字符串转换为数字
 */
// var a = ?
/* var a = { i: 0 }
// a[Symbol.toPrimitive] = function () {
//   return ++this.i
// }
// a.valueOf = function () {
//   return ++this.i
// }
a.toString = function () {
  return ++this.i
} */
// var a = [1, 2, 3]
// a.toString = a.shift

// 方案二：在全局上下文中基于 var / function 声明变量，相当于给 window 设置对应的属性
/* var i = 0
Object.defineProperty(window, 'a', {
  get () {
    return ++i
  }
})
if (a == 1 && a == 2 && a == 3) {
  console.log('ok')
} */

// T2
/**
 * 解题思路：push 方法根据 length 属性来决定从哪里开始插入给定的值。如果 length 不能被转成一个数值，则插入的元素索引为 0，包括 length 不存在时。当 length 不存在时，将会创建它。
 */
/* let obj = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push
}
obj.push(1) // obj.length 值为 2，这 push 方法要插入的数据的索引为 2 -> obj[2] = 1, length = 3
obj.push(2) // obj.length 值为 3，这 push 方法要插入的数据的索引为 3 -> obj[3] = 2, length = 4
console.log(obj) */

// T3: 基于 ES6 中的 class 重构下列代码
/* function Modal (x, y) {
  this.x = x
  this.y = y
}
Modal.prototype.z = 10
Modal.prototype.getX = function () {
  console.log(this.x)
}
Modal.prototype.getY = function () {
  console.log(this.y)
}
Modal.n = 200
Modal.setNumber = function (n) {
  this.n = n
}
let m = new Modal(10, 20) */

/* class Modal {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  getX () {
    console.log(this.x)
  }

  getY () {
    console.log(this.y)
  }

  // z = 100 // 相当于在构造函数中 this.z = 100

  static n = 200
  static setNumber (n) {
    this.n = n
  }
}
// 往原型上加属性，只能
Modal.prototype.z = 100
let m = new Modal(10, 20) */

// T4: 编写 queryURLParams 方法实现如下效果(至少两种方案)
/* String.prototype.queryURLParams = function (key) {
  const hashArr = this.split('#')
  const search = hashArr[0].split('?')[1]
  const searchArr = search.split('&')
  let searchMap = {}
  searchArr.forEach(item => {
    let arr = item.split('=')
    searchMap[arr[0]] = arr[1]
  })
  if (key === '_HASH') {
    return hashArr[1]
  } else {
    return searchMap[key]
  }
} */

/* String.prototype.queryURLParams = function (key) {
  const link = document.createElement('a')
  link.href = this
  let map = {}
  if (link.hash) {
    map['_HASH'] = link.hash.substring(1)
  }
  if (link.search) {
    const search = link.search.substring(1)
    const searchArr = search.split('&')
    searchArr.forEach(item => {
      const arr = item.split('=')
      map[arr[0]] = arr[1]
    })
  }
  return map[key]
} */

/* String.prototype.queryURLParams = function (key) {
  let map = {}
  let _this = this
  _this.replace(/#([^?#=&]+)/g, function (_, $1) {
    map['_HASH'] = $1
  })
  _this.replace(/([^?=&#]+)=([^?=&#]+)/g, function (_, $1, $2) {
    map[$1] = $2
  })
  return map[key]
}

let url = 'http://www.xxx.cn/?lx=1&from=wx#video'
console.log(url.queryURLParams('from')) // => "wx"
console.log(url.queryURLParams('_HASH')) // => "video" */

// T5
/* // 面试的时候最好判断一下参数是不是数字
Number.prototype.plus = function (n) {
  return this + n
}
Number.prototype.minus = function (n) {
  return this - n
}
let n = 10
let m = n.plus(10).minus(5)
console.log(m) */

// T6
/* function Foo() {
  getName = function () {
    console.log(1)
  }
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}
function getName () {
  console.log(5)
}

Foo.getName() // 2
getName() // 4 // function getName () {console.log(5)} 变量提升阶段，声明 + 定义了
Foo().getName() // 1
getName() // 1
new Foo.getName() // 2
new Foo().getName() // 3 // 这里考察了运算符的优先级
new new Foo().getName() // 3 */
/**
 * JS运算符优先级：
 *  成员访问：20
 *  new(): 20
 *  new: 19
 */

/* function Fn() {
  let a = 1
  this.a = a
}
Fn.prototype.say = function () {
  this.a = 2
}
// Fn.prototype = new Fn
let f1 = new Fn
Fn.prototype.b = function () {
  this.a = 3
}

console.log(f1.a) // 1
console.log(f1.prototype) // undefined
console.log(f1.b) // function
console.log(f1.hasOwnProperty('b')) // false
console.log('b' in f1) // true
console.log(f1.constructor == Fn) // true // 这里 f1 没有 constructor ，会找 f1 的原型 */

// T7
/* function C1(name) {
  if (name) {
    this.name = name
  }
}
function C2(name) {
  this.name = name
}
function C3(name) {
  this.name = name || 'join'
}
C1.prototype.name = 'TOM'
C2.prototype.name = 'TOM'
C3.prototype.name = 'TOM'
console.log((new C1().name) + (new C2().name) + (new C3().name)) */

// T8
var name = 'call'
function A(x, y) {
  var res = x + y
  console.log(res, this.name)
}

function B(x, y) {
  var res = x - y
  console.log(res, this.name)
}

B.call(A, 40, 30) // 10, 'A'
// B.call.call 对应的是 Function.prototype.call = function(){}，然后 call 方法的 this 指向 A, context -> 20, 10 为参数
B.call.call.call(A, 20, 10) // NaN, undefined
Function.prototype.call(A, 60, 50) // 匿名空函数执行，没有输出
Function.prototype.call.call.call(A, 80, 70)