const TestObject = require('./testObject')

const methods = ['sum', 'unique', 'random']
methods.forEach((name) => {
  const method = TestObject.prototype[name]
  Object.defineProperty(TestObject.prototype, name, {
    value() {
      const startTime = Date.now()
      // const result = method.apply(this, arguments)
      const result = Reflect.apply(method, this, arguments)
      const endTime = Date.now()
      console.log(
        'defineProperty cost:',
        name,
        startTime,
        endTime,
        endTime - startTime
      )
      return result
    },
  })
})

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

const proxyTestObject = new TestObject()

const result = proxyTestObject.random(10, 1000)
console.log('random:', result)
const sumValue = proxyTestObject.sum(sumArr)
console.log('sum:', sumValue)
const uniqueValue = proxyTestObject.unique('id', ...uniqueArr)
console.log('unique:', uniqueValue.length)
