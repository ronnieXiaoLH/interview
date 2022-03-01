// 常规属性
let obj = {}
obj['p1'] = 'p1'
obj['p3'] = 'p3'
obj['p2'] = 'p2'

for (let key in obj) {
  console.log(key)
}

/**
 * 排序属性: 属性键值为数字的属性(数字字符串属性也是排序属性)
 *  特性：按照索引值大小升序排序
 */
let obj2 = {}
obj2[1] = 1
obj2[3] = 3
obj2[2] = 2

for (let key in obj2) {
  console.log(key)
}

/**
 * 思考：为什么设计常规属性和排序属性?
 *  - 提升属性的访问速度
 *  - 两种线性数据结构保存 (线性属性保存在 elements 中，普通属性保存在 properties 中)，属性访问的时候是先在 elements 中查找，然后再在 properties 中查找
 * 疑问：访问普通属性，总是先去 elements 中找不是白白多耗费性能吗?
 *  为此 v8 设置了内置属性，在普通属性小于 10 个的时候，是直接挂在对象上面，这就是内置属性；在属性大于 10 个的时候，前 10 个是直接挂在对象上面，超出 10 个的这些属性是挂在 properties 上面的
 */
