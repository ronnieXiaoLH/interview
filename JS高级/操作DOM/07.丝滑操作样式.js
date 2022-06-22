/**
 * 样式的来源：
 *  + 浏览器默认样式
 *  + 浏览器用户自定义样式
 *  + link 引入外部样式
 *  + style 标签
 *  + style 属性(内联样式)
 */

/**
 * 样式优先级：
 *  1. important
 *  2. 内联样式
 *  3. ID选择器
 *  4. 类和伪类选择器
 *  5. 标签选择器
 *  6. 通配符选择器(*)
 */

/**
 * 操作元素的 style 属性：
 *  + el.style.backgroundColor = 'red'
 *  + el.style.cssText = 'background-color: red !important;font-size: 16px;'
 */

/**
 * 操作元素的 classList & className 属性
 *  + className: String
 *  + classList: DOMTokenList(类数组)
 *    - add
 *    - remove
 *    - contains
 *    - toggle: 有就删除，没有就加；第二个参数如果是 true，只添加不删除
 */

/**
 * window.getComputedStyle():
 *  + 计算后的样式不等同于 css 文件、style 标签和属性设置的样式的值
 *  + 可以获取伪类样式
 *  + 该方法会引起重排(重新渲染)
 */
