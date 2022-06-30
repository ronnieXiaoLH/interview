/**
 * navigator.userAgent 妙用：
 *  + 获取 userAgent：window.navigator.userAgent
 *  + 解析 userAgent：第三方库 us-parser-js
 *  + navigator.onLine：在线状态
 *  + navigator.clipboard：剪切板(新的方式，不兼容IE)
 *      - 返回剪切板对象
 *      - 必须是安全上下文(local,https,wss)
 *  + navigator.cookieEnabled：返回当前页面是否启用了 cookie
 *  + navigator.serviceWorker：返回关联文件的 ServiceWorkerContainer 对象，提供对 ServiceWorker 的注册、删除、升级和通信访问
 *  + navigator.mediaDevices：媒体设备，返回一个 MediaDevices 对象，用户获取媒体设备信息。应用场景：H5调用摄像头识别二维码，共享屏幕等
 *  + navigator.storage：返回 StorageManager 对象，用于访问浏览器整体的存储能力，必须是安全上下文。应用场景：获取 storage 的存储大小以及可分配大小
 *  + navigator.sendBeacon：通过 httpPost 将少量的数据异步传输到 web 服务器
 *  + navigator.permissions：返回一个 Permission 对象，获取权限信息(实验阶段，兼容性不好)
 */
