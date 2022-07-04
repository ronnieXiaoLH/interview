/**
 * Ajax技术集合：
 *  + 全称：Asynchronous JavaScript And XML(异步 JavaScript 和 XML)
 *  + 它并不是指单一的某种技术，而是多种现有技术的结合，实现无页面刷新的数据获取
 *  + 这些技术包括了：HTML 或 XHTML、CSS、JavaScript、DOM、XML、XSLT以及最重要的 XMLHTTPRequest
 */

/**
 * XMLHTTPRequest属性解读：
 *  + readyState: 返回 XHR 代理当前所处的状态(0-4)
 *  + status: 返回响应的状态码，请求之前为0，成功为200
 *  + statusText: 服务器返回的状态码文本
 *  + timeout: 指定 ajax 的超时时长
 *  + response: 服务器响应的内容
 *  + responseText: 服务器响应的文本形式
 *  + responseType: 响应的类型：arrayBuffer,blob,document,json,text
 *  + responseXML: xml 形式的响应数据
 *  + responseURL: Ajax 最终请求的 url，存在重定向，就是重定向后的 url
 *  + upload: 返回一个 XMLHTTPRequestUpload 对象，表示上传的进度
 *  + withCredentials: 用来指定跨域请求是否应当带有授权信息，如 cookie
 *  + abort: 如果请求已发出，立刻将终止该请求
 *  + getAllResponseHeaders: 获取所有的响应头
 *  + getResponseHeader: 获取指定的响应头文本字符串
 *  + open: 初始化一个请求
 *  + overrideMimeType: 指定一个 MIME 类型，替代服务器指定的类型
 *  + send: 发送请求
 *  + setRequestHeader: 设置请求头部
 */

/**
 * XMLHTTPRequest属性解读：
 *  + onreadystatechange/readystatechange: readyState 属性变化时触发
 *  + ontimeout/timeout: 在预设时间内没有收到响应触发
 *  + onabort/abort: request 被停止触发
 *  + onloadstart/loadstart: 接收到响应数据是触发
 *  + onload/load: 请求成功完成触发
 *  + onloadend/loadend: 请求结束触发，无论请求成功与否
 *  + onerror/error: 请求遇到错误时触发
 *  + onprogress/progress: 当请求收到更多的数据时，周期性触发
 */

/**
 * XHR(传统 Ajax)缺点：
 *  + 回调地狱的窘境
 *  + 不符合关注点分离原则
 */

/**
 * Fetch 的优点：
 *  + Promise语法，解决了回调地狱问题
 *  + 更合理的设计，分离 Request，Response等通用对象
 *  + 前端可拦截 301,302等跳转
 *  + 支持数据流，方便处理大文件
 *  + 语法简单
 */

/**
 * Axios 推荐：
 *  + Axios 是一个基于 Promise 网络请求库，作用于 Nodejs 和浏览器中
 *  + 客户端：XMLHTTPRequest 进行二次封装
 *  + 服务器：使用 Nodejs http 模块
 */
