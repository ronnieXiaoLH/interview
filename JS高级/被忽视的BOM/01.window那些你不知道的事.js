/**
 * window 是什么？
 *  + 一个包含 DOM 文档的窗口，表示浏览器窗口以及页面可见区域
 *  + 是(global)全局对象，全局变量和函数均是它的属性
 *  + 全局变量
 */

/* window === window.window // true
window.window === window.window.window // tue
window.window.window === window.window.window.window // true */

/**
 * 为什么会有 window.window 这种设计呢？
 *  主要是为了方便使用 this
 */
// this.window // window
// window.this // undefined
// this 里面有 window，window 里面没有 this

/**
 * window.isSecureContext:
 *  + 一个布尔值，标识当前上下文是否安全
 *  + 一个很重要的表现就是网页是不是 https 协议的
 */

/**
 * iframe 嵌套时：
 *  + self: widow
 *  + this: 全局上下文/全局作用域下等于 window
 *  + parent: 父窗口
 *  + top: 顶级窗口，最外层窗口
 */

/**
 * 窗体可见性：
 *  + window 的 focus 和 blur 事件
 *  + document.hidden: 返回布尔值
 *  + document.visibilityState:
 *    - 返回 document 的可见性，由此可以知道当前文档(页面)是在背后，或是不可见的隐藏标签页，或者(正在)预渲染
 *    - 可用值：visible / hidden / prerender
 *  + document 的 visibilitychange 事件
 */

/**
 * window.devicePixelRatio:
 *  + 返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
 *  + 物理像素：设备能控制显示的最小单位，设设备屏幕上的像素点的个数
 *  + 逻辑像素：又称为设备独立像素，屏幕上的物理像素和逻辑像素并不是相等的，一般物理像素大于逻辑像素，其比值就是 devicePixelRatio
 */

/**
 * window.matchMedia:
 *  + 返回一个 MediaQueryList 对象，表示指定的媒体查询字符串解析后的结果
 *  + 可被用于判定 document 是否匹配媒体查询
 *  + 监控一个 document 来判定它匹配了或者停止匹配了此媒体查询
 */

/**
 * window.getSelection:
 *  + 表示用户选择的文本范围或者光标的当前位置
 *  + 可使用 document.activeElement 来返回当前的焦点元素
 *  + 另外一个等价方法：document.getSelection()
 */

/**
 * window.frameElement:
 *  + 返回嵌入当前 window 对象的元素(iframe或者object)，如果当前 window 对象已经是顶层窗口，则返回null
 *  + 例子：window.frameElement 获得 iframe 节点，然后设置其 src 属性
 */

/**
 * window.print
 *  + 打开打印对话框打印当前文档
 *  + 样式设置：四种方式
 *  + 打印局部内容：使用样式隐藏其他内容
 */
