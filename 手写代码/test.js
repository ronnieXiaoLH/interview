const arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48, 5, 15]

function less (a, b) {
  return a - b < 0
}

function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function quickSort (arr) {
  sort(arr, 0, arr.length - 1)
  return arr
}

function sort (arr, low, high) {
  if (low >= high) return
  const j = partition(arr, low, high)
  sort(arr, low, j - 1)
  sort(arr, j + 1, high)
}

function partition (arr, low, high) {
  let i = low
  let j = high + 1
  while (true) {
    while (less(arr[++i], arr[low])) {
      if (i >= high) break
    }

    while (less(arr[low], arr[--j])) {
      if (j <= low) break
    }

    if (i >= j) break
    swap(arr, i, j)
  }
  swap(arr, low, j)
  return j
}

console.log(quickSort(arr))