function createPromise(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay)
    }, delay)
  })
}

;(async function () {
  const p1 = createPromise(1000)
  const p2 = createPromise(2000)
  const p3 = createPromise(3000)

  const list = [p1, p2, p3]

  for await (const res of list) {
    console.log(res)
  }
})()
