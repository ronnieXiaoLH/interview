## 01. 你能说说ES6有哪些内容吗？

- let、const
- 模板字符串
- 解构赋值
- 扩展运算符
- 字符串的扩展方法(includes, startsWith, endsWith, padStart, padEnd, repeat, replaceAll, trimStart, trimEnd...)
- 数组的扩展方法(includes, isArray, from, fill, find, findIndex...)
- 箭头函数
- 函数的rest参数，函数参数的默认值
- Symbol
- Reflect
- Proxy
- Promise
- Generator
- Map
- WeakMap
- Set
- WeakSet
- class
- import & export
- ...

### Symbol

- Symbol 除了表示独一无二的值
- 还具有元编程的能力，比如我们手写 Promise 的时候，如果不定义 Symbol.toStringTag 为 Symbol，那么通过 Object.prototype.toString.call 得到的结果就是 [object Object]
- 还可以用于判断某对象是否为某构造器的实例 Symbol.hasInstance，很多人手写 instanceof 的时候都是通过 __proto__ 的方式，这在 ES5 是没问题的，然而在 ES6 是通过 Symbol.hasInstance

### Reflect

Reflect 将对象的操作集中起来，可以通过 Reflect. 的方式来使用，比如：
- Reflect.ownKeys 可以获取对象的普通属性和Symbol类型的属性，如果不使用 Reflect.ownKeys() ，就要使用 Object.keys() 和 Object.getOwnPropertySymbols 将获取到的普通类型的属性和 Symbol 类型的属性拼接起来
- Reflect.has 可以判断一个对象是否存在某个属性，如果不用 Reflect.has 就要使用 key in object

## 02. 箭头函数和普通函数有什么区别呢？

1. 箭头函数没有自己独立的作用域，即它的 this 指向它定义时的作用域
2. 箭头函数没有 prototype 属性
3. 箭头函数没有 arguments 和 caller
4. 箭头函数不能作为构造函数

## 03. Map 和 WeakMap (Set 和 WeakSet) 的区别？

- WeakMap 的 key 只能是对象
- WeakMap 没有 size 属性，没有 clear 方法，不支持遍历
- WeakMap 是弱引用

## 04. 各种模块化规范的细节

- CommonJs

  CommonJS 主要是 Node.js 使用，通过 require `同步加载`模块，exports 导出内容。在 CommonJS 规范下，每一个 JS 文件都是独立的模块，每个模块都有独立的作用域，模块里的本地变量都是私有的

- AMD(Asynchronous Module Definition)

  AMD，即异步模块定义。AMD定义了一套JavaScript模块依赖异步加载标准，用来解决浏览器端模块加载的问题。AMD主要是浏览器端使用，通过 define 定义模块和依赖，require 异步加载模块，推崇依赖前置

- CMD(Common Module Definition)

  CMD，即通用模块定义。CMD定义了一套JavaScript模块依赖异步加载标准，用来解决浏览器端模块架子啊的问题。CMD主要是浏览器端使用，通过 define 定义模块和依赖，require 异步加载模块，推崇依赖就近

- UMD(Universal Module Definition)

  UMD，即通用模块定义。UMD主要为了解决 CommonJS 和 AMD 规范下的代码不通用的问题，同时还支持将模块挂载到全局，是跨平台的解决方案

- ESM(ECMAScript Module)

  ESM，即ESModule。官方模块化规范，现代浏览器支持，通过 import 加载模块，export 导出内容