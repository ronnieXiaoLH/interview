// 输入 https://www.youzan.com?name=coder&age=20&callback=https://youzan.com?name=test&

function parse (str) {
  return str.split('&').reduce((prev, curr) => {
    const [key, value] = curr.split('=')
    if (!value) {
      return prev
    }
    // 对象可能是多层的，需要进行合并
    deepSet(prev, key.split(/[\[|\]]/g).filter(v => v), value)
    return prev
  }, {})
}

function deepSet (obj, path, value) {
  let i = 0
  for (; i < path.length - 1; i++) {
    if (obj[path[i]] === undefined) {
      // 判断 key 是不是数字，如果是数字则表示是数组
      if (path[i + 1].match(/^\d+$/)) {
        obj[path[i]] = []
      } else {
        obj[path[i]] = {}
      }
    }
    obj = obj[path[i]]
  }
  // 对象最后一层的处理
  obj[path[i]] = decodeURIComponent(value)
}

const str = 'a=1&b=2&c=3&d=null'
const str2 = 'a&b&c'
const str3 = 'a[name]=fox&a[company]=tencent&b=why'
const str4 = 'color=deep%20blue'
const str5 = 'a[0]=1&a[1]=2'

console.log(parse(str))
console.log(parse(str2))
console.log(parse(str3))
console.log(parse(str4))
console.log(parse(str5))
console.log(parse('name=coder&age=20&callback=https://youzan.com?name=test'))