Array.prototype._forEach = function (callback, context) {
  let i = 0, len = this.length, ctx = context == null ? window : context
  for (; i < len; i++) {
    console.log( typeof callback)
    typeof callback === 'function' ? callback.call(ctx, this[i], i, this) : null
  }
}

const arr = [1, 2, 3]
arr.forEach((item, index) => console.log(item, index))
arr._forEach((item, index) => console.log(item, index))