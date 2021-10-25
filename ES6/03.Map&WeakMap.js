// Map 引用的对象被置为 null 后，不会被回收掉，WeakMap 引用的对象被置为 null 后，后续会被清空

class MyTest {}
let my = new MyTest()
let map = new Map()
map.set(my, 1)
my = null
console.log(map)

let my2 = new MyTest()
let map2 = new WeakMap()
map2.set(my2, 1)
my2 = null
console.log(map2)