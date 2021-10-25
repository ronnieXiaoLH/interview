function transform (obj) {
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    return obj.map(item => transform(item))
  }
  let newObj = {}
  Object.keys(obj).forEach(key => {
    const newKey = key.replace(/_([a-z])/g, res => res[1].toUpperCase())
    newObj[newKey] = transform(obj[key])
  })
  return newObj
}

const obj = {
  a_b: 1,
  a_g: [1, 2, 3],
  a_h: {
    b_l: 2,
    b_m: [4, 5, 6]
  }
}

console.log(transform(obj))