class MyPromise {
  constructor (executor) {
    this.state = 'pending'
    this.result = undefined
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      
    }
    this.onFulfilledQueue = []
    this.onRejectedQueue = []
    this.finallyQueue = []
  }

  resolve (val) {
    const observer = new MutationObserver(() => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.result = val
      let handler
      while (handler = this.onFulfilledQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this.result)
        }
      }
      this._finally()
    })

    observer.observe(document.body, {
      attributes: true
    })

    document.body.setAttribute('promise-resolve', Date.now())
  }

  reject (val) {
    const observer = new MutationObserver(() => {
      if (this.state !== 'pending') return
      this.state = 'onRejected'
      this.result = val
      let handler
      while (handler = this.onRejectedQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this.result)
        }
      }
      this._finally()
    })

    observer.observe(document.body, {
      attributes: true
    })

    document.body.setAttribute('promise-reject', Date.now())
  }

  then (onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      function onNewFulfilled (val) {
        if (typeof onFulfilled !== 'function') {
          resolve(val)
        }
        try {
          const result = onFulfilled(val)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      function onNewRejected (val) {
        if (typeof onRejected !== 'function') {
          reject(val)
        }
        try {
          const result = onRejected(val)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            reject(result)
          }
        } catch (error) {
          reject(error)
        }
      }
      switch (this.state) {
        case 'pending':
          this.onFulfilledQueue.push(onNewFulfilled)
          this.onRejectedQueue.push(onNewRejected)
          break;
      
        default:
          break;
      }
    })

  }

  catch (onReject) {
    return new MyPromise((resolve, reject) => {
      this.then(null, onReject)
    })
  }

  _finally () {
    let handler
    while (handler = this.finallyQueue.shift()) {
      if (typeof handler === 'function') {
        handler()
      }
    }
  }

  finally (callback) {
    this.finallyQueue.push(callback)
    return this
  }

  static resolve (val) {
    if (val instanceof MyPromise) return val
    return new MyPromise((resolve) => {
      resolve(val)
    })
  }

  static reject (val) {
    if (val instanceof MyPromise) return val
    return new MyPromise((_, reject) => {
      reject(val)
    })
  }

  static all (promises) {
    return new MyPromise((resolve, reject) => {
      const result = []
      let count = 0
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          result[i] = res
          count++
          if (count === promises.length) {
            resolve(result)
          }
        }, err => {
          reject(err)
        })
      }
    })
  }

  static race (promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

  static allSettled (promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      const result = []
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          result[i] = {
            status: 'fulfilled',
            value: res
          }
          count++
          if (count === promises.length) resolve(result)
        }, err => {
          result[i] = {
            status: 'rejected',
            reason: err
          }
          count++
          if (count === promises.length) resolve(result)
        })
      }
    })
  }

  static any (promises) {
    return new MyPromise((resolve, reject) => {
      let count = 0
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          resolve(res)
        }, err => {
          count++
          if (count === promises.length) {
            reject('AggregateError: All promises were rejected')
          }
        })
      }
    })
  }

  // get [Symbol.toStringTag] () {
  //   return 'MyPromise'
  // }

}
MyPromise.prototype[Symbol.toStringTag] = 'MyPromise'

// const p = new Promise((resolve, reject) => {
//   resolve('ok')
//   // reject('no')
// }).then(res => {
//   console.log(res)
//   return new Promise((resolve, reject) => {
//     reject('no')
//   })
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   return 'ok-2'
// }).then(res => {
//   console.log(res)
// })
// const p = new  Promise((resolve, reject) => {
//   // resolve('ok')
//   reject('no')
// })
// p.then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
// console.log(p)

// const p2 = new MyPromise((resolve, reject) => {
//   resolve('ok')
//   // reject('no')
// })
// p2.then(res => {
//   console.log('res', res)
//   return new MyPromise((resolve, reject) => {
//     reject('no')
//   })
// }).then(res => {
//   console.log(res)
//   return 'ok-2'
// }, err => {
//   console.log('err', err)
// }).then(res => {
//   console.log(res)
// })

// const p2 = new  MyPromise((resolve, reject) => {
//   // resolve('ok')
//   reject('no')
// })
// p2.then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })
// console.log(p2)
// console.log(p2)

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok-1')
//   }, 1000)
// })
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-2')
//     reject('no-2')
//   }, 2000)
// })
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('ok-3')
//   }, 3000)
// })
// Promise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-1')
//     reject('no-1')
//   }, 1000)
// })
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-2')
//     reject('no-2')
//   }, 2000)
// })
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-3')
//     reject('no-3')
//   }, 3000)
// })
// Promise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// Promise.any([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// const p4 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-1')
//     reject('no-1')
//   }, 1000)
// })
// const p5 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-2')
//     reject('no-2')
//   }, 2000)
// })
// const p6 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('ok-3')
//     reject('no-3')
//   }, 3000)
// })
// // MyPromise.all([p1, p2, p3]).then(res => {
// //   console.log(res)
// // }, err => {
// //   console.log(err)
// // })
// MyPromise.race([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// MyPromise.any([p4, p5, p6]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
}).then(res => {
  console.log(res)
}).finally(() => {
  console.log('finally')
}).finally(() => {
  console.log('finally-2')
})
console.log(p)

let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
}).then(res => {
  console.log(res)
}).finally(() => {
  console.log('finally')
}).finally(() => {
  console.log('finally-2')
})
console.log(p2)
console.log('start------------------')