/**
 * DOM0级事件的优点：
 *  + 效率高
 *  + 节点上的 onClick 属性可以被 Node.cloneNode 克隆
 *  + 移除事件非常简单
 *  + 兼容性好
 * DOM0级事件的注意事项：
 *  + 事件处理函数中的 this 指向当前的节点
 *  + 如果调用函数，会在全局作用域中查找
 *  + 唯一性，只能定义一个事件回调函数
 */

/**
 * DOM2级事件：
 *  + 捕获阶段(window -> 目标元素)，目标阶段，冒泡阶段(目标元素 -> window)
 *  + 可选参数 useCapture，布尔值，表示事件是在捕获(true)还是冒泡(false)阶段执行，默认值 false
 *  + 可选参数 options:
 *    - capture: 捕获(true)还是冒泡(false)阶段执行
 *    - once: 是否只响应一次
 *    - passive: 为 true 永远不能组织默认行为(不调用preventDefault)
 *    - signal: AbortSignal，该 AbortSignal 的 abort() 方法被调用时，监听器会被移除
 *  + useCapture/options 中的 capture 参数相同，且回调函数相同，多次添加只会添加成功一个
 *  + event.preventDefault: 阻止默认行为，不影响事件继续传播
 *  + event.stopPropagation: 阻止事件继续传播
 *  + event.stopImmediatePropagation: 在阻止事件继续传播的基础上，还会阻止同一类型的其他事件的执行
 *  + target: 触发事件的元素
 *  + currentTarget: 事件绑定的元素
 */

/**
 * DOM3级事件：
 *  + DOM3 Events 在 DOM2 Events 的基础上重新定义了事件，并增加了新的事件类型
 *  + 1. 用户界面事件(UIEvent)：涉及与 BOM 交互的通用浏览器事件。比如：load、scroll
 *  + 2. 焦点事件(FocusEvent)：在元素获得和失去焦点时触发。比如：focus、blur
 *  + 3. 鼠标事件(MouseEvent)：使用鼠标在页面上执行某些操作时触发
 *  + 4. 滚轮事件(WheelEvent)：使用鼠标滚轮(或类似设备)时触发。比如：mousewheel
 *  + 5. 输入事件(InputEvent)：向文档中输入文本时触发
 *  + 6. 键盘事件(KeyboardEvent)：使用键盘在页面上执行某些操作时触发。比如：keydown、keypress
 *  + 7. 合成事件(CompositionEvent)：在使用某种IME(Input Method Edito，输入法编辑器)输入字符时触发。
 */
