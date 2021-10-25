# Flex 弹性盒布局

## flex 的属性

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

## flex-direction 的取值

- row(默认)
- row-reverse
- column
- column-reverse

## flex-wrap 的取值

- nowrap(默认)
- wrap
- wrap-reverse: 换行后的行顺序上下颠倒过来

## flex-flow

flex-flow 是 flex-direction 和 flex-wrap 的缩写，默认值是 row nowrap

## justify-content

定义项目在主轴方向上的对齐方式

取值：

  - flex-start(默认): 左对齐
  - flex-end: 右对齐
  - center: 居中
  - space-between: 两端对齐，项目中间的间隔相等
  - space-around: 每个项目两侧的间隔相等(两端间隔是占一等份，中间两个项目之间的间隔是二等分)

## align-items

定义项目在交叉轴上的对齐方式

取值：

  - stretch(默认值): 如果项目没有设置高度或者高度为 auto，则项目的高度与外层父元素的高度一样
  - flex-start: 上对齐
  - flex-end: 下对齐
  - center: 居中
  - baseline: 项目的第一行文字的基线对齐

## align-content

定义多根轴线的对齐方式，如果项目中只有一根轴线不起作用

取值：

  - flex-start
  - flex-end
  - center
  - space-between
  - space-around
  - stretch(默认): 轴线占满交叉轴

## 项目的属性

- order: 定义项目的排列顺序。数值越小，排列越靠前，默认值是0
- flex-grow: 定义项目的放大比例。默认值是0，即即使存在剩余空间也不放大
- flex-shrink: 定义项目的缩小比例。默认值是1，负值对该属性无效
- flex-basis: 定义在分配多余空间之前，项目占据的主轴空间，默认值是 auto，即项目本来的大小
- flex: 是 flex-grow、flex-shrink和flex-basis 的缩写，默认值是 0 1 auto。它有两个快捷值 auto(1, 1, auto) 和 none(0 0 auto)
- align-self: 允许单个项目有与其他项目不一样的对齐方式，可覆盖父元素定义的 align-items 属性，默认值是 auto，表示继承父元素的 align-items 属性值