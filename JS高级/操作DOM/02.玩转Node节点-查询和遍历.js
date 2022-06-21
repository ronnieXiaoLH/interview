/**
 * Node 和 element:
 *  + Node 是一个接口，我们就称其为节点吧
 *  + element 是通用类的基类，nodeType 为1，是 Node 的一类实现，它的子类我们统称为元素
 *  + Node 还有很多其他实现，比如文本、注释等
 */

/**
 * HTMLCollection 和 NodeList:
 *  + HTMLCollection: Element 子类的集合
 *  + NodeList: 所有 Node 的集合
 *  + 我们约定：HTMLCollection 是元素的集合，NodeList 是节点的集合
 */

/**
 * getElementById:
 *  + 作用：根据元素的 id 属性值进行节点查询，返回单一元素
 *  + 属于高效查询
 *  + 语法：document.getElementById(id)
 *  + 此方法只存在于 document 的实例上
 */

/**
 * getElementsByClassName:
 *  + 作用：根据指定的类名查询元素，返回的是 HTMLCollection
 *  + 语法：document.getElementsByClassName(className)
 *  + element 上都存在
 */

/**
 * getElementsByName:
 *  + 作用：根据指定的 name 属性查询元素，返回的是 NodeList
 *  + 语法：document.getElementsByName(name)
 *  + 能够查询到不能被解析的节点(自定义的元素，比如aaa)
 *  + 此方法只存在于 document 的实例上
 */

/**
 * getElementsByTagName:
 *  + 作用：根据指定的标签查询元素，返回的是 HTMLCollection
 *  + 语法：document.getElementsByTagName(tagName)
 *  + tagName 可以是 *，表示所有元素，等价于 document.all
 */

/**
 * querySelector:
 *  + 作用：根据 css 选择器进行节点查询，返回匹配的第一个元素 element
 *  + 语法：document.querySelector(selector)
 *  + element 上都存在
 *  + 如果传入的不是有效的 css 选择器字符串，会抛出异常，不是绝对安全的方法
 */

/**
 * querySelectorAll:
 *  + 作用：根据 css 选择器进行节点查询，返回的是 NodeList
 *  + 语法：document.querySelectorAll(selector)
 *  + element 上都存在
 *  + querySelectorAll 可能返回的不是你的期望值 ，定心丸 ':scope'
 */

/**
 * 特殊的查询：
 *  + document.all
 *  + document.images
 *  + document.forms
 *  + document.scripts
 *  + document.links
 *  + document.fonts
 *  + document.styleSheets
 */

/**
 * 怎么查询伪元素？
 *  + 答案：不能查询
 *  + 可以通过 window.getComputedStyle 来获取其样式，比如 document.getComputedStyle(el, 'before')['content]
 */

/**
 * HTMLCollection 和 NodeList 遍历：
 *  + for / while (因为有 length 属性)
 *  + NodeList.prototype.forEach
 *  + 转为数组遍历
 */

/**
 * 某个节点/元素所有子节点/元素的遍历：
 *  + chidlren/childNodes
 *  + NodeIterator/TreeWalker
 */

/**
 * TreeWalker VS NodeIterator
 *  + TreeWalker 是 NodeIterator 的一个更高级的版本
 *  + TreeWalker 额外支持一些方法：parentNode, firstChild, lastChild, nextSibling
 */
