function add (n) {
  return ++n
}

function mul (n) {
  return n * 4
}

function div (n) {
  return n / 2
}

function compose (...args) {
  return function (x) {
    if (args.length === 0) return x
    return args.reduce((prev, next) => {
      if (typeof next !== 'function') {
        return prev
      } else {
        return next(prev)
      }
    }, x)
  }
}

const fn = compose(add, mul, div)
console.log(fn(1))