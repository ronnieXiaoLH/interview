// 1. 不可扩展
const obj = {
  a: 1
}
// 默认情况下，对象是可以扩展的
console.log(Object.isExtensible(obj)) // true

// Object.preventExtensions(), Object.seal(), Object.freeze() 都可以标记一个对象为不可扩展的对象，都是浅层控制，属性值是引用类型的，还是可以修改的

// Object.preventExtensions()，对象永远不能在添加新的属性，但是原有的属性的值还是可以改变，且原有的属性可以被删除
const empty = {a:1}
Object.preventExtensions(empty)
console.log(Object.isExtensible(empty))
// empty.a = 2
delete empty.a
console.log(empty)

// Object.seal()，阻止添加新的属性，并将所有现有属性标记为不可配置。已有属性的值原来可写，现在还是可以改变，但是属性不能被删除
const sealed = {a:1}
Object.seal(sealed)
// sealed.a = 2
delete sealed.a
console.log(Object.isExtensible(sealed))
console.log(sealed)

// Object.freeze()，冻结一个对象，对象不在能新增删除属性，已有属性的可配置性，可枚举性，可写性以及属性的值都不可以改变
const frozen = {a:1,b:[1,2]}
Object.freeze(frozen)
frozen.a = 2
// delete frozen.a
frozen.b.push(3)
console.log(Object.isExtensible(frozen))
console.log(frozen)
