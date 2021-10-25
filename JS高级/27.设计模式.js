/**
 * JS中8大高频设计模式
 *  + Singleton单例模式及Command命令模式
 *  + Constructor构造器及Factory工厂模式
 *  + Observer观察者及Mediator中介者模式
 *  + Publish&Subscribe发布/订阅模式
 *  + Decorator装饰器模式
 */

/**
 * Singleton单例模式 && Command命令模式
 *  + 早期的模块化编程
 *    + AMD
 *    + CMD
 *    + ES6 Module
 *    + ...
 */

// 单例设计模式：基于单独的实例，来管理某一个模块中的内容，实现模块化之间的独立划分，但是也可以实现模块之间方法的相互调用

// 单例模式 + 命令模式
/* let searchModule = (function () {
  let body = document.body
  function queryData () {
    // TODO
  }
  function bindHtml () {
    // TODO
  }
  function handle () {
    // TODO
  }
  return {
    // init相当于是大脑，可以控制函数执行的顺序(这就是命令模式)
    init: function () {
      queryData()
      bindHtml()
      handle()
    }
  }
})()
searchModule.init() */

/* let moduleA = (function () {
  let arr = []
  function push(val) {
    // TODO
    arr.push(val)
    console.log(arr)
  }
  return {
    push
  }
})()
moduleA.push(10)
moduleA.push(20) */
// 如果不想每一次执行 push 方法，都修改使用相同的东西，这样会产生关联和影响

/**
 * Constructor 构造器模式
 *  + 类&实例
 *  + 私有&公有属性
 *  + 插件组件封装
 */

/* class ModuleA {
  constructor () {
    this.arr = []
  }
  push (val) {
    this.arr.push(val)
  }
}
const A1 = new ModuleA()
const A2 = new ModuleA()
console.log(A1 === A2) // false
console.log(A1.arr === A2.arr) // false
console.log(A1.push === A2.push) // true */

/**
 * 工厂模式：工厂可以帮助我们实现调用的切换，或者实现一些中转的处理
 */

/* function factory (options) {
  options = options || {}
  let { type, payload } = options
  if (type === 'array') {
    // 执行A，完成一个逻辑
    return
  }
  // 执行B，完成一个逻辑
} */

/**
 * 观察者模式
 *  + 目标和观察者是一对多的关系
 *  + 每个观察者都应有有一个 update 方法
 *  + 目标可以对观察者进行处理(增删改查)，通知信息
 */

class Observer {
  update () {
    // TODO
    console.log('Observer 接收到信息')
  }
}

class Observer2 {
  update () {
    // TODO
    console.log('Observer2 接收到信息')
  }
}

class Target {
  constructor () {
    this.observerList = []
  }

  add (ob) {
    this.observerList.push(ob)
  }

  remove (ob) {
    this.observerList = this.observerList.filter(item => item !== ob)
  }

  notify () {
    this.observerList.forEach(ob => {
      ob.update()
    })
  }
}

const target = new Target()

const observer1 = new Observer()
const observer2 = new Observer2()

target.add(observer1)
target.add(observer2)

target.notify()