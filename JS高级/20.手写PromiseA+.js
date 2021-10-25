class MyPromise {
  constructor (executor) {
    this['[[PromiseState]]'] = 'pending'
    this['[[PromiseResult]]'] = undefined
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver undefined is not a function')
    }
    // 这里只是粗暴的对 executor 执行报错，直接就把 Promise 的状态置为 rejected，但是浏览器的Promise会判断报错是在resolve之前还是之后，如果是resolve之后报错是不影响的，因为调用resolve，Promise 的状态已经改变
    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }

    this.onFulfilledQueue = []
    this.onRejectedQueue = []
    this.finallyQueue = []
  }

  resolve (val) {
    let observer = new MutationObserver(() => {
      if (this['[[PromiseState]]'] !== 'pending') return
      this['[[PromiseState]]'] = 'fulfilled'
      this['[[PromiseResult]]'] = val

      let handler
      while (handler = this.onFulfilledQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this['[[PromiseResult]]'])
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
    let observer = new MutationObserver(() => {
      if (this['[[PromiseState]]'] !== 'pending') return
      this['[[PromiseState]]'] = 'rejected'
      this['[[PromiseResult]]'] = val

      let handler
      while (handler = this.onRejectedQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this['[[PromiseResult]]'])
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
      function newOnFulfilled (val) {
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

      function newOnRejected (val) {
        if (typeof onRejected !== 'function') {
          reject(val)
        }
        try {
          const result = onRejected(val)
          if (result instanceof MyPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (error) {
          reject(error)
        }
      }

      switch (this['[[PromiseState]]']) {
        case 'pending': 
          this.onFulfilledQueue.push(newOnFulfilled)
          this.onRejectedQueue.push(newOnRejected)
          break;
        case 'fulfilled':
          onFulfilled(this['[[PromiseResult]]'])
          break;
        case 'rejected':
          onRejected(this['[[PromiseResult]]'])
          break;
        default:
      }
    })
  }

  catch (onRejected) {
    this.then(null, onRejected)
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
    if (val instanceof MyPromise) {
      return val
    }
    return new MyPromise((resolve) => {
      resolve(val)
    })
  }

  static reject (val) {
    if (val instanceof MyPromise) {
      return val
    }
    return new MyPromise((_, reject) => {
      reject(val)
    })
  }

  static all (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`${promises} must be a array`)
    }
    return new MyPromise((resolve, reject) => {
      const len = promises.length
      let result = []
      let count = 0
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          result[i] = res
          count++
          if (count === len) {
            resolve(result)
          }
        }, err => {
          reject(err)
        })
      }
    })
  }

  static race (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`${promises} must be a array`)
    }
    return new MyPromise((resolve, reject) => {
      const len = promises.length
      for (let i = 0; i < len; i++) {
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
}

MyPromise.prototype[Symbol.toStringTag] = 'Promise'

/* let p = new MyPromise((resolve, reject) => {
  // resolve('ok')
  // setTimeout(() => {
  //   resolve('ok')
  // }, 1000)
  // reject('no')
  console.log(a.b)
})
p.then(res => {
  console.log(res + '1')
}, err => {
  console.log(err)
})
p.then(res => {
  console.log(res + '2')
}, err => {
  console.log(err)
})
console.log(p) */

// let p = new MyPromise((resolve, reject) => {
//   resolve('ok')
// })
// p.then(res => {
//   console.log(res)
//   return new MyPromise((resolve, reject) => {
//     console.log(a)
//     resolve(200)
//   })
// }, err => {
//   console.log(err)
// }).then(null, err => {
//   console.log(err)
// })
// .then(res => {
//   console.log(res)
// })
// console.log(p)

// let p2 = new Promise((resolve, reject) => {
//   console.log(a)
//   // resolve('ok')
// })
// p2.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// p2.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
// console.log(p2)

// let p2 = new Promise((resolve, reject) => {
//   console.log(a)
//   // resolve('ok')
// })
// p2.then(res => {
//   console.log(res)
//   // return new Promise((resolve, reject) => {
//   //   resolve(200)
//   // })
// }, err => {
//   console.log(err)
// })
// .then(res => {
//   console.log(res)
// })

// console.log('1')

// MyPromise.resolve(100).then(res => {
//   console.log(res)
// })

// MyPromise.reject('err').then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// let p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100)
//     // reject('err 100')
//   }, 1000)
// })
// let p2 = new MyPromise((resolve, reject) => {
//   // console.log(a)
//   setTimeout(() => {
//     // resolve(200)
//     // console.log(a)
//     reject('err 200')
//   }, 2000)
// })
// let p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(300)
//   }, 3000)
// })
// MyPromise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// MyPromise.race([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

/* let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  console.log(a)
  // setTimeout(() => {
  //   // resolve(200)
  //   console.log(a)
  //   // reject('err 200')
  // }, 2000)
})
// p2.then(res => {}, err => {})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(300)
  }, 3000)
})
Promise.all([p1, p2, p3]).then(res => {
  console.log(res)
}, err => {
  console.log(err)
}) */

// let p = new MyPromise((resolve, reject) => {
//   reject('no')
// })

// p.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   return new MyPromise((resolve, reject) => reject('no2'))
//   // return new MyPromise((resolve, reject) => resolve('ok'))
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   console.log(a)
// }).catch(err => {
//   console.log(err)
// })

// let p2 = new Promise((resolve, reject) => {
//   reject('no')
// })

// p2.then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   return new Promise((resolve, reject) => reject('ok'))
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   // console.log(a)
// }).catch(err => {
//   console.log('catch', err)
// })

// const p = new MyPromise((resolve, reject) => {
//   console.log(a)
//   resolve('ok')
// })
// p.then(res => {
//   console.log(res)
// })
// .catch(err => {
//   console.log('catch', err)
// })

const p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('1000')
  }, 1000)
})
const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('2000')
    reject('err 2000')
  }, 2000)
})
const p3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('3000')
  }, 3000)
})
// MyPromise.all([p1, p2, p3]).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
MyPromise.race([p1, p2, p3]).then(res => {
  console.log(res)
}, err => {
  console.log(err)
})