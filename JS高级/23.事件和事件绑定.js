/**
 * 什么是事件：
 *  事件是浏览器赋予元素的默认行为，也可以理解为事件是天生具备的，不论我们是否为其绑定方法，当某些行为触发的时候，相关的事件会被触发执行
 */

/**
 * 什么是事件绑定：
 *  给元素默认事件行为绑定方法，这样可以在行为触发的时候，执行这个方法
 *  + DOM0级事件绑定
 *    语法：document.body.onclick = function(){}
 *    移除事件绑定：document.body.click = null 或者赋值为其他非函数的值
 *    原理：每一个 DOM 元素的私有属性上都有很多类似于 "onxxx" 的私有属性，我们给这些代表事件的私有属性赋值，就是 DOM0 事件绑定
 *      + 如果没有对应事件的私有属性值(例如：DOMContentLoaded)则无法基于这种操作实现事件绑定
 *      + 只能给当前元素的某个事件行为绑定一个方法，如果绑定多个，最后一个会覆盖之前的
 *      + 好处是执行效率快，而且开发者使用起来方便
 *  + DOM2级事件绑定
 *    语法：document.body.addEventListener('click', fn, true/false)
 *    移除事件绑定：document.body.removeEventListener('click', fn)
 *    原理：每一个 DOM 元素都会基于原型链找到 EventTarget.prototype 上的 addEventListener/removeEventListener 等方法，基于这些方法实现事件的绑定和移除；DOM2 事件绑定采用的是事件池机制；
 *      + DOM2 事件绑定，绑定的方法一般不是匿名函数，主要是为了可以移除事件绑定
 *      + 凡是浏览器提供的事件行为都可以基于这种方式实现事件的绑定和移除
 *      + 可以给当前元素绑定多个方法
 */

/**
 * 事件对象：存储当前事件操作及触发的相关信息(浏览器本身记录的，记录的是当前这次操作的信息，和在哪个函数中无关)
 *  + 鼠标事件对象 MouseEvent
 *    - ClientX/ClientY: 距离当前视口的位置
 *    - PageX/PageY: 距离当前页面的位置
 *    - type: 事件类型
 *    - target/srcElement: 当前触发的元素
 *    - path: 事件的传播路径(事件捕获阶段收集到的)
 *    - e.preventDefault() / returnValue = false 阻止默认事件
 *    - e.stopPropagation() 阻止事件冒泡
 * 
 *  + 键盘事件对象 KeyboardEvent
 *    - which / keyCode 键盘按键码
 *    - altKey 是否按下 alt 键
 *    - ctrlKey 是否按下 ctrl 键
 *    - shiftKey 是否按下 shift 键
 */

