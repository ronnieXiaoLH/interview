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

class _LazyMan {
  constructor (name) {
    this.name = name
    this.queue = []
    this.queue.push(() => {
      console.log(`Hi This is ${name}`)
      this.next()
    })
    setTimeout(() => {
      // 直接通过 while 循环依次取出队列中的任务，无法保证 setTimeout 的执行顺序
      // while (this.queue.length) {
      //   let task = this.queue.shift()
      //   task && task()
      // }
      this.next()
    })
  }

  next () {
    const task = this.queue.shift()
    task && task()
  }

  sleep (delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, 1000 * delay)
    }
    this.queue.push(task)
    return this
  }

  eat (str) {
    const task = () => {
      console.log(`Eat ${str}~`)
      this.next()
    }
    this.queue.push(task)
    return this
  }

  sleepFirst (delay) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`)
        this.next()
      }, 1000 * delay)
    }
    this.queue.unshift(task)
    return this
  }
}

function LazyMan (name) {
  return new _LazyMan(name)
}

// const p = LazyMan('Hank')
const p = LazyMan('Hank').sleep(2).eat('dinner')
// const p = LazyMan('Hank').eat('dinner').eat('supper')
// const p = LazyMan('Hank').eat('supper').sleepFirst(2)
// console.log(p)