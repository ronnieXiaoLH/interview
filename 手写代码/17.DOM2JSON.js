{/* <div>
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>

把上诉dom结构转成下面的JSON格式

{
  tag: 'DIV',
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
} */}

function dom2Json(domtree) {
  let obj = {}
  obj.name = domtree.tagName
  obj.children = []
  domtree.childNodes.forEach((child) => obj.children.push(dom2Json(child)))
  return obj
}

const domTree = () => {
  let div = document.createElement('div')
  let span = document.createElement('span')
  let a1 = document.createElement('a')
  let a2 = document.createElement('a')
  span.appendChild(a1)
  span.appendChild(a2)
  div.appendChild(span)
  return div
}

dom2Json(domTree())