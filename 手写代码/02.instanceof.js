// instanceof 就是当前类的原型是否在实例的原型链上

function instance_of (instance, classFunc) {
  let classFuncPrototype = classFunc.prototype
  let instanceProto = Object.getPrototypeOf(instance)
  while (instanceProto) {
    if (instanceProto === classFuncPrototype) {
      return true
    }
    instanceProto = Object.getPrototypeOf(instanceProto)
  }
  return false
}

console.log([] instanceof Array)
console.log([] instanceof Object)
console.log([] instanceof RegExp)

console.log(instance_of([], Array))
console.log(instance_of([], Object))
console.log(instance_of([], RegExp))