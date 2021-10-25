/* async function async1 () {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2 () {
  console.log('async2')
  // 这里相当于 return Promise.resolve(undefined)
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise(resolve => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

console.log('script end')
// 'script start'
// 'async1 start' 
// 'async2' 
// 'promise1' 
// 'script end'  
// 'async2' 
// 'async1 end' 
// 'promise2' 
// 'setTimeout'  */

/* // 事件绑定属于异步宏任务
let body = document.body
body.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log(1)
  })
  console.log(2)
})
body.addEventListener('click', () => {
  Promise.resolve().then(() => {
    console.log(3)
  })
  console.log(4)
})
// 2 1 4 3 */

/* console.log('start')
let task
Promise.resolve().then(() => {
  console.log('p1')
}).then(() => {
  console.log('p2')
})

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('p3')
  }).then(() => {
    console.log('p4')
  })
  task = setInterval(() => {
    console.log('setInterval')
  }, 3000)
  console.log('timeout')
}, 0)
// 'start'
// 'p1'
// 'p2'
// 'timeout'
// 'p3'
// 'p4'
// 'setInterval' */

function fun1() {
  console.log('fun1 start')
  return new Promise(resolve => {
    resolve('ok')
  })
}
function fun2() {
  console.log('fun2 start')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('ok')
    }, 10)
  })
}
console.log(1)
setTimeout(async () => {
  console.log(2)
  await fun1()
  console.log(3)
}, 20)
for (let i = 0; i < 90000000; i++) {} // 大约耗时 100ms
console.log(4)
fun1().then(() => {
  console.log(5)
})
fun2().then(() => {
  console.log(6)
})
setTimeout(() => {
  console.log(7)
}, 0)
console.log(8)
// 未加 for 循环
// 1
// 4
// 'fun1 start'
// 'fun2 start'
// 8
// 5
// 7
// 6
// 2
// 'fun1 start'
// 3

// 加了 for 循环
// 1
// 4
// 'fun1 start'
// 'fun2 start'
// 8
// 5
// 2
// 'fun1 start'
// 3
// 7
// 6