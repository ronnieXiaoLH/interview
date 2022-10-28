const TestObject = require('./testObject')

function ProxyTestObject() {
  const proxy = new Proxy(TestObject.prototype, {
    get(target, key) {
      const method = target[key]
      if (typeof method !== 'function') return method

      return function () {
        const startTime = Date.now()
        const result = method.apply(this, arguments)
        const endTime = Date.now()
        console.log(
          `标准代理-cost: ${key}`,
          startTime,
          endTime,
          endTime - startTime
        )
        return result
      }
    },
  })
  return proxy
}

const sumArr = Array.from({ length: 99999 }, (_, i) => i)

const baseArr = Array.from({ length: 99999 }, (_, i) => ({
  id: i,
}))

const uniqueArr = [
  baseArr,
  [
    {
      id: 11,
    },
    {
      id: 12,
    },
  ],
  baseArr,
  [
    {
      id: -14,
    },
  ],
  baseArr,
]

// 初始化
const proxyTestObject = new ProxyTestObject()

const result = proxyTestObject.random(10, 1000)
console.log('random:', result)
const sumValue = proxyTestObject.sum(sumArr)
console.log('sum:', sumValue)
const uniqueValue = proxyTestObject.unique('id', ...uniqueArr)
console.log('unique:', uniqueValue.length)
