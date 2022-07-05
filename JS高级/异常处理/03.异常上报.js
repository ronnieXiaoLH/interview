// try catch 可以区域报错使用

// 编译时错误，还没有执行到 try catch
/* try {
  a. // SyntaxError: Unexpected token '}'
} catch (error) {
  console.log('捕捉到异常', error.message)
}
 */

// try catch 执行时
/* try {
  a.b
} catch (error) {
  console.log('捕捉到异常', error.message)
} */

// try catch 已经执行完毕，无法捕获
/* try {
  setTimeout(() => {
    a.b
  })
} catch (error) {
  console.log('捕捉到异常', error.message)
} */

/**
 * window.onerror
 *  + 全局 JS 异常
 *  + 可以捕获到部分 try catch 捕获不到的错误
 */

/**
 * script error:
 *  + 产生原因：跨域请求到的 js 资源内部错误
 *  + 解决：
 *    1. script 引用 js 文件时增加 crossorigin="anonymous" 的属性。如果是动态创建的 script，可以写作 script.crossOrigin=true
 *    2. 为 js 资源文件增加 CORS 响应头，一般的 CDN 网站都会将 Access-Control-Allow-Origin 配置为 *
 */

/**
 * window.addEventListener('error'):
 *  + window.onerror 和 window.addEventListener 都可以捕获到 js 错误
 *  + addEventListener 可以捕获到静态资源错误，但必须是捕获阶段
 *  + 捕获到静态资源错误，无法区分是 404 或者 500，需结合服务端日志
 */

/**
 * unhandledrejection 和 rejectionhandled
 *  + unhandledrejection: 当 Promise 被 reject 且没有 reject 处理器(catch)的时候，会触发 unhandledrejection 事件
 *  + rejectionhandled: 当 Promise 被 rejected 且有 rejection 处理器时，会在全局触发 rejectionhandled 事件
 */

/**
 * 异常上报方案：
 *  + sendBeacon
 *  + gif 图片
 */
