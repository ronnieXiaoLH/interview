/* function instance_of (instance, classFn) {
  let instanceProto = Object.getPrototypeOf(instance)
  let classFnPrototype = classFn.prototype
  while (instanceProto) {
    if (instanceProto === classFnPrototype) {
      return true
    }
    instanceProto = Object.getPrototypeOf(instanceProto)
  }
  return false
}

console.log(instance_of([], Array))
console.log(instance_of([], Object))
console.log(instance_of([], Date))*/

/* Array.prototype._forEach = function (callback, context) {
  context = context ? context : window
  console.log(context)
  const len = this.length
  for (let i = 0; i < len; i++) {
    callback.call(context, this[i], i)
  }
}

const arr = [2, 4, 6]

arr._forEach(function (item, index) {
  console.log(item, index, this)
}, {a : 1})

arr.forEach(function (item, index) {
  console.log(item, index, this)
}, {a : 1}) */

/* Function.prototype._call = function (context, ...args) {
  context = context ? context : window
  if (typeof context !== 'object' || typeof context !== 'function') {
    context = Object(context)
  }
  const key = Symbol('key')
  context[key] = this
  const res = context[key](...args)
  delete context[key]
  return res
}

Function.prototype._bind = function (context, ...args) {
  context = context ? context : window
  let fn = this
  return function (...params) {
    const res = fn.call(context, ...args, ...params)
    return res
  }
}

function sum (a, b, c) {
  console.log(this)
  return a + b + c
}

const obj = { name: 'test obj' }
console.log(sum._call(obj, 1, 2, 3))

const resFn = sum._bind(obj, 1, 2)
console.log(resFn(30)) */

/* function _new () {
  // const obj = new Object()
  const classFn = Array.prototype.shift.call(arguments)
  // obj.__proto__ = classFn.prototype
  const obj = Object.create(classFn.prototype)
  const res = classFn.call(obj, ...arguments)
  return typeof res === 'function' || (typeof res === 'object' && res !== null) ? res : obj
}

function Person (name, age) {
  this.name = name
  this.age = age
}

const p = _new(Person, 'xiaoming', 10)
console.log(p)
console.log(p instanceof Person) */

// const arr = [
//   1,
//   [2, 3],
//   [4, [5, 6]]
// ]

/* function flatten (arr) {
  return arr.toString().split(',').map(item => Number(item))
} */

// function flatten (arr) {
//   return JSON.stringify(arr).replace(/(\[|\])/g, '').split(',').map(item => Number(item))
// }

// function flatten (arr) {
//   let res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       res = res.concat(flatten(arr[i]))
//     } else {
//       res = res.concat(arr[i])
//     }
//   }
//   return res
// }

// function flatten (arr) {
//   return arr.reduce((prev, next) => {
//     return Array.isArray(next) ? prev.concat(flatten(next)) : prev.concat(next)
//   }, [])
// }

// function flatten (arr) {
//   while (arr.some(item => Array.isArray(item))) {
//     arr = [].concat(...arr)
//   }
//   return arr
// }

/* function * flatten (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      yield * flatten(arr[i])
    } else {
      yield arr[i]
    }
  }
}

console.log([...flatten(arr)]) */

/* function add (n) {
  return ++n
}

function mul (n) {
  return n * 4
}

function div (n) {
  return n / 2
}

function compose (...args) {
  return function (x) {
    if (args.length === 0) return x
    return args.reduce((prev, next) => {
      if (typeof next !== 'function') return prev
      return next(prev)
    }, x)
  }
}

console.log(compose(add, mul, div)(4)) */

/* class EventEmitter {
  constructor () {
    this.events = {}
  }

  on (eventType, fn) {
    this.events[eventType] = this.events[eventType] || []
    this.events[eventType].push(fn)
  }

  once (eventType, fn) {
    const proxy = () => {
      fn()
      this.off(eventType, proxy)
    }
    this.on(eventType, proxy)
  }

  emit (eventType) {
    this.events[eventType] = this.events[eventType] || []
    this.events[eventType].forEach(cb => {
      if (typeof cb === 'function') {
        cb()
      }
    })
  }

  off (eventType, fn) {
    this.events[eventType] = this.events[eventType] || []
    this.events[eventType] = this.events[eventType].filter(cb => cb !== fn)
  }
}

const event = new EventEmitter()

function event1 () {
  console.log('event1')
}
event.once('event1', event1)
// event.off('event1', event1)
// event.on('event1', () => {
//   console.log('event1-1')
// })
console.log(event)
event.emit('event1')
// event.off('event1', event1) */

/* function curring (fn, ...args) {
  return function (...params) {
    args = args.concat(params)
    return fn(...args)
  }
}

function sum (a, b, c, d) {
  return a + b + c + d
}

const fn = curring(sum, 1)
const fn2 = curring(fn, 2)
const fn3 = curring(fn2, 3)
console.log(fn3(4)) */

/* 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper */

/* class _LazyMan {
  constructor (name) {
    const task = () => {
      console.log(`Hi This is ${name}!`)
      this.next()
      return this
    }
    this.queue = [task]
    Promise.resolve().then(() => {
      this.next()
    })
  }

  next () {
    const task = this.queue.shift()
    task && task()
  }

  eat (str) {
    const task = () => {
      console.log(`Eat ${str}~`)
      this.next()
    }
    this.queue.push(task)
    return this
  }

  sleep (delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, delay * 1000)
    }
    this.queue.push(task)
    return this
  }

  sleepFirst (delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, delay * 1000)
    }
    this.queue.unshift(task)
    return this
  }
}

function LazyMan (name) {
  return new _LazyMan(name)
} */

