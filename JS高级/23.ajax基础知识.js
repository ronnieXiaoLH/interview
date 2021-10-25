/**
 * AJAX(Async Javascript And Xml)：使用 AJAX 技术可以增量更新网页的内容，无需重载(刷新)页面
 *  + 早期，客户端和服务端的数据通信，都是基于 XML 格式的数据完成的；当代，两端之间的数据通信，都是基于更强大的 JSON 等格式的数据来完成(更小、操作更方便)
 *  + async javascript：这里不是指的以后发送 ajax 请求都采用异步，而是指浏览器的异步刷新
 */

/**
 * readystate: Ajax 请求状态
 *   + 0: UNSENT 最开始
 *   + 1: OPENED 最开始
 *   + 2: HEADERS_RECEIVED 服务器已经返回了响应头
 *   + 3: LOADING 响应主体信息正在处理和返回
 *   + 4: DONE 响应主体信息已经获取，此时证明 Ajax 请求结束了
 */

console.log(Qs.stringify({
  username: 'xxx',
  password: 123456
}))

let xhr = new XMLHttpRequest()

xhr.open('post', 'http://localhost:3000/login')

xhr.onload = e => {
  console.log(JSON.parse(e.target.responseText))
}

xhr.onreadystatechange = e => {
  if (xhr.status !== 200) return
  if (xhr.readyState === 4) {
    console.log(JSON.parse(xhr.responseText))
  }
}

/**
 * Qs.stringify 将对象格式转换为 a=xxx&b=xxx 的格式
 */
xhr.send(Qs.stringify({
  username: 'xxx',
  password: 123456
}))


/**
 * GET 和 POST 的区别：
 *  项目中，GET 一般用于从服务器获取数据，POST 一般用于给服务器推送信息；接下来的区别，都是约定的规范，不是官方规范
 *  GET 请求，是基于 URL 问号传参的，POST 请求是基于请求主体传参的(也可以设置请求头，携带部分信息)
 *    1. 浏览器对于 URL 的长度是由限制的，所以 GET 请求传递给服务器的信息是由限制的，POST 请求基于请求主体传递信息理论上是没有大小限制的，但是实际中，为了保证速度，我们需要手动限制
 *    2. GET 请求非常容易产生不可控的缓存(是浏览器自己做的缓存，如果两次请求地址，参数信息一致)，解决办法：让每一次 GET 请求，保持唯一性，比如加随机数，时间戳
 *    3. GET 请求相对更不安全，类似于 URL 劫持等低端技术都可以获取 GET 请求的信息或修改
 */

/**
 * HTTP 状态码：
 *  100: Continue 继续。客户端需要继续请求
 *  101: Switching Protocols 切换协议。服务器根据客户端的请求切换协议。只能切换到更高的协议，例如：切换 HTTP 更高版本的协议
 *  200: OK 成功。
 *  201: Created 已创建。成功请求并创建了新的资源
 *  202: Accepted 已接受。已接受请求，但未处理请求
 *  203: Non-Authoritative Information 非授权信息。请求成功，但返回的 meta 信息不在原始的服务器，而是一个副本
 *  204: No Content 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档
 *  205: Reset Content 重置内容。
 *  206: Partial Content 部分内容。服务器成功处理部分 GET 请求
 *  300: Multiple Choices 多种选择。请求的资源包括多个位置，相应可返回一个资源特征与地址的列表用于客户端选择
 *  301: Moved Permanently 永久移动。请求的资源已被永久的移动到了新的 URI，返回信息会包括新的 URI，浏览器会自动定向到新的 URI
 *  302: Move Temporarily 临时移动。与 301 类似。但是资源只是临时被移动，客户端继续使用原有的 URI
 *  303: See Other 查看其他地址。与 301 类似
 *  304: Not Modified 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源
 *  305: Use Proxy 使用代理。所请求的资源时必须通过代理访问
 *  306: Unused 已经被废弃的状态码
 *  400: Bad Request 1. 客户端请求的语法错误，服务器无法理解 2. 请求参数有误
 *  401: Unauthorized 请求要求用户身份认证
 *  402: Payment Required 保留，将来使用
 *  403: Forbidden 服务器理解客户端请求，但是拒绝执行此请求
 *  404: Not Found 服务器无法根据客户端的请求找到资源
 *  405: Method Not Allowed 客户端请求的方法被禁止
 *  406: Not Acceptable 服务器无法根据客户端请求的内容特性完成请求
 *  407: Proxy Authentication 请求要求代理的身份认证，与 401 类似，但请求者应当使用代理进行授权
 *  408: Request Timeout 请求超时。客户端没有在服务器预备的等待时间内完成请求的发送
 *  409: Conflict 服务器完成客户端的 PUT 请求时可能返回此状态，服务器处理请求时发生了错误
 *  410: Gone 客户端请求的资源已经不存在
 *  411: Length Required 服务器无法处理客户端发送的不带 Content-Length 的请求信息
 *  413: Request Entity Too Large 由于请求的实体过大，服务器无法处理，因此拒绝请求
 *  414: Request-URI Too Large 请求的 URI 过程，服务器无法处理
 *  500: 服务器内部发生错误，无法完成请求
 *  501: Not Implemented 服务器不支持请求的功能，无法完成请求
 *  502: Bad Gateway 作为网关或代理工作的服务器尝试执行请求时，从远程服务器收到了一个无效的响应
 *  503: Service Unavailable 由于超载或系统远程维护，服务器暂时无法处理客户端的请求
 *  504: Gateway Timeout 充当网关或代理的服务器，未及时从远端服务器获取请求
 *  505: HTTP Version Not Supported 服务器不支持请求的 HTTP 协议的版本，无法完成处理
 */