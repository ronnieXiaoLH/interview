const urls = [
  {
    info: 'link1',
    time: 3000
  },
  {
    info: 'link2',
    time: 1000
  },
  {
    info: 'link3',
    time: 5000
  },
  {
    info: 'link4',
    time: 2000
  },
  {
    info: 'link5',
    time: 500
  },
  {
    info: 'link6',
    time: 800
  },
  {
    info: 'link7',
    time: 1200
  },
  {
    info: 'link8',
    time: 2500
  }
]

// 设置我们要执行的函数
function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log('------' + url.info + ' start!')
    setTimeout(() => {
      console.log(url.info + ' OK!!!')
      resolve(url.info)
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)

function limitLoad(urls, handler, limit) {
  // 拷贝数据
  const sequence = [].concat(urls)

  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index
    })
  })
  
  let p = Promise.race(promises)

  for (let i = 0; i < sequence.length; i++) {
    p = p.then(res => {
      // 这里的 res 是最先改变状态的 promise 的下标
      // 然后往 promises 数组里下标 res 再补一个 promise 任务
      promises[res] = handler(sequence[i]).then(res => {
        return res
      })
      return Promise.race(promises)
    })
  }
}