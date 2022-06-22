/**
 * 触发内置事件的方式：
 *  + element[eventType]()
 *  + new Event + dispatchEvent
 */

/**
 * 自定义事件：
 *  + document.createEvent(已废弃)
 *  + new Event(type, eventInit)
 *  + new CustomEvent()
 */

/**
 * new Event(type, eventInit):
 *  + type: String，表示所创建事件的名称
 *  + eventInt: Object，可选参数
 *    - bubbles: Boolean，可选参数，默认值 false，表示该事件是否冒泡
 *    - cancelAble: Boolean，可选参数，默认值 false，表示该事件能否被取消
 *    - composed: Boolean，可选参数，默认值 false，指示事件是否会在影子 DOM 根节点之外触发侦听器
 */

/**
 * new CustomEvent(type, customEventInit):
 *  + type: String，表示所创建事件的名称
 *  + eventInt: Object，可选参数
 *    - bubbles: Boolean，可选参数，默认值 false，表示该事件是否冒泡
 *    - cancelAble: Boolean，可选参数，默认值 false，表示该事件能否被取消
 *    - detail: Any，可选参数，传递额外的数据
 */

/**
 * Event 与 CustomEvent 的区别：
 *  + 从继承关系来看，CustomEvent 是 Event 的扩展
 *  + 参数支持，Event 适合简单的自定义事件，CustomEvent 支持传递数据的自定义事件
 */

// CustomEvent 兼容解决
;(function () {
  if (typeof CustomEvent !== 'function') {
    var CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }
  }
  CustomEvent.prototype = window.Event.prototype
  window.CustomEvent = window.Event.prototype
})()
