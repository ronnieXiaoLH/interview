var name = 'let 的 name'
const person = {
  name: 'person 的 name',
  getName() {
    return this.name
  },
}
const getName = person.getName
const res1 = getName()
console.log(res1) // let 的 name
const res2 = person.getName()
console.log(res2) // person 的 name
// 这里是分组运算符
const res3 = (person.getName)()
console.log(res3) // person 的 name
// 这里是分组运算符和逗号运算符
const res4 = (0, person.getName)() // let 的 name
console.log(res4)
// 这才是匿名函数自执行，非严格模式下，this 指向 window
const res5 = (function () {return this.name})()
console.log(res5) // let 的 name

/**
 * 分组运算符：
 *  + 分组运算符里面可以是表达式，也可以是字面量
 *  + 此算法不将 GetValue 应用于计算 Expression (表达式) 的结果
 */
(person.getName)() // 这里 person.getName 没有赋值行为
/**
 * 逗号运算符：
 *  + 对它的每个操作数求值(从左到右)，并返回最后一个操作数的值
 */
(0, person.getName)() // 这里 person.getName 有赋值行为