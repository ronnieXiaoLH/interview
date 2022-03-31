/**
 * 位运算符：
 *  + 操作数是 32 位整数，不是整数自动转为整数
 *  + 速度 T0，在二进制下进行运算
 */

/**
 * 按位与&：
 *  + 两个都为1，则为1，否则为0
 * 应用：
 *  + 判断奇偶数
 */
// num & 1 === 1

/**
 * 按位或|：
 *  + 1个为1，则为1
 * 应用：
 *  + 取整
 */
// num | 0

/**
 * 按位非~：
 *  + 表象是对数字求负，然后减1
 * 应用：
 *  + 判断数组中是否包含某个元素
 *  + 取整
 */
// 如果不包含某个元素 indexOf 返回的值是 -1，-1 按位非的结果是 0
// function inArr(arr, num) {
//   if (~arr.indexOf(num)) return true
//   return false
// }
// console.log(inArr([2, 3, 4], 3))

// 取整
// ~~num

/**
 * 按位异或^：
 *  + 只有一个为1时，为1，否则为0
 *  + 归零律：a ^ a = 0
 *  + 恒等律：a ^ 0 = a
 *  + 结合律：a ^ b ^ c = c ^ b ^ a (与顺序无关)
 *  + 自反：a ^ a ^ a = a
 * 应用：
 *  + 值交换
 */
// 变量的值为数字，完成值的交换(不用增加临时变量)
// function swap(a, b) {
//   a ^= b
//   b ^= a
//   a ^= b
//   return [a, b]
// }
// console.log(swap(10, 20))

// RGB 转 16 进制
// function colorRGBToHex(rgb) {
//   const rgbArr = rgb.split(/[^\d]+/)
//   // 每个数值单独占 8 位
//   const color = (rgbArr[1] << 16) | (rgbArr[2] << 8) | rgbArr[3]
//   return '#' + color.toString(16)
// }
// console.log(colorRGBToHex('rgb(204, 0, 255)'))

// 16 进制转 RGB
function colorHexToRgb(hex) {
  let newHex = hex.replace('#', '0x')
  // 右移 16 位，丢掉低位，保留高位
  const r = newHex >> 16
  // 右移 8 位，丢掉低位；& 0xff 丢掉高位
  const g = (newHex >> 8) & 0xff
  // 丢掉高位
  const b = newHex & 0xff
  return `rgb(${r},${g},${b})`
}
console.log(colorHexToRgb('#cc00ff'))
