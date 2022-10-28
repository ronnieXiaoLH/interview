/**
 * 常见的事件没有移除造成的事件泄漏：
 *  + window
 *  + dom
 *  + websocket
 *  + 单纯的事件中心
 *  + XMLHttpRequest
 *  ...
 */

/**
 * 事件回调收集的本质-方法拦截：
 *  + 简单重写原来的方法(prototype)
 *  + 继承方式
 *  + 动态代理
 *  + ES6+ 标准的 Proxy
 *  + ES5 标准的 defineProperty
 *  + ES6+ 标准的 decotator
 */