// LazyMan('Hank')
// LazyMan('Hank').sleep(2).eat('dinner')
// LazyMan('Hank').eat('dinner').eat('supper')
// LazyMan('Hank').eat('supper').sleepFirst(2)

/* const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '4.3.4']

function versionSort (arr) {
  return arr.sort((a, b) => {
    const arrA = a.split('.') || []
    const arrB = b.split('.') || []
    const len = Math.min(arrA.length, arrB.length)
    for (let i = 0; i < len; i++) {
      if (arrA[i] !== arrB[i]) {
        return arrB[i] - arrA[i]
      }
    }
    return arrB.length - arrA.length
  })
}

console.log(versionSort(arr)) */

/* function add (...args) {
  const proxy = (...params) => {
    args = args.concat(params)
    return proxy
  }

  proxy.toString = () => args.reduce((prev, next) => prev + next, 0)

  return proxy
} */

/* <div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
} */

/* function DOM2JSON (domTree) {
  let obj = {}
  obj.name = domTree.tagName
  obj.children = []
  domTree.childNodes && domTree.childNodes.forEach(child => {
    obj.children.push(DOM2JSON(child))
  })
  return obj
} */

let arrLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
}

// console.log(Array.from(arrLike))
// // console.log([...arrLike])
// console.log(Array.prototype.slice.call(arrLike))
// console.log(Array.prototype.concat.apply([], arrLike))
// console.log(Array.apply(null, arrLike))

/* function objectIs (a, b) {
  if (a !== a && b !== b) {
    return true
  }
  return a === b && 1 / a === 1 / b
}

console.log(Object.is(NaN, NaN))
console.log(Object.is(+0, -0))
console.log(objectIs(NaN, NaN))
console.log(objectIs(+0, -0))
console.log(objectIs(3, 2))
console.log(objectIs('1', '1')) */

// {
//   tag: 'DIV',
//   attrs:{
//   id:'app'
//   },
//   children: [
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] }
//       ]
//     },
//     {
//       tag: 'SPAN',
//       children: [
//         { tag: 'A', children: [] },
//         { tag: 'A', children: [] }
//       ]
//     }
//   ]
// }
// 把上诉虚拟Dom转化成下方真实Dom
// <div id="app">
//   <span>
//     <a></a>
//   </span>
//   <span>
//     <a></a>
//     <a></a>
//   </span>
// </div>

/* function traverse (obj) {
  const dom = document.createElement(obj.tag)
  obj.attrs && Object.keys(obj.attrs).forEach(key => {
    dom.setAttribute(key, obj.attrs[key])
  })
  obj.children && obj.children.length && obj.children.forEach(child => dom.appendChild(traverse(child)))
  return dom
} */

/* function parse (str) {
  return str.split('&').reduce((prev, next) => {
    const [key, value] = next.split('=')
    if (!value) return prev
    deepSet(prev, key.split(/[\[|\]]/g).filter(v => v), value)
    return prev
  }, {})
}

function deepSet (obj, path, value) {
  let i = 0
  for (; i < path.length - 1; i++) {
    if (obj[path[i]] === undefined) {
      if (path[i + 1].match(/^\d+$/)) {
        obj[path[i]] = []
      } else {
        obj[path[i]] = {}
      }
    }
    obj = obj[path[i]]
  }
  obj[path[i]] = decodeURIComponent(value)
}

const str = 'a=1&b=2&c=3&d=null'
const str2 = 'a&b&c'
const str3 = 'a[name]=fox&a[company]=tencent&b=why'
const str4 = 'color=deep%20blue'
const str5 = 'a[0]=1&a[1]=2'

console.log(parse(str))
console.log(parse(str2))
console.log(parse(str3))
console.log(parse(str4))
console.log(parse(str5)) */

/* function transform (obj) {
  if (typeof obj !== 'object') return obj
  let newObj = {}
  if (Array.isArray(obj)) {
    return obj.map(item => transform(item))
  }
  Object.keys(obj).forEach(key => {
    newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase())
    newObj[newKey] = transform(obj[key])
  })
  return newObj
}

const obj = {
  a_b: 1,
  a_g: [1, 2, 3],
  a_h: {
    b_l: 2,
    b_m: [4, 5, 6]
  }
}

console.log(transform(obj)) */

const urls = [
  {
    info: 'link1',
    time: 3000
  },
  {
    info: 'link2',
    time: 1000
  },
  {
    info: 'link3',
    time: 5000
  },
  {
    info: 'link4',
    time: 2000
  },
  {
    info: 'link5',
    time: 500
  },
  {
    info: 'link6',
    time: 800
  },
  {
    info: 'link7',
    time: 1200
  },
  {
    info: 'link8',
    time: 2500
  }
]

// 设置我们要执行的函数
function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('------' + url.info + ' start!')
    setTimeout(() => {
      console.log(url.info + ' OK!!!')
      resolve(url.info)
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)

function limitLoad(urls, handler, limit) {
  const sequence = [].concat(urls)
  const promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })
  let p = Promise.race(promises)

  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      promises[res] = handler(sequence[i]).then(res => {
        return res
      })
      return Promise.race(promises)
    })
  }
}