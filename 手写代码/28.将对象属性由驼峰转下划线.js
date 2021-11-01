const obj = { aB: 1, aG: [ 1, 2, 3, {aN: 4} ], aH: { bL: 2, bM: [ 4, 5, 6 ] } }

function transform (obj) {
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(item => transform(item))
  }
  let newObj = {}
  Object.keys(obj).forEach(key => {
    const newKey = key.replace(/([A-Z])/g, res => {
      res = res[0].toLowerCase()
      res = `_${res}`
      return res
    })
    newObj[newKey] = transform(obj[key])
  })
  return newObj
}

console.log(transform(obj))