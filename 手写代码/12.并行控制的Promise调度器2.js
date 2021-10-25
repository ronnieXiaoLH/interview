function fn (delay) {
  return new Promise((resolve) => {
    console.log(`${delay} is start`)
    setTimeout(() => {
      resolve(delay)
      console.log(`${delay} is end`)
    }, delay)
  })
}

const tasks = [
  () => fn(1001),
  () => fn(3003),
  () => fn(5005),
  () => fn(4004),
  () => fn(2002),
  () => fn(6006),
]

function createTasks (tasks, limit, callback) {
  let results = []
  const sequence = [].concat(tasks)

  promises = sequence.splice(0, limit).map((task, index) => {
    return task().then((result) => {
      results.push(result)
      return index
    })
  })

  let p = Promise.race(promises)

  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      promises[res] = sequence[i]().then((result) => {
        results.push(result)
        if (i === sequence.length - 1) {
          callback(results)
        }
        return res
      })
      return Promise.race(promises)
    })
  }
}

/* function createTasks (tasks, limit, callback) {
  if (typeof callback !== 'function') return

  class TaskQueue {
    constructor () {
      this.queue = []
      this.running = 0
      this.results = []
    }

    addTask (task) {
      this.queue.push(task)
      this.next()
    }

    next () {
      while (this.running < limit && this.queue.length) {
        this.running++
        const task = this.queue.shift()
        task().then(res => {
          this.results.push(res)
        }).finally(() => {
          this.running--
          this.next()
        })
      }
      if (this.running === 0 && !this.queue.length) {
        callback(this.results)
      }
    }
  }

  const tq = new TaskQueue()

  tasks.forEach(task => {
    tq.addTask(task)
  })
} */

createTasks(tasks, 2, (res) => {
  console.log(res)
})