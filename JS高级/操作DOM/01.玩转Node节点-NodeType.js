/**
 * Node 的 nodeType:
 *  + 1 -> 元素节点
 *  + 3 -> 文本；对象模型：Text
 *  + 3 -> 注释；对象模型：Comment
 *  + 3 -> 文档；对象模型：Document
 *  + 3 -> 文档类型；对象模型：DocumentType
 *  + 3 -> 文档碎片；对象模型：DocumentFragment
 */

/**
 * 文本节点：
 *  + 空白节点
 *  + 拆分与合并
 */

/**
 * Document的重要方法和属性：
 *  + 节点信息查找。document.all, document.forms, document.images, document.scripts, document.links
 *  + cookie。document.cookie
 */
// document.all 等价于 document.getElementsByTagName('*')

/**
 * 处理 XMLDocument
 */
// 在浏览器端执行
/* const parser = new DOMParser()
const xmlDoc = parser.parseFromString(
  `
  <xml>
  <persons>
    <person>
      <name>小明</name>
      <age>20</age>
    </person>
    <person>
      <name>小红</name>
      <age>18</age>
    </person>
  </persons>
  </xml>
`,
  'text/xml'
)
console.log(xmlDoc)
function xmlToJson(xmlDoc) {
  return Array.from(xmlDoc.querySelectorAll('person')).map((doc) => ({
    name: doc.querySelector('name').childNodes[0].nodeValue,
    age: doc.querySelector('age').childNodes[0].nodeValue,
  }))
}
console.log(xmlToJson(xmlDoc)) */

/**
 * DocumentType:
 *  + 访问方式：document.doctype, document.firstChild
 *  + 有用的属性只有一个，就是 name
 */

/**
 * DocumentFragment:
 *  + 就像标准的 document 一样，存储由节点(Nodes)组成的文档结构
 *  + 所有的节点会被一次插入到文档中，而这个操作仅发生一次重新渲染
 *  + 常用于批量创建大量节点，提高性能
 */

/**
 * Element:
 *  + 创建：document.createElement
 *  + document.children：只包含 nodeType === 1 的子节点
 *  + document.childNodes：包含全部子节点
 *  + 获取属性 getAttribute，设置属性值 setAttribute
 */
