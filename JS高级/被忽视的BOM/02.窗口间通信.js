/**
 * 窗口间通信的方式：
 *  + WebSocket：引入第三者进行中转
 *  + 定时器 + 客户端存储：不够及时，受限于同源策略
 *  + postMessage：不受同源策略的限制
 *  + localStorage/sessionStorage StorageEvent：传递数据大小有限制，遵循同源策略，同窗口不能进行监听
 *  + Broadcast Channel：允许同源的不同浏览器窗口，tab 页，frame 或者 iframe 下的不同文档之间通信
 *  + MessageChannel
 *  + SharedWorker：兼容性差，受同源策略限制
 */

// 例子：QQ音乐，歌曲选择页与播放页面之间的通信
/**
 * WebSocket:
 *  1. 歌曲选择页与服务端(WebSocket)通信
 *  2. 服务端(WebSocket)与播放页面通信
 */
