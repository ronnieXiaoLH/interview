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
