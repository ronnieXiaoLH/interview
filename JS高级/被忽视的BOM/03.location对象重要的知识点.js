/**
 * url拆解：
 *  + protocol
 *  + hostname
 *  + port
 *  + pathname
 *  + search
 *  + hash
 *
 * host = hostname + port
 * origin = protocol + hostname + port
 * href = protocol + hostname + port + pathname + search + hash
 */

/**
 * 修改属性值-注意点：
 *  + location.origin 属性是只读的，存在兼容性问题(IE11以下不存在)
 *  + 除 hash 外，其他属性修改都会以新的 URL 重新加载，修改这些属性，会在浏览器的历史记录中生成一条新的历史记录
 *  + 修改 pathname 可以不传 '/'，修改 search 可以不传 '?'，修改 hash 可以不传 '#'
 */

/**
 * 访问 location 对象的方式：
 *  + window.location
 *  + window.document.location
 *  + document.location
 *  + location(不推荐)
 */

/**
 * window.location.reload:
 *  + 重新加载当前文档
 *  + 参数：false 或者不传，浏览器可能冲缓存中读取页面
 *  + 参数：true，强制从服务器重新下载文档
 */

/**
 * assign vs href vs replace:
 *  + href 和 assign 会增加新的历史纪录，replace 不会增加新的历史纪录
 */

/**
 * window.location.href vs window.open:
 *  + window.location.href 是用新的域名页调换当前页，不会开新窗口
 *  + window.open 用来打开新的窗口或者查找已命名的窗口，打开新窗口，可能会被浏览器拦截
 */

/**
 * URL 的三个特殊(重要)属性：
 *  + searchParams
 *  + createObjectURL()
 *  + revokeObjectURL()
 */
const urlObj = new URL('https://www.baidu.com?a=1&b=2')
console.log(urlObj.searchParams.get('a'))

/**
 * encodeURI VS encodeURIComponent:
 *  + 都是编码 URL，唯一的区别在于编码的字符范围不同
 *  + encodeURIComponent 不转义的字符：A-Z a-z 0-9 - _ . ! ~ * ' ()
 *  + encodeURI 不转义的字符：A-Z a-z 0-9 ; , / ? : @ = + $ - _ . ! ~ * ' ()
 *  + 使用 encodeURI 编码整个 URL
 *  + 使用 encodeURIComponent 编码 URL 中的参数
 */
encodeURI
encodeURIComponent
