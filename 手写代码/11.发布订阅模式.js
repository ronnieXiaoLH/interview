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
      cb()
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

// vm.on('event1', event1)
vm.once('event1', event1)

vm.emit('event1')
vm.emit('event1')