/**
 * 发布订阅设计模式(观察者模式的升级版)
 *  + 发布一个计划，并且向计划中订阅一个个方法
 *  + 当触发某个事件或者达到了某个阶段，我们可以通过计划中订阅的方法按照顺序执行
 */

 class EventEmitte {
  constructor () {
    this.events = {}
  }

  on (type, cb) {
    this.events[type] = this.events[type] || []
    this.events[type].push(cb)
  }

  emit (type) {
    this.events[type] && this.events[type].forEach(cb => {
      cb()
    })
  }

  off (type, cb) {
    this.events[type] = this.events[type] || []
    this.events[type] = this.events[type].filter(item => item !== cb)
  }

  once (type, cb) {
    let _this = this
    function proxy () {
      cb()
      _this.off(type, proxy)
    }
    this.on(type, proxy)
  }
}

function event1 () {
  console.log('event1')
}

function event2 () {
  console.log('event2')
}

const vm = new EventEmitte()
vm.on('event1', event1)
vm.once('event2', event2)
vm.emit('event1')
vm.emit('event2')
// vm.off('event2', event2)
vm.emit('event2')