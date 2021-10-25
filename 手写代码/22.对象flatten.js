const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3,
  d: [2, 4, [6, 8]]
 }
 
//  flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }

const isObject = obj => typeof obj === 'object' && obj !== null

// let newObj = {}

/* function flatten (obj, parentKey) {
  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) {
      if (Array.isArray(obj[key])) {
        let _parentKey = parentKey ? `${parentKey}[${key}]` : key
        flatten(obj[key], _parentKey)
      } else {
        let _parentKey
        if (parentKey) {
          if (Array.isArray(obj)) {
            _parentKey = `${parentKey}[${key}]`
          } else {
            _parentKey = `${parentKey}.${key}`
          }
        } else {
          _parentKey = key
        }
        flatten(obj[key], _parentKey)
      }
    } else {
      if (parentKey) {
        if (Array.isArray(obj)) {
          newObj[`${parentKey}[${key}]`] = obj[key]
        } else {
          newObj[`${parentKey}.${key}`] = obj[key]
        }
      } else {
        newObj[key] = obj[key]
      }
    }
  })
  return newObj
} */

console.log(flatten(obj))