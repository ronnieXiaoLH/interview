const TestObject = require('./testObject.js')

function PrototypeProxy() {
  function _invoke(obj, method, args) {
    const startTime = new Date()
    const result = Reflect.apply(method, obj, args)
    const endTime = new Date()
    console.log(
      `简单代理-cost: ${method.name}`,
      startTime,
      endTime,
      endTime - startTime
    )
    return result
  }

  const originSum = TestObject.prototype.sum
  TestObject.prototype.sum = function () {
    return _invoke(this, originSum, arguments)
  }

  const originUnique = TestObject.prototype.unique
  TestObject.prototype.unique = function () {
    return _invoke(this, originUnique, arguments)
  }

  const originRandom = TestObject.prototype.random
  TestObject.prototype.random = function () {
    return _invoke(this, originRandom, arguments)
  }

  return new TestObject(...arguments)
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
const proxyTestObject = new PrototypeProxy()

const result = proxyTestObject.random(10, 1000)
console.log('random:', result)
const sumValue = proxyTestObject.sum(sumArr)
console.log('sum:', sumValue)
const uniqueValue = proxyTestObject.unique('id', ...uniqueArr)
console.log('unique:', uniqueValue.length)
