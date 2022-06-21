/**
 * 文本
 * HTMLElement.innerHTML & Node.textNode
 *  + HTMLElement.innerText: 表示一个节点以及其后代被渲染的文本内容
 *  + Node.textNode: 表示一个节点以及其后代节点的文本内容
 *  + 最大区别：innerText 可操作已被渲染的内容，而 textContent 不会
 *  + innerText 受样式影响，会触发浏览器绘制部分或全部页面，带来性能问题，尽可能使用 textContent
 */

/**
 * 节点值
 * value & Node.nodeValue
 *  + nodeValue: 对于 text, comment, CDATA 节点，nodeValue 返回该节点的文本内容；对于 attribute 节点，返回该属性的属性值
 *  + value: 对于一些特定的 HTMLElement 元素，用 value 属性来获取其值(HTMLInputElement,HTMLTextareaElement,HTMLButtonElement,HTMLDataElement,HTMLSelectElement,HTMLOptionElement,HTMLParamElement,HTMLProgressElement)
 */

/**
 * 宽高
 * Element.clientWidth/clientHeight & HTMLElement.offsetWidth/offsetHeight & Element.scrollWidth/scrollHeight
 *  + clientWidth/clientHeight: 元素宽高(content + padding)
 *  + offsetWidth/offsetHeight: 元素布局宽高(content + padding + border + 滚动条)
 *  + scrollWidth/scrollHeight: 元素内容宽高
 */

/**
 * 位置关系
 * Node.contains & Node.compareDocumentPosition
 *  + Node.compareDocumentPosition:
 *    - 比较当前节点与任意文档中的另一个节点的位置关系，返回值是一个具有以下值的位掩码(带组合意义的)
 *    - 1 -> 不在同一文档
 *    - 2 -> otherNode 在 node 之前
 *    - 4 -> otherNode 在 node 之后
 *    - 8 -> otherNode 包含 node
 *    - 16 -> otherNode 被 node 包含
 *    - 32 -> 待定
 *  + Node.contains: 返回一个布尔值，表示传入的节点是否为该节点的后代节点
 */

/**
 * 大小/位置
 * Element.getBoundingClientRect & Element.getClientRects
 *  + Element.getBoundingClientRect: 返回元素的大小及其相对于可视化窗口(视口)的位置
 *  + Element.getClientRects: 返回盒子的边界矩形集合
 */

/**
 * 加载
 * window.onload & DOMContentLoaded
 *  + window.onload: 在文档装载完成后会触发 load 事件。此时，在文档中的所有对象都在 DOM 中，所有图片、脚本、链接以及子框架(iframe)都完成了装载
 *  + DOMContentLoaded: 当初始的 HTML 文档被完全加载和解析完成后，DOMContentLoaded 事件会被触发，而无需等待样式表、图片和子框架的完全加载。
 */

/**
 * 子节点集合
 * Element.children & Node.childNodes
 *  + Element.children: 返回的知识节点的元素节点集合，即 nodeType 为 1 的节点
 *  + Node.childNodes: 返回节点的所有子节点集合，包括元素节点、文本节点、注释节点等
 */

/**
 * 添加节点
 * Node.appendChild & Element.append
 *  + Node.appendChild: 将一个节点添加到父节点的子节点列表的末尾处
 *  + Element.append: 在 ParentNode 的最后一个子节点之后插入一组 Node 对象或 DOMString 对象
 */

/**
 * 克隆/导入
 * Document.apoptNode & Document.ImportNode & Node.cloneNode
 *  + Document.apoptNode: 将外部文档的一个节点拷贝一份，然后把拷贝的节点插入到当前文档中
 *  + Document.ImportNode: 从其他的文档中获取一个节点。该节点以及它的子树上的所有节点都会从原文档中删除，并且它的 ownerDocument 属性会变成当前的文档，之后把该节点插入到当前文档中
 *  + Node.cloneNode:
 *    - deep:true 该节点的所有后代节点也会被克隆
 *    - deep:false 只克隆该节点自身
 *    - 可克隆属性上绑定的事件，比如 <div onClick="alert(1)"></div>
 */

/**
 * 滚动
 * window.scrollTo(x,y) & window.scrollBy(x,y) & element.scrollIntoView(true/false)
 *  + scrollTo: 滚动当前文档，让文档中由 x 和 y 指定的点，位于显示区域的左上角
 *  + scrollBy: 滚动当前文档，x 和 y 指定滚动的相对量
 *  + scrollIntoView: 滚动当前元素进入浏览器的可视区域
 *    - true，表示元素的顶部与当前区域的可见部分的顶部对齐
 *    - false，表示元素的底部与当前区域的可见部分的尾部对齐
 */
