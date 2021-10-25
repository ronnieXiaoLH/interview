class MyPromise {
  constructor (executor) {
    this.state = 'pending'
    this.value = undefined

    this.onFulfilledQueue = []
    this.onRejectedQueue = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve (val) {
    let observer = new MutationObserver(() => {
      if (this.state !== 'pending') return
      this.state = 'fulfilled'
      this.value = val

      let handler
      while (handler = this.onFulfilledQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this.value)
        }
      }
    })
    observer.observe(document.body, {
      attributes: true
    })
    document.body.setAttribute('promise-resolve', Date.now())
  }

  reject (val) {
    let observer = new MutationObserver(() => {
      if (this.state !== 'pending') return
      this.state = 'reject'
      this.value = val

      let handler 
      while (handler = this.onRejectedQueue.shift()) {
        if (typeof handler === 'function') {
          handler(this.value)
        }
      }
    })

    observer.observe(document.body, {
      attributes: true
    })

    document.body.setAttribute('promise-reject', Date.now())
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      function newOnFulfilled (val) {
        if (typeof onFulfilled !== 'function') {
          resolve(val)
        } else {
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
      }

      function newOnRejected (val) {
        if (typeof onRejected !== 'function') {
          reject(val)
        } else {
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
      }

      switch (this.state) {
        case 'pending': 
          this.onFulfilledQueue.push(newOnFulfilled)
          this.onRejectedQueue.push(newOnRejected)
          break;
        case 'fulfilled': 
          newOnFulfilled(this.value)
          break;
        case 'rejected':
          newOnRejected(this.value)
          break;
        default:
      }
    })
  }

  catch(onRejected) {
    this.then(null, onRejected)
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
    return new MyPromise((resolve, reject) => {
      let result = []
      const len = promises.length
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
    return new MyPromise((resolve, reject) => {
      const len = promises.length
      for (let i =0; i < len; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }

}

MyPromise.prototype[Symbol.toStringTag] = 'Promise'

let p = new MyPromise((resolve, reject) => {
  resolve('ok')
  // setTimeout(() => {
  //   resolve('ok')
  // }, 1000)
  // reject('no')
  // console.log(a)
})
// p.then(res => {
//   console.log(res)
//   return new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//       reject('error')
//     }, 1000)
//   })
// }, err => {
//   console.log(err)
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
//   console.log(a)
// })
// .catch(err => {
//   console.log('catch', err)
// })

// MyPromise.resolve('ok').then(res => {
//   console.log(res)
// })
// console.log(1)
// MyPromise.reject('no').then(res => {}, err => {
//   console.log(err)
// })

// let p1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100)
//   }, 1000);
// })
// let p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve(200)
//     reject('no')
//   }, 2000);
// })
// let p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(300)
//   }, 3000);
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