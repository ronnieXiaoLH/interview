function currying (fn, ...args) {
  return function (...params) {
    return fn.apply(null, args.concat(params))
  }
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
const b = currying(a, 2)
console.log(b(3))

let res = currying(add, 1, 2)
console.log(res)