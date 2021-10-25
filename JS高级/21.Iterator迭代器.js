class Iterator {
  constructor (assemable) {
    this.assemable = assemable
    this.cursor = 0
  }

  next () {
    if (this.cursor === this.assemable.length) {
      return {
        value: this.assemable[this.cursor++],
        done: true
      }
    }
    return {
      value: this.assemable[this.cursor++],
      done: false
    }
  }

  // get [Symbol.iterator] () {
  //   return () => {
  //     return this
  //   }
  // }
}

Iterator.prototype[Symbol.iterator] = function () {
  return this
}

/**
 * Symbol.iterator 是一个函数，返回一个对象，对象必须含有一个 next 方法
 */

/**
 * 拥有 Symbol.iterator 属性的数据结构(值)，被称为可被遍历的，可以基于 for of 循环处理
 * + 数组
 * + 部分类数组：arguments/NodeList/HTMLCollection
 * + String
 * + Set
 * + Map
 * + generator object
 * + ...
 */

let arr = [10, 20, 30, 40]
for (let item of arr) {
  console.log(item)
}

const iter = new Iterator(arr)
for (let item of iter) {
  console.log(item)
}