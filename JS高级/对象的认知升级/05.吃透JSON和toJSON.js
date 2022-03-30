/**
 * JSON格式：
 *  + JSON是一种轻量级的、基于文本的、与语言无关的语法、用于定义数据交换格式
 *  + 它源于ECMAScript编程语言，但是独立于编程语言
 *
 * JSON特征：
 *  + JSON就是一串字符串，使用特定的符号标记
 *  + {} 表示对象
 *  + [] 表示数组
 *  + "" 双引号内是属性键或值
 *
 * JSON键：
 *  + 只能是字符串
 *  + 必须双引号包裹
 *
 * JSON值：
 *  + object
 *  + array
 *  + number(只能是10进制)
 *  + string
 *  + true
 *  + false
 *  + null
 *
 * 对象字面量：
 *  + 是创建对象的一种快捷方式，英文名 object literal
 *  + 字面量的性能优于使用 new Object 构建(原因就是隐藏类)
 */

/**
 * JSON.parse 的第二个参数 reviver 函数：
 *  + 遍历顺序，从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身；当遍历到最顶层时，key 是空字符串
 *  + this指向当前属性所属的对象
 *  + 如果返回的值是 undefined，则当前属性会被删除，如果返回的是其他值，则返回的值会成为当前属性的新的属性值
 */
const jsonStr = `{
  "name": "牙膏",
  "count": 10,
  "orderDetail": {
    "createTime": 1648606586121,
    "orderId": 7439677594160832,
    "more": {
      "desc": "描述"
    }
  }
}`
function reviver(k, v) {
  // console.log('k', k) // name, count, createTime, orderId, desc, more, orderDetail, ''
  // console.log(k, this)
  if (k === 'name') return undefined
  return v
}
const res = JSON.parse(jsonStr, reviver)
// console.log(res)

/**
 * JSON.stringify 的可选参数：
 *  + replacer: 如果该参数是一个函数，每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
 *  + space: 指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。
 */
const person = {
  name: '帅哥',
  age: 20,
  birth: '2002-03-30',
}
function replacer(k, v) {
  if (k === 'name') {
    return undefined
  }
  return v
}
// console.log(JSON.stringify(person, replacer))

// console.log(JSON.stringify(person, ['name', 'age']))

// console.log(JSON.stringify(person, null, 2))

/**
 * JSON.stringify 的规则 - undefined、任意的函数、Symbol：
 *  + 作为对象的属性值：自动忽略
 *  + 作为数组某一项的值，序列化为 null
 *  + 单独序列化时，返回 undefined
 *
 * JSON.stringify 的其他规则
 *  + Date 返回 ISO 字符串
 *  + NaN, Infinity, null 都会作为 null (单独转换和作为对象的属性值都是一样的结果)
 *  + 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
 *  + 对象仅序列化可枚举属性
 *  + 循环引用报错
 *  + BigInt 报错
 *  + 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
 */

function func() {}
const symbol = Symbol('test symbol')

// 作为对象的属性值：自动忽略
const obj = {
  num: 0,
  unf: undefined,
  func,
  symbol,
}
// console.log(JSON.stringify(obj, null, 2)) // "{"num": 0}"

// 作为数组某一项的值，序列化为 null
const arr = [1, undefined, func, symbol, 'a']
// console.log(JSON.stringify(arr, null, 0)) // '[1,null,null,null,"a"]'

// 单独序列化时，返回 undefined
// console.log(JSON.stringify(undefined)) // undefined
// console.log(JSON.stringify(func)) // undefined
// console.log(JSON.stringify(symbol)) // undefined

// Date 返回 ISO 字符串
// console.log(JSON.stringify({ date: new Date() })) // {"date":"2022-03-30T06:48:26.432Z"}

// NaN, Infinity, null 都会作为 null
// console.log(JSON.stringify(NaN)) // null
// console.log(JSON.stringify(Infinity)) // null
// console.log(JSON.stringify(null)) // null
const obj2 = {
  nan: NaN,
  infinity: Infinity,
  null: null,
}
// console.log(JSON.stringify(obj2, null, 2))

// 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
// console.log(JSON.stringify(Boolean(true))) // true
// console.log(JSON.stringify(Number(1))) // 1
// console.log(JSON.stringify(String('a'))) // a

// 对象仅序列化可枚举属性
let obj3 = Object.create(null, {
  a: { value: 1, enumerable: true },
  b: { value: 2, enumerable: false },
})
// console.log(JSON.stringify(obj3))

// 循环引用报错
let obj4 = { a: 1 }
obj4.xx = {
  0: obj4,
}
// console.log(JSON.stringify(obj4)) // TypeError: Converting circular structure to JSON

// BigInt 报错
// console.log(JSON.stringify(BigInt(1))) // TypeError: Do not know how to serialize a BigInt

// 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化
person.toJSON = function () {
  return { name: '大帅哥' }
}
console.log(JSON.stringify(person)) // {"name":"大帅哥"}
