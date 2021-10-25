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
// 转成
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

let treeData = [
  {
      id: 1,
      text: '节点1',
      parentId: 0,
      children: [
          {
              id:2,
              text: '节点1_1',
              parentId:1,
              children: [
                {
                  id: 4,
                  text: '节点1_1_1',
                  parentId: 2
                }
              ]
          },
          {
            id:3,
            text: '节点1_2',
            parentId:1
        }
      ]
  },
  {
    id: 5,
    text: '节点2',
    parentId: 0,
    children: [
        {
            id:6,
            text: '节点2_1',
            parentId:5
        }
    ]
  }
]


function treeToList (treeData) {
  let listData = []

  const dfs = (treeData) => {
    treeData.forEach(item => {
      listData.push({
        id: item.id,
        text: item.text,
        parentId: item.parentId
      })
      item.children && dfs(item.children)
    })
  }

  dfs(treeData)

  return listData
}

console.log(treeToList(treeData))