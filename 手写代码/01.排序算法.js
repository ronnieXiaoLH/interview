const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 5, 15]

function less (a, b) {
  return a - b < 0
}

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function bubbleSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (less(arr[j + 1], arr[j])) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr
}

function selectionSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (less(arr[j], arr[min])) {
        min = j
      }
    }
    swap(arr, min, i)
  }
  return arr
}

function insertionSort (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (less(arr[j], arr[j - 1])) {
        swap(arr, j, j - 1)
      } else {
        break
      }
    }
  }
  return arr
}

function mergeSort (arr) {
  if (arr.length < 2) return arr
  let low = 0
  let high = arr.length
  let mid = Math.floor((low + high) / 2)
  let left = arr.slice(low, mid)
  let right = arr.slice(mid, high)
  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  let result = []
  while(left.length && right.length) {
    if (less(left[0], right[0])) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }

  return result
}

function quickSort(arr) {
  sort(arr, 0, arr.length - 1)
  return arr
}

function sort (arr, low, high) {
  if (low >= high) return
  let j = partion(arr, low, high)
  sort(arr, low, j - 1)
  sort(arr, j + 1, high)
}

function partion (arr, low, high) {
  let i = low
  let j = high + 1
  while (true) {
    // 从左到右找到第一个比 low 大的元素
    while (less(arr[++i], arr[low])) {
      if (i >= high) break
    }
    // 从右到左找到第一个比 low 小的元素
    while (less(arr[low], arr[--j])) {
      if (j <= low) break
    }
    // 如果 i 和 j 已经交叉了，跳出循环
    if (i >= j) break
    // 如果 i 和 j 没有交叉，交换 i 和 j 对应的元素
    swap(arr, i, j)
  }
  swap(arr, low, j)
  return j
}

console.log(quickSort(arr))