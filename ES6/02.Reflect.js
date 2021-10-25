// Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法

// Reflect 将对象的操作集中起来，可以通过 Reflect. 的方式来使用

// 01. Reflect.ownKeys 可以获取到对象普通属性和Symbol类型的属性
let obj = {
  a: 1,
  [Symbol('b')]: 2
}
Reflect.ownKeys(obj).forEach(key => {
  console.log(key, obj[key])
})

// 02. Reflect.has 判断一个对象是否存在某个属性，和 in 运算符 的功能完全相同(for in 会遍历原型链)
Object.prototype.x = 'x'
for (let key in obj) {
  console.log(key)
}
console.log('a' in obj, 'x' in obj)
console.log(Reflect.has(obj, 'a'), Reflect.has(obj, 'x'))