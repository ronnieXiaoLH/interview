// 题目描述:实现一个 add 方法 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10

function add (...params) {
  const proxy = (...args) => {
    params = params.concat(args)
    return proxy
  }

  proxy.toString = () => params.reduce((prev, next) => prev + next)
  return proxy
}

/* function add (...params) {
  const proxy = add.bind(null, ...params)

  proxy.toString = () => params.reduce((prev, next) => prev + next, 0)
  return proxy
} */

alert(add(1)(2)(3))
alert(add(1,2,3)(4))

alert(add(1)(2)(3)())
alert(add(1,2,3)(4)())