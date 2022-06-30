/**
 * history API:
 *  + back: 向后移动一页
 *  + forward: 向前移动一页
 *  + go: 向前或向后移动指定页面(正数向前，负数向后)，如果未传参数或者参数为0，则与调用 location.reload() 效果相同
 *  + length:当前会话中的历史页面数
 *
 *  + pushState: 向当前浏览器会话历史记录堆栈中添加一个状态
 *  + replaceState: 修改当前历史记录状态
 *  + state: 返回在会话栈顶的状态值的拷贝
 */

/**
 * history.pushState:
 *  + 语法：history.pushState(state, title[,url])
 *  + 会增加历史访问记录(即使url为空，但不会改变页面内容)
 *  + 新的 url 和旧的 url 必须是同源的
 */

/**
 * history.replaceState:
 *  + 语法：history.replaceState(stateObj, title[,url])
 *  + 是替换浏览记录栈顶部的记录，不会增加栈的深度
 *  + 新的 url 和旧的 url 必须是同源的
 */

/**
 * window.onpopstate:
 *  + 当活动历史记录条目更改时，将触发 popstate 事件
 *  + history.pushState() 和 history.replaceState() 都不会触发 popstate 事件
 *  + popstate 只会在浏览器的某些行为下触发，比如点击后退、前进按钮、history 的 back、forward 和 go 方法
 *  + a 标签的锚点也会触发该事件
 */

/**
 * 刷新的问题：
 *  + history.pushState 方案，刷新的时候需要服务端的配合
 *  + 方案：就是不管你访问的路由是什么，都返回同一份 index.html
 */
