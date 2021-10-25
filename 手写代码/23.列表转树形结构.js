// [
//   {
//       id: 1,
//       text: '节点1',
//       parentId: 0 //这里用0表示为顶级节点
//   },
//   {
//       id: 2,
//       text: '节点1_1',
//       parentId: 1 //通过这个字段来确定子父级
//   }
//   ...
// ]

// 转成
// [
//   {
//       id: 1,
//       text: '节点1',
//       parentId: 0,
//       children: [
//           {
//               id:2,
//               text: '节点1_1',
//               parentId:1
//           }
//       ]
//   }
// ]

/* function list2tree (arr) {
  let map = {}
  let obj = {}
  let res = []

  arr.forEach(item => {
    map[item.id] = item
  })

  arr.forEach(item => {
    if (map[item.parentId]) {
      map[item.parentId].children = map[item.parentId].children || []
      map[item.parentId].children.push(item)
    }
  })

  for (let key in map) {
    if (map[key].parentId === 0) {
      res.push(map[key])
    }
  }

  return res
} */

function list2tree (arr) {
  let map = {}
  let obj = {}
  let res = []

  arr.forEach(item => {
    map[item.id] = item
  })

  for (let key in map) {
    if (map[map[key].parentId]) {
      map[map[key].parentId].children = map[map[key].parentId].children || []
      map[map[key].parentId].children.push(map[key])
    }

    if (map[key].parentId === 0) {
      res.push(map[key])
    }
  }

  return res
}

let list = [
  {
      id: 1,
      text: '节点1',
      parentId: 0 //这里用0表示为顶级节点
  },
  {
      id: 2,
      text: '节点1_1',
      parentId: 1 //通过这个字段来确定子父级
  },
  {
    id: 3,
    text: '节点1_2',
    parentId: 1
  },
  {
    id: 4,
    text: '节点1_1_1',
    parentId: 2 
  },
  {
    id: 5,
    text: '节点2',
    parentId: 0
  },
  {
    id: 6,
    text: '节点2_1',
    parentId: 5
  }
]

console.log(list2tree(list))