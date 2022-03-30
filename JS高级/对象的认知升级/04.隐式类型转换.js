/**
 * 隐式转换：编译器自动完成类型转换的方式就称为隐式转换
 *
 * 结果：总是期望返回基本类型值
 *
 * 什么时候会发生隐式类型转换：
 *  + 二元 + 运算符
 *  + 关系运算符 > >= == < <=
 *  + 逻辑! , if/while , 三目条件
 *  + 属性遍历 ，for in 等
 *  + 模板字符串
 */

const obj = {
  value: 10,
  toString: function () {
    return this.value + 10
  },
  valueOf: function () {
    return this.value
  },
}

/**
 * 对象的 key 是 string，所以会调用 obj.toString，结果返回 20
 */
obj[obj] = obj.value // => obj['20'] = 10

console.log('keys:', Object.keys(obj)) // 20 , value , toString , valueOf
console.log('${obj}:', `${obj}`) // 20 ，期望是 string ，所以调用的是 obj.toString
console.log('obj + 1:', obj + 1) // 11 ，期望是 number ，所以调用的是 obj.valueOf
console.log('obj + ""', obj + '') // 10 ，期望是 number ，所以调用的是 obj.valueOf

// 学习自检
// const obj = {}
// const objA = { propertyA: 'A' },
//   objB = { propertyB: 'B' }
// obj[objA] = 'objectA'
// obj[objB] = 'objectB'

// /**
//  * 考察点：
//  *  + 对象的属性key只能是 string
//  *  + 隐式类型转换：objA 和 objB 转换为原始值都是字符串 '[object Object]'
//  */
// for (let [k, v] of Object.entries(obj)) {
//   console.log('k:', k, ', v:', v) // k: [object, Object], v: objectB
// }

// 加点难度
// const obj = {}
// const objA = {
//     propertyA: 'A',
//     toString() {
//       return 'objA'
//     },
//   },
//   objB = {
//     propertyB: 'B',
//     valueOf() {
//       return 'objB'
//     },
//   }
// obj[objA] = 'objectA'
// obj[objB] = 'objectB'

// /**
//  * 考察点：
//  *  + 对象的属性key只能是 string
//  *  + 隐式类型转换：
//  *    - objA 转换为原始值是字符串 'objA'
//  *    - objB 转换为原始值是字符串 '[object Object]'，这里很容易错误的认为是 'objB'，当期望是 string 时，如果私有属性没有 toString 方法，会去找原型上的 toString 方法，而不是去找私有的 valueOf 方法
//  */
// for (let [k, v] of Object.entries(obj)) {
//   console.log('k:', k, ', v:', v) // k: [object Object] , v: objectB ; k: [object, Object], v: objectB
// }
