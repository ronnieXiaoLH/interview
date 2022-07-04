/**
 * HTTP:
 *  + HyperText Transfer Procotol 超文本传输协议，是万维网(World Wide Web)的基础协议
 */

/**
 * 最初的万维网：
 *  + 超文本标记语言(HTML)
 *  + 超文本传输协议(HTTP)
 *  + 超文本文档的客户端，即网络浏览器
 *  + 用于提供可访问的文档的服务器
 */

/**
 * HTTP/0.9(1991):
 *  + 仅支持 GET 请求
 *  + 不包含 HTTP 头，只能传输 HTML 文件
 *  + 没有状态码或错误代码
 */

/**
 * HTTP/1.0(1996)
 *  + 发送时添加协议版本信息
 *  + 响应添加状态码
 *  + 引入了 HTTP 头，多了传递信息的手段，更加灵活和方便扩展了
 *  + HTTP 头里面引入了重要的 Content-Type 属性，具备了传输除纯文本 HTML 文件以外其他类型文档的能力
 */

/**
 * HTTP/1.0(1997)
 *  + 连接复用，长连接。多个请求可以复用一个 tcp 连接。(请求头 Connection: keep-alive，响应头 Keep-Alive: timeout=5,max=10)
 *  + 管道化技术。多个连续的请求甚至都不用等待立即返回就可以被发送，这样就减少了耗费在网络延迟上的时间
 *  + 支持响应分块，就是单个请求返回部分内容，需要前后端配合。(请求头 Range:xxx，响应头 Content-Range)
 *  + 新的缓存机制。cache-control(强缓存)，eTag(协商缓存)
 *  + 新增 host 请求头。能够使不同域名配置在同一个 IP 地址的服务器上
 */

/**
 * 常见状态码：
 *  + 信息响应：
 *    - 101：协议转换
 *  + 成功响应：
 *    - 200：请求成功
 *    - 204：请求成功，不返回任何内容
 *    - 206：范围请求成功
 *  + 重定向：
 *    - 301：永久重定向
 *    - 302：临时重定向
 *    - 304：资源未修改
 *  + 客户端响应：
 *    - 400：无法被服务器理解
 *    - 401：未授权
 *    - 403：禁止访问
 *    - 404：未找到资源
 *  + 服务端响应：
 *    - 500：服务端异常
 *    - 503：服务不可达
 */

/**
 * Content-Type:
 *  + application/x-www-form-urlencodeed：传参格式(body:name=tom&age=18)，可以借用 new URLSearchParams 来方便书写
 *  + multipart/form-data：传参格式(直接在 form 标签上设置 enctype="multipart/form-data"，或者使用 new FormData)
 *  + application/json：传参格式(JSON.stringify({name:'tom',age:18}))
 */
