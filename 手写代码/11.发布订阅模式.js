class EventEmitter {
  constructor () {
    this.callbacks = {}
  }

  on (eventType, callback) {
    this.callbacks[eventType] = this.callbacks[eventType] || []
    this.callbacks[eventType].push(callback)
  }

  emit (eventType) {
    this.callbacks[eventType].forEach(cb => {
      if (typeof cb === 'function') {
        // 使用 try catch 的目的是，如果某个 cb 执行报错，不影响其他 cb 的执行
        try {
          cb()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  once (eventType, callback) {
    // let _this = this
    // function proxy () {
    //   callback()
    //   _this.off(eventType, proxy)
    // }
    const proxy = () => {
      callback()
      this.off(eventType, proxy)
    }
    this.on(eventType, proxy)
  }

  off (eventType, callback) {
    if (!this.callbacks[eventType]) return
    this.callbacks[eventType] = this.callbacks[eventType].filter(cb => cb !== callback)
  }
}

const vm = new EventEmitter()

function event1 () {
  console.log('event1')
}

function event1_1 () {
  console.log(a.b)
  console.log('event1_1')
}

// vm.on('event1', event1)
vm.once('event1', event1_1)
vm.once('event1', event1)

vm.emit('event1')
// vm.emit('event1')