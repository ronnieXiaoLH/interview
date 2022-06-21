/**
 * 显示创建节点：
 *  + 对象模型直接 new
 *  + document.create 系列
 */
// 对象模型直接 new
/* const commentNode = new Comment('注释')
const textNode = new Text('文本')
document.body.appendChild(commentNode)
document.body.appendChild(textNode) */

// document.create 系列
/* const div = document.createElement('div')
const commentNode = document.createComment('注释')
const textNode = document.createTextNode('文本')
document.body.appendChild(div)
document.body.appendChild(commentNode)
document.body.appendChild(textNode) */

/**
 * 节点的挂载：
 *  + Node API的挂载
 *    - appendChild: 将一个节点附加到指定父节点的子节点列表的末尾
 *    - insertBefore: 在参考节点之前插入一个拥有指定父节点的子节点
 *    - replaceChild: 指定的节点替换当前节点的子节点，并返回被替换掉的节点
 *    - textContent: 一个节点及其后代的文本内容
 *  + Element API的挂载
 *    - after: 在该节点之前插入一组 Node
 *    - before: 在该节点之后插入一组 Node
 *    - append: 在节点最后一个子节点后插入一组 Node
 *    - prepend: 在节点第一个子节点之前插入一组 Node
 *    - insertAdjacentElement: 将节点插入到指定的位置
 *    - insertAdjacetHTML: 将文本解析为节点并插入到指定的位置
 *    - insertAdjacetText: 将文本节点插入到指定的位置
 *    - replaceChildren: 将后代替换为指定节点
 *    - replaceWith: 将后代替换为指定节点集合
 */

/**
 * replaceChildren & replaceWith:
 *  + 都是全面替换子节点
 *  + 参数是多个几点或者字符串
 */

/**
 * innerHTML & innerText
 *  + innerHTML: 批量创建并生成节点
 *  + innerText: 生成文本节点。本质是 HTMLElement 上的属性
 */

/**
 * 删除节点-单个：
 *  - Node.removeNode
 *  - Element.remove
 *  - outerHTML/innerHTML
 *  - document.adoptNode
 */

/**
 * 删除节点-批量：
 *  - outerHTML/innerHTML
 *  - replaceChild/replaceWith
 *  - 循环删除
 */
// 循环删除
/* function clearChildNodes(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild)
  }
} */

/**
 * 节点克隆：
 *  + Node.cloneNode
 *  + Document.importNode
 *  + Document.adoptNode
 *  + Element.innerHTML
 *  + 节点克隆不能克隆 DOM2 的事件，一定程度上能赋值 DOM0 事件
 */
