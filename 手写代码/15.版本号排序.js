// 题目描述:有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']

const arr = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5', '4.3.4']

/* function versionSort (arr) {
  return arr.map(item => item.replaceAll('.', '')).sort().reverse().map(item => {
    arr.forEach(v => {
      if (v.replaceAll('.', '') === item) {
        item = v
      }
    })
    return item
  })
} */

function versionSort (arr) {
  return arr.sort((a, b) => {
    let i = 0
    let arrA = a.split('.')
    let arrB = b.split('.')
    while (true) {
      let s1 = arrA[i]
      let s2 = arrB[i]
      i++
      if (s1 === undefined || s2 === undefined) {
        return arrB.length - arrA.length
      }
      if (s1 === s2) continue
      return s2 - s1
    }
  })
}

/* function versionSort (arr) {
  return arr.sort((a, b) => {
    const arrA = a.split('.') || []
    const arrB = b.split('.') || []
    const len = Math.min(arrA.length, arrB.length)
    for (let i = 0; i < len; i++) {
      if (arrA[i] !== arrB[i]) {
        return arrB[i] - arrA[i]
      }
    }
    return arrB.length - arrA.length
  })
} */

console.log(versionSort(arr))