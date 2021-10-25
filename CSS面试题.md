## 01. 盒模型

盒模型分为标准盒模型和怪异盒模型

- 标准盒模型：实际宽度由 宽度 + padding + border 组成(box-sizing: content-box)
- 怪异盒模型：内容宽度为 定义的宽度 - padding - border(box-sizing: border-box)

## 02. 什么是文档流

文档流是元素在 web 页面上的一种呈现方式，按照出现的先后顺序进行排列

## 03. 什么是BFC

BFC 即 Block Formatting Contexts(块级格式上下文)。它是页面中的一块区域，它决定了子元素将如何定位，以及和其他元素的关系和相互作用。

具有BFC特性的元素可以看做是隔离的容器，它的子元素在布局上不会影响到外面的元素

## 04. 触发BFC的条件

- float 不为 none
- position 的值不是 static 或 relative
- overflow 的值不是 visible
- display 的值是 inline-block / table-cell / flex / inline-flex / table-caption

## 05. BFC的作用

- 解决 margin-top 向上传递的问题
- 解决 margin 上下叠加的问题
- 清除浮动

## 06. 清除浮动的方式

同一层级的元素：另外的元素设置样式 clear: both;

子元素清除父元素的浮动：

- clear属性
- BFC
- 空元素
- 给父元素设置 .clearfix::after{}

```css
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
```

## 07. 盒子里的文字上下居中

```css
.box {
  height: 100px;
  line-height: 100px;
}
```

```css
.box {
  display: table-cell;
  vertical-align: middle;
}
```

```css
.box {
  display: flex;
  align-items: center;
}
```

```css
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
```

## 08. 盒子里的盒子上下左右居中

```css
.container {
  position: relative;
}
.box {
  display: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
}
```

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

```css
.container {
  display: grid;
  justify-content: center;
  align-content: center;
}
```

```css
.container {
  display: flex;
  /* display: inline-flex; */
}
.box {
  margin: 0 auto;
}
```

```css
.container {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

```css
.container {
  display: table-cell;
  vertical-align: middle;
}
.box {
  margin: 0 auto;
}
```

## 09. rem 和 em 的区别

- rem 是相对于根元素(html)的 font-size 的，1rem = 根元素的 font-size
- em 如果元素自身定义了 font-size，1em = 元素自身的 font-size，如果元素自身没有定义 font-size，那么 1em = 元素的父元素(设置了font-size的父元素)的 font-size
- 如果元素自身的 font-size 设置的就是 em，那么元素自身的 font-size 就根据父元素的 font-size 计算得到