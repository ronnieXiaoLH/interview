## 01. px 和 em 的区别

### 简要回答

px 是固定单位，em 是相对单位。px 值不会随上下文变化，而 em 会根据当前元素或父元素的字体大小动态计算。

### 详细解答

1. **基本概念**

   - px（像素）

     - 绝对长度单位
     - 1px 代表屏幕的一个物理像素点
     - 值不受上下文影响

   - em（相对单位）
     - 相对长度单位
     - 相对于当前元素的 font-size
     - 如果未设置则继承父元素的 font-size

2. **计算规则**

   - px 计算

     ```css
     .box {
       width: 100px; /* 固定为 100 像素 */
       font-size: 16px; /* 固定为 16 像素 */
     }
     ```

   - em 计算
     ```css
     .parent {
       font-size: 16px;
     }
     .child {
       font-size: 1.2em; /* 16px * 1.2 = 19.2px */
       padding: 1em; /* 19.2px（相对于自身的 font-size） */
       margin: 1em; /* 19.2px */
     }
     ```

3. **应用场景**

   - px 适用场景

     - 边框宽度
     - 图片尺寸
     - 固定宽度布局
     - 需要精确控制的场景

   - em 适用场景
     - 文本相关属性
     - 响应式布局
     - 组件内部间距
     - 需要随字体缩放的场景

### 使用建议（面试加分项）

1. **选择标准**

   - 考虑可维护性

     - px 更直观易维护
     - em 需要注意继承关系

   - 考虑响应式需求
     - px 不利于响应式
     - em 适合弹性布局

2. **常见陷阱**

   - em 的复合计算

     - 多层嵌套时会产生叠加效果
     - 需要注意计算基准的变化

   - 浏览器兼容性
     - px 在高分屏下可能模糊
     - em 在不同浏览器可能有舍入差异

3. **最佳实践**

   - 合理混用

     - 结构布局使用 px
     - 文字排版使用 em
     - 响应式布局考虑 rem

   - 避免过度嵌套

     - 控制 em 的继承层级
     - 必要时重置 font-size

   - 保持一致性
     - 项目中统一使用规范
     - 做好团队规范文档

## 02. rem 和 em 的区别

### 简要回答

rem 和 em 都是相对单位，但计算基准不同：em 是相对于当前元素或父元素的 font-size，而 rem 则是相对于根元素（html）的 font-size。

### 详细解答

1. **计算基准**

   - em 特点

     - 相对于当前元素的 font-size
     - 如果当前元素未设置则继承父元素
     - 可能存在层层叠加的问题

   - rem 特点
     - 只相对于根元素（html）的 font-size
     - 计算更简单直观
     - 避免了嵌套带来的叠加问题

2. **使用示例**

   ```css
   html {
     font-size: 16px; /* 根元素字体大小 */
   }

   .parent {
     font-size: 20px;
   }

   .child-em {
     font-size: 1.2em; /* 20px * 1.2 = 24px */
     padding: 1em; /* 24px（相对于自身） */
     margin: 1em; /* 24px */
   }

   .child-rem {
     font-size: 1.2rem; /* 16px * 1.2 = 19.2px */
     padding: 1rem; /* 16px（相对于根元素） */
     margin: 1rem; /* 16px */
   }
   ```

3. **应用场景**

   - em 适用场景

     - 组件内部间距
     - 需要继承父元素比例的场景
     - 文本相关的属性设置

   - rem 适用场景
     - 响应式布局
     - 整站的布局设置
     - 需要统一参考标准的场景

### 使用建议（面试加分项）

1. **选择考虑因素**

   - 使用 em

     - 当需要元素根据自身字体大小变化
     - 组件级别的样式设计
     - 需要基于父元素比例计算

   - 使用 rem
     - 需要统一的响应式标准
     - 避免复杂的层级计算
     - 全局布局和排版

2. **常见问题**

   - em 的问题

     - 嵌套计算复杂
     - 维护成本高
     - 容易产生意外结果

   - rem 的问题
     - IE9 以下不支持
     - 需要设置根元素大小
     - 可能需要 JavaScript 辅助

3. **最佳实践**

   - 响应式方案

     ```css
     /* 基于 rem 的响应式设置 */
     html {
       font-size: calc(100vw / 37.5); /* 移动端适配 */
     }

     /* 混合使用 */
     .component {
       font-size: 1rem; /* 基准字号 */
       padding: 1.2em; /* 相对于组件自身 */
       margin: 1rem; /* 相对于根元素 */
     }
     ```

   - 维护建议
     - 制定团队统一标准
     - 合理划分使用场景
     - 做好注释和文档说明

## 03. vw 和 vh 的区别

### 简要回答

vw 和 vh 都是视口相关的单位，vw 是相对视口宽度的单位，vh 是相对视口高度的单位。1vw 等于视口宽度的 1%，1vh 等于视口高度的 1%。

### 详细解答

1. **基本概念**

   - vw（viewport width）

     - 相对于视口宽度的单位
     - 1vw = 视口宽度的 1%
     - 100vw = 视口的完整宽度

   - vh（viewport height）
     - 相对于视口高度的单位
     - 1vh = 视口高度的 1%
     - 100vh = 视口的完整高度

2. **使用示例**

   ```css
   /* 基础使用 */
   .full-screen {
     width: 100vw; /* 铺满视口宽度 */
     height: 100vh; /* 铺满视口高度 */
   }

   /* 响应式布局 */
   .hero-section {
     min-height: 50vh; /* 至少占据一半视口高度 */
     padding: 5vw; /* 两侧内边距随视口宽度变化 */
   }

   /* 字体响应式 */
   .responsive-text {
     font-size: calc(2vw + 1rem); /* 基础字号加上随视口变化的大小 */
   }
   ```

3. **相关单位**

   - vmin

     - 取 vw 和 vh 中的较小值
     - 适合保持宽高比例

   - vmax
     - 取 vw 和 vh 中的较大值
     - 适合覆盖最大尺寸

### 使用建议（面试加分项）

1. **适用场景**

   - 全屏布局

     - 登录页面
     - 着陆页
     - 全屏轮播

   - 响应式设计
     - 自适应内容
     - 流体布局
     - 动态间距

2. **常见问题**

   - 移动端兼容性

     - 地址栏高度影响
     - 键盘弹出影响 vh
     - 需要考虑安全区域

   - 溢出问题
     - 100vw 可能导致横向滚动
     - 需要配合 overflow 处理
     - 注意滚动条占用空间

3. **最佳实践**

   - 布局技巧

     ```css
     /* 防止溢出的全屏布局 */
     .safe-full-screen {
       width: 100%;
       min-height: 100vh;
       overflow-x: hidden;
     }

     /* 考虑移动端的动态高度 */
     .mobile-full-height {
       height: 100vh;
       height: -webkit-fill-available; /* 移动端兼容 */
     }

     /* 响应式容器 */
     .fluid-container {
       width: 90vw;
       max-width: 1200px;
       margin: 0 auto;
     }
     ```

   - 性能优化

     - 避免频繁使用在动画中
     - 考虑使用 transform 代替
     - 合理使用硬件加速

   - 跨平台适配
     - 考虑不同设备特性
     - 测试各种视口尺寸
     - 提供降级方案

## 04. 如何让一个元素水平垂直居中

### 简要回答

实现元素水平垂直居中有多种方法，主要包括 Flex 布局、Grid 布局、定位配合 transform、margin 等方案，每种方案都有其适用场景和兼容性考虑。

### 详细解答

1. **Flex 布局方案**

   ```css
   /* 方案1：justify-content + align-items */
   .parent {
     display: flex;
     justify-content: center;
     align-items: center;
   }

   /* 方案2：margin: auto */
   .parent {
     display: flex;
   }
   .child {
     margin: auto;
   }
   ```

2. **Grid 布局方案**

   ```css
   /* 方案1：place-items */
   .parent {
     display: grid;
     place-items: center;
   }

   /* 方案2：place-content */
   .parent {
     display: grid;
     place-content: center;
   }

   /* 方案3：margin: auto */
   .parent {
     display: grid;
   }
   .child {
     margin: auto;
   }
   ```

3. **绝对定位方案**

   ```css
   /* 方案1：负边距（需知道子元素宽高） */
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     width: 100px;
     height: 100px;
     margin-top: -50px; /* height 的一半 */
     margin-left: -50px; /* width 的一半 */
   }

   /* 方案2：transform（不需要知道子元素宽高） */
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }

   /* 方案3：margin: auto（需设置子元素所有方向距离） */
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
     margin: auto;
   }
   ```

4. **表格布局方案**

   ```css
   /* 方案1：display: table-cell */
   .parent {
     display: table-cell;
     text-align: center;
     vertical-align: middle;
   }
   .child {
     display: inline-block;
   }

   /* 方案2：display: table */
   .parent {
     display: table;
   }
   .child {
     display: table-cell;
     text-align: center;
     vertical-align: middle;
   }
   ```

5. **calc 计算方案**
   ```css
   .parent {
     position: relative;
   }
   .child {
     position: absolute;
     width: 100px;
     height: 100px;
     top: calc(50% - 50px);
     left: calc(50% - 50px);
   }
   ```

### 使用建议（面试加分项）

1. **方案选择考虑因素**

   - 兼容性要求

     - Flex/Grid 现代浏览器优先
     - 表格布局兼容性最好
     - position 方案兼容性好

   - 使用场景
     - 固定宽高：可用负边距
     - 不固定宽高：推荐 Flex/Grid
     - 自适应内容：transform 方案

2. **性能考虑**

   - transform 硬件加速

     - 性能较好
     - 可能出现模糊

   - 布局方式影响
     - Flex/Grid 可能重排
     - 定位方案重排较少
     - calc 需要计算成本

3. **最佳实践**

   ```css
   /* 推荐的通用方案 */
   .center {
     /* 首选方案：Flex */
     display: flex;
     justify-content: center;
     align-items: center;
   }

   /* 降级方案 */
   .center-fallback {
     /* 兼容旧浏览器 */
     position: relative;
   }
   .center-fallback .item {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

4. **注意事项**

   - 内容特性

     - 文本建议用 line-height
     - 图片可用 object-fit
     - 考虑内容溢出情况

   - 响应式设计

     - 选择灵活的方案
     - 避免固定数值
     - 考虑边界情况

   - 浏览器兼容
     - 提供降级方案
     - 测试主流浏览器
     - 考虑移动端适配

## 05. 隐藏页面中某个元素的方法有哪些？

### 简要回答

隐藏页面元素的方法有多种，主要包括 display:none、visibility:hidden、opacity:0 等，不同方法在可访问性、性能和交互效果上有所区别。

### 详细解答

1. **完全隐藏（不占空间）**

   - display: none

     ```css
     .hidden {
       display: none;
     }
     ```

     - 特点：
       - 完全从文档流移除
       - 不占据空间
       - 子元素无法显示
       - 会触发回流和重绘

   - HTML5 hidden 属性
     ```html
     <div hidden>这个元素被隐藏</div>
     ```
     - 特点：
       - 等同于 display:none
       - 语义化更好
       - 可通过 CSS 覆盖

2. **占据空间的隐藏**

   - visibility: hidden

     ```css
     .invisible {
       visibility: hidden;
     }
     ```

     - 特点：
       - 元素仍占据空间
       - 只触发重绘
       - 子元素可单独显示

   - opacity: 0
     ```css
     .transparent {
       opacity: 0;
     }
     ```
     - 特点：
       - 元素仍占据空间
       - 可以点击交互
       - 支持过渡动画
       - 创建新的层叠上下文

3. **其他隐藏方式**

   - 通过位置隐藏

     ```css
     .position-hidden {
       position: absolute;
       left: -9999px;
       top: -9999px;
     }
     ```

   - 通过尺寸隐藏

     ```css
     .size-hidden {
       width: 0;
       height: 0;
       overflow: hidden;
     }
     ```

   - 通过裁剪隐藏
     ```css
     .clip-hidden {
       position: absolute;
       clip: rect(0 0 0 0);
       clip-path: inset(50%);
     }
     ```

### 使用建议（面试加分项）

1. **选择考虑因素**

   - 性能影响

     - display:none 会触发回流
     - visibility/opacity 只触发重绘
     - transform 使用 GPU 加速

   - 交互需求
     - 是否需要动画过渡
     - 是否需要保持交互
     - 是否影响布局流

2. **常见应用场景**

   - 弹窗显示隐藏

     ```css
     .modal {
       opacity: 0;
       visibility: hidden;
       transition: all 0.3s;
     }
     .modal.show {
       opacity: 1;
       visibility: visible;
     }
     ```

   - 无障碍隐藏
     ```css
     .visually-hidden {
       position: absolute;
       width: 1px;
       height: 1px;
       padding: 0;
       margin: -1px;
       overflow: hidden;
       clip: rect(0, 0, 0, 0);
       border: 0;
     }
     ```

3. **最佳实践**

   - 动画场景

     - 使用 opacity + visibility
     - 配合 transition 实现过渡
     - 考虑性能优化

   - SEO 考虑

     - 内容需索引用 visibility
     - 完全隐藏用 display:none
     - 无障碍访问用 clip 方案

   - 性能优化
     - 避免频繁切换 display
     - 合理使用 GPU 加速
     - 控制隐藏元素数量

## 06. 清除浮动的方式有哪些？

### 简要回答

清除浮动主要有以下几种方式：使用 clear 属性、创建 BFC、使用伪元素等。清除浮动的目的是解决父元素高度塌陷问题。

### 详细解答

1. **使用 clear 属性**

   ```html
   <!-- 方式1：额外标签法 -->
   <div class="parent">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
     <div class="clear"></div>
   </div>

   <style>
     .float-left {
       float: left;
       width: 100px;
       height: 100px;
       background: #f0f0f0;
     }
     .clear {
       clear: both;
     }
   </style>
   ```

2. **使用伪元素（推荐）**

   ```html
   <div class="parent clearfix">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
   </div>

   <style>
     /* 方式1：单伪元素 */
     .clearfix::after {
       content: '';
       display: block;
       clear: both;
       visibility: hidden;
       height: 0;
     }

     /* 方式2：双伪元素（推荐） */
     .clearfix::before,
     .clearfix::after {
       content: '';
       display: table;
     }
     .clearfix::after {
       clear: both;
     }
     .clearfix {
       *zoom: 1; /* IE6-7 */
     }
   </style>
   ```

3. **创建 BFC**

   ```html
   <!-- 方式1：overflow -->
   <div class="parent overflow-hidden">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
   </div>

   <style>
     .overflow-hidden {
       overflow: hidden;
     }
   </style>

   <!-- 方式2：display:flow-root -->
   <div class="parent flow-root">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
   </div>

   <style>
     .flow-root {
       display: flow-root;
     }
   </style>

   <!-- 方式3：display:inline-block -->
   <div class="parent inline-block">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
   </div>

   <style>
     .inline-block {
       display: inline-block;
       width: 100%;
     }
   </style>
   ```

4. **父元素设置高度**

   ```html
   <div class="parent fixed-height">
     <div class="float-left">浮动元素1</div>
     <div class="float-left">浮动元素2</div>
   </div>

   <style>
     .fixed-height {
       height: 100px; /* 确定的高度 */
     }
   </style>
   ```

### 使用建议（面试加分项）

1. **完整示例对比**

   ```html
   <!-- 问题代码 -->
   <div class="container">
     <div class="float-box">浮动元素1</div>
     <div class="float-box">浮动元素2</div>
   </div>

   <style>
     /* 问题样式 */
     .container {
       border: 2px solid #000;
     }
     .float-box {
       float: left;
       width: 100px;
       height: 100px;
       background: #f0f0f0;
       margin: 10px;
     }

     /* 解决方案1：伪元素清除 */
     .clearfix::after {
       content: '';
       display: block;
       clear: both;
     }

     /* 解决方案2：BFC */
     .bfc-container {
       overflow: hidden;
     }

     /* 解决方案3：flex布局替代 */
     .flex-container {
       display: flex;
       flex-wrap: wrap;
     }
   </style>
   ```

2. **最佳实践示例**

   ```css
   /* 现代化清除浮动方案 */
   .modern-clearfix {
     /* 优先使用 flow-root */
     display: flow-root;
   }

   /* 兼容性方案 */
   .compatible-clearfix::before,
   .compatible-clearfix::after {
     content: '';
     display: table;
   }
   .compatible-clearfix::after {
     clear: both;
   }
   .compatible-clearfix {
     *zoom: 1;
   }

   /* 响应式布局中替代方案 */
   .flex-layout {
     display: flex;
     flex-wrap: wrap;
     gap: 20px;
   }
   ```

3. **性能优化示例**

   ```css
   /* 避免过多的浮动元素 */
   .grid-layout {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
     gap: 20px;
   }

   /* 合理使用 BFC */
   .optimized-container {
     display: flow-root;
     margin: 20px 0;
   }
   ```

## 07. 介绍下 BFC 及其应用

### 简要回答

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中一个独立的渲染区域，有自己的渲染规则。它决定了其子元素如何定位，以及和其他元素的关系和相互作用。

### 详细解答

1. **如何创建 BFC**

   ```css
   /* 方式1：overflow */
   .bfc-overflow {
     overflow: hidden;
     /* 或 auto, scroll */
   }

   /* 方式2：float */
   .bfc-float {
     float: left;
     /* 或 right */
   }

   /* 方式3：position */
   .bfc-position {
     position: absolute;
     /* 或 fixed */
   }

   /* 方式4：display */
   .bfc-display {
     display: inline-block;
     /* 或 flex, grid, flow-root */
   }

   /* 方式5：根元素 */
   html {
     /* <html> 标签本身就是 BFC */
   }
   ```

2. **BFC 特性**

   ```html
   <!-- 1. 内部盒子垂直方向排列 -->
   <div class="bfc-container">
     <div class="box">Box 1</div>
     <div class="box">Box 2</div>
   </div>

   <!-- 2. 同一 BFC 内相邻元素外边距折叠 -->
   <div class="bfc-container">
     <p style="margin: 20px 0">Paragraph 1</p>
     <p style="margin: 20px 0">Paragraph 2</p>
   </div>

   <!-- 3. BFC 包含浮动元素 -->
   <div class="bfc-container">
     <div class="float-left">Float</div>
     <p>Content</p>
   </div>

   <style>
     .bfc-container {
       overflow: hidden; /* 创建 BFC */
     }
     .float-left {
       float: left;
     }
   </style>
   ```

3. **实际应用场景**

   ```html
   <!-- 1. 防止外边距折叠 -->
   <div class="bfc">
     <p style="margin: 20px 0">不会和外部元素产生外边距折叠</p>
   </div>

   <!-- 2. 清除浮动 -->
   <div class="clear-float">
     <div class="float-item">浮动元素</div>
   </div>

   <!-- 3. 自适应两栏布局 -->
   <div class="layout">
     <div class="aside">侧边栏</div>
     <div class="main">主内容区</div>
   </div>

   <style>
     /* 防止外边距折叠 */
     .bfc {
       display: flow-root;
     }

     /* 清除浮动 */
     .clear-float {
       overflow: hidden;
     }
     .float-item {
       float: left;
     }

     /* 自适应两栏布局 */
     .layout {
       overflow: hidden; /* 创建 BFC */
     }
     .aside {
       float: left;
       width: 200px;
     }
     .main {
       overflow: hidden; /* 创建 BFC */
     }
   </style>
   ```

### 使用建议（面试加分项）

1. **最佳实践**

   ```css
   /* 现代布局方案 */
   .modern-bfc {
     /* 推荐使用 flow-root */
     display: flow-root;
   }

   /* 兼容性方案 */
   .compatible-bfc {
     /* 兼容性最好的方案 */
     overflow: hidden;
   }

   /* 自适应布局 */
   .adaptive-layout {
     /* 使用 flex 替代传统 BFC 布局 */
     display: flex;
   }
   ```

2. **性能考虑**

   ```css
   /* 避免滥用 overflow: hidden */
   .better-practice {
     display: flow-root;
     /* 比 overflow: hidden 更清晰的语义 */
   }

   /* 使用 flex 布局替代 */
   .flex-layout {
     display: flex;
     gap: 20px;
     /* 现代布局方案，性能更好 */
   }
   ```

3. **常见问题解决**

   ```css
   /* 1. 防止文字环绕 */
   .text-wrap {
     overflow: hidden;
   }

   /* 2. 防止高度塌陷 */
   .container {
     display: flow-root;
   }

   /* 3. 隔离布局上下文 */
   .isolated {
     display: flow-root;
     margin: 20px 0;
   }
   ```

4. **注意事项**

   - 合理选择方式

     - 优先使用 display: flow-root
     - 避免使用 float 创建 BFC
     - 根据场景选择合适方案

   - 性能优化

     - 避免过度使用 BFC
     - 考虑使用现代布局方案
     - 注意渲染性能

   - 兼容性处理
     - 考虑浏览器支持情况
     - 提供降级方案
     - 测试不同场景

## 08. 介绍下 IFC、GFC 和 FFC

### 简要回答

IFC（Inline Formatting Context）、GFC（Grid Formatting Context）和 FFC（Flex Formatting Context）是与 BFC 类似的格式化上下文，分别用于内联元素、网格布局和弹性布局的渲染。

### 详细解答

1. **IFC（行内格式化上下文）**

   ```html
   <!-- IFC 示例 -->
   <p>这是一个<span>行内元素</span>的<strong>示例</strong></p>

   <style>
   /* IFC 特性 */
   .ifc-container {
       font-size: 16px;
       line-height: 1.5;
   }
   .ifc-container span {
       padding: 0 5px;
       margin: 0 5px;  /* 水平方向 margin 有效 */
       /* vertical-align 属性有效 */
       vertical-align: middle;
   }
   ```

   - 特点：
     - 水平方向排列
     - 受 text-align 影响
     - vertical-align 生效
     - margin/padding 垂直方向无效

2. **GFC（网格格式化上下文）**

   ```css
   /* 创建 GFC */
   .grid-container {
     display: grid;
     /* 或 display: inline-grid */
     grid-template-columns: repeat(3, 1fr);
     grid-gap: 20px;
   }

   /* 网格项目定位 */
   .grid-item {
     grid-column: span 2;
     grid-row: 1;
   }

   /* 网格区域命名 */
   .grid-layout {
     display: grid;
     grid-template-areas:
       'header header'
       'sidebar content'
       'footer footer';
   }
   ```

   - 特点：
     - 二维布局系统
     - 行列控制精确
     - 支持区域命名
     - 自动分配空间

3. **FFC（弹性格式化上下文）**

   ```css
   /* 创建 FFC */
   .flex-container {
     display: flex;
     /* 或 display: inline-flex */
     justify-content: space-between;
     align-items: center;
   }

   /* 弹性项目属性 */
   .flex-item {
     flex: 1;
     /* 等同于 */
     flex-grow: 1;
     flex-shrink: 1;
     flex-basis: 0%;
   }

   /* 常见布局示例 */
   .flex-layout {
     display: flex;
     flex-wrap: wrap;
     gap: 20px;
   }
   ```

   - 特点：
     - 一维布局系统
     - 主轴交叉轴
     - 空间自动分配
     - 支持方向切换

### 使用建议（面试加分项）

1. **选择合适的格式化上下文**

   ```css
   /* 文本排版使用 IFC */
   .text-content {
     line-height: 1.5;
     text-align: justify;
   }

   /* 复杂布局使用 GFC */
   .dashboard {
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap: 20px;
   }

   /* 一维布局使用 FFC */
   .navigation {
     display: flex;
     justify-content: space-between;
     align-items: center;
   }
   ```

2. **实际应用场景**

   ```css
   /* IFC 应用：文本垂直对齐 */
   .vertical-center {
     line-height: 40px; /* 等于容器高度 */
   }

   /* GFC 应用：响应式卡片布局 */
   .card-container {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: 20px;
   }

   /* FFC 应用：导航栏布局 */
   .navbar {
     display: flex;
     justify-content: space-between;
     padding: 0 20px;
   }
   ```

3. **最佳实践**

   - 布局选择

     ```css
     /* 一维布局优先选择 Flex */
     .flex-first {
       display: flex;
       gap: 20px;
     }

     /* 二维布局优先选择 Grid */
     .grid-first {
       display: grid;
       grid-template-columns: repeat(3, 1fr);
     }

     /* 文本处理使用 IFC */
     .text-layout {
       text-align: justify;
       line-height: 1.5;
     }
     ```

4. **注意事项**

   - IFC 注意点

     - 只能包含行内级别元素
     - 垂直方向 margin/padding 无效
     - 需要注意基线对齐问题

   - GFC 注意点

     - 考虑兼容性支持
     - 注意性能消耗
     - 合理使用自动布局

   - FFC 注意点
     - 注意主轴方向
     - 考虑换行情况
     - 合理使用 flex 简写

## 09. 介绍一下 position 属性

### 简要回答

position 属性用于指定一个元素在文档中的定位方式。主要包括 static、relative、absolute、fixed 和 sticky 五个值，每种定位方式都有其特定的用途和行为特征。

### 详细解答

1. **position 的五个值**

   ```css
   /* 1. static（默认值） */
   .static {
     position: static;
     /* top, right, bottom, left 属性无效 */
   }

   /* 2. relative（相对定位） */
   .relative {
     position: relative;
     top: 10px;
     left: 20px; /* 相对于原来的位置偏移 */
   }

   /* 3. absolute（绝对定位） */
   .absolute {
     position: absolute;
     top: 0;
     right: 0; /* 相对于最近的非 static 定位祖先元素 */
   }

   /* 4. fixed（固定定位） */
   .fixed {
     position: fixed;
     bottom: 20px;
     right: 20px; /* 相对于浏览器视口 */
   }

   /* 5. sticky（粘性定位） */
   .sticky {
     position: sticky;
     top: 0; /* 在视口中滚动到这个位置时固定 */
   }
   ```

2. **常见应用场景**

   ```css
   /* 1. 固定导航栏 */
   .navbar {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     z-index: 1000;
   }

   /* 2. 模态框遮罩 */
   .modal-overlay {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: rgba(0, 0, 0, 0.5);
   }

   /* 3. 下拉菜单 */
   .dropdown {
     position: relative;
   }
   .dropdown-menu {
     position: absolute;
     top: 100%;
     left: 0;
   }

   /* 4. 粘性头部 */
   .sticky-header {
     position: sticky;
     top: 0;
     background: #fff;
     z-index: 100;
   }
   ```

3. **定位特性**

   ```css
   /* 定位上下文 */
   .positioning-context {
     position: relative; /* 创建定位上下文 */
   }
   .absolute-child {
     position: absolute; /* 相对于 positioning-context 定位 */
   }

   /* 层叠顺序 */
   .layer {
     position: absolute;
     z-index: 1; /* 控制层叠顺序 */
   }
   ```

### 使用建议（面试加分项）

1. **性能考虑**

   ```css
   /* 使用 transform 代替定位 */
   .better-performance {
     position: absolute;
     /* 不推荐 */
     top: 50%;
     left: 50%;
     margin-top: -50px;
     margin-left: -50px;

     /* 推荐 */
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

2. **常见问题解决**

   ```css
   /* 1. 防止固定定位脱离文档流导致的跳动 */
   .container {
     padding-top: 60px; /* 导航栏高度 */
   }
   .fixed-nav {
     position: fixed;
     height: 60px;
   }

   /* 2. sticky 兼容性处理 */
   .sticky-fallback {
     position: -webkit-sticky;
     position: sticky;
     top: 0;
   }

   /* 3. 绝对定位居中 */
   .absolute-center {
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%);
   }
   ```

3. **最佳实践**

   - 定位选择

     ```css
     /* 1. 局部位置调整用 relative */
     .minor-adjust {
       position: relative;
       top: 2px; /* 微调位置 */
     }

     /* 2. 弹窗类用 fixed */
     .modal {
       position: fixed;
       /* 确保覆盖整个视口 */
       inset: 0; /* 等同于 top:0; right:0; bottom:0; left:0; */
     }

     /* 3. 依赖父元素的定位用 absolute */
     .tooltip {
       position: absolute;
       top: 100%;
       left: 50%;
       transform: translateX(-50%);
     }
     ```

   - 性能优化

     - 避免频繁改变定位属性
     - 使用 transform 代替位置改变
     - 合理使用 will-change 属性

   - 布局考虑
     - 注意文档流的影响
     - 考虑响应式布局需求
     - 处理好层叠上下文关系

## 10. 请简述 CSS 中属性的计算过程

### 简要回答

CSS 属性的计算过程主要包括四个步骤：声明值、层叠值、继承值和计算值。这个过程决定了最终元素会呈现什么样的效果。

### 详细解答

1. **声明值（Specified Value）**

   ```css
   /* 1. 来自样式表的声明 */
   .box {
     color: blue;
     font-size: 16px;
   }

   /* 2. 来自内联样式 */
   <div style="color: red;">内联样式</div>
   
   /* 3. 来自默认样式 */
   body {
     /* 浏览器默认样式 */
     margin: 8px;
     font-size: 16px;
   }
   ```

2. **层叠值（Cascaded Value）**

   ```css
   /* 样式优先级示例 */
   #id-selector {
     color: blue; /* 权重: 100 */
   }
   .class-selector {
     color: green; /* 权重: 10 */
   }
   div {
     color: red; /* 权重: 1 */
   }

   /* !important 的使用 */
   .important-example {
     color: red !important; /* 最高优先级 */
   }
   ```

3. **继承值（Inherited Value）**

   ```css
   /* 继承示例 */
   .parent {
     color: blue; /* 会被继承 */
     border: 1px solid; /* 不会被继承 */
   }

   /* 强制继承 */
   .child {
     border: inherit; /* 强制继承父元素的边框 */
   }

   /* 阻止继承 */
   .no-inherit {
     color: initial; /* 使用属性的初始值 */
   }
   ```

### 使用建议（面试加分项）

1. **优先级控制**

   ```css
   /* 1. 选择器优先级 */
   .good-practice {
     /* 避免过度使用 !important */
     color: blue;

     /* 使用更具体的选择器 */
     .specific-context & {
       color: red;
     }
   }

   /* 2. 组织样式顺序 */
   .component {
     /* 基础样式 */
     color: black;

     /* 特定场景覆盖 */
     &.active {
       color: blue;
     }
   }
   ```

2. **继承处理**

   ```css
   /* 1. 合理利用继承 */
   .text-content {
     /* 文字相关属性自动继承 */
     font-family: Arial;
     line-height: 1.5;
     color: #333;
   }

   /* 2. 继承控制 */
   .reset-inheritance {
     all: initial; /* 重置所有属性为初始值 */
     all: unset; /* 重置为未设置状态 */
     all: revert; /* 恢复到浏览器默认样式 */
   }
   ```

3. **最佳实践**

   - 选择器使用

     ```css
     /* 避免过深的选择器嵌套 */
     .good-selector {
       /* 最多不超过3层 */
       & .child {
         & .grandchild {
           color: blue;
         }
       }
     }
     ```

   - 样式组织

     ```css
     /* 模块化组织样式 */
     .module {
       /* 基础样式 */
       &__element {
         /* 元素样式 */
       }
       &--modifier {
         /* 修饰符样式 */
       }
     }
     ```

   - 性能考虑

     ```css
     /* 避免全局修改 */
     * {
       /* 避免在全局选择器中设置影响性能的属性 */
       box-sizing: border-box;
     }

     /* 使用类选择器替代标签选择器 */
     .list-item {
       /* 比 li 选择器性能更好 */
     }
     ```

4. **注意事项**

   - 优先级控制

     - 避免滥用 !important
     - 合理使用选择器
     - 保持样式可维护性

   - 继承管理

     - 了解哪些属性会继承
     - 合理使用继承机制
     - 注意继承带来的副作用

   - 性能优化
     - 减少选择器复杂度
     - 避免不必要的继承
     - 合理使用简写属性

## 11. 请简述一下 CSS 中的层叠规则

### 简要回答

CSS 层叠规则决定了当多个样式规则应用到同一个元素时，如何确定最终的样式。主要遵循重要性、专用性、源代码顺序这三个基本原则。

### 详细解答

1. **优先级顺序**

   ```css
   /* 1. !important 声明 */
   .important-rule {
     color: blue !important; /* 最高优先级 */
   }

   /* 2. 内联样式 */
   <div style="color: red;">内联样式</div>
   
   /* 3. ID 选择器 */
   #specific-id {
     color: green; /* 权重 100 */
   }

   /* 4. 类选择器/属性选择器/伪类 */
   .my-class {
     color: yellow; /* 权重 10 */
   }
   [type='text'] {
     color: orange; /* 权重 10 */
   }
   :hover {
     color: purple; /* 权重 10 */
   }

   /* 5. 元素选择器/伪元素 */
   div {
     color: black; /* 权重 1 */
   }
   ::before {
     color: gray; /* 权重 1 */
   }
   ```

2. **权重计算**

   ```css
   /* 复合选择器权重计算 */
   #nav .list li a:hover {
     /* 权重: 100 + 10 + 1 + 1 + 10 = 122 */
     color: blue;
   }

   /* 多个类叠加 */
   .btn.primary.large {
     /* 权重: 10 + 10 + 10 = 30 */
     color: white;
   }

   /* 直接子元素选择器 */
   .parent > .child {
     /* 权重: 10 + 10 = 20 */
     color: green;
   }
   ```

3. **源码顺序**

   ```css
   /* 相同权重时，后面的覆盖前面的 */
   .button {
     color: blue;
   }
   .button {
     color: red; /* 这个生效 */
   }

   /* 不同来源的样式表 */
   /* 1. 用户代理样式表（浏览器默认样式） */
   /* 2. 用户样式表 */
   /* 3. 作者样式表（开发者定义的样式） */
   /* 4. 作者样式表中的 !important */
   /* 5. 用户样式表中的 !important */
   ```

### 使用建议（面试加分项）

1. **选择器最佳实践**

   ```css
   /* 1. 避免过度特殊化 */
   /* 不推荐 */
   #header .nav ul li a {
     color: blue;
   }

   /* 推荐 */
   .nav-link {
     color: blue;
   }

   /* 2. 合理使用类选择器 */
   .btn {
     /* 基础样式 */
     padding: 10px 20px;
   }
   .btn--primary {
     /* 扩展样式 */
     background: blue;
   }
   ```

2. **性能优化**

   ```css
   /* 1. 避免深层嵌套 */
   /* 不推荐 */
   .header .nav .list .item .link {
     color: blue;
   }

   /* 推荐 */
   .nav-link {
     color: blue;
   }

   /* 2. 合理使用继承 */
   .text-content {
     /* 文字相关属性自动继承 */
     color: #333;
     font-family: Arial;
   }
   ```

3. **最佳实践**

   - 选择器规范

     ```css
     /* 使用 BEM 命名规范 */
     .block {
       /* 块级元素 */
     }
     .block__element {
       /* 元素 */
     }
     .block--modifier {
       /* 修饰符 */
     }
     ```

   - 避免问题

     ```css
     /* 避免使用 !important */
     .specific-case {
       /* 使用更具体的选择器替代 !important */
       .parent & {
         color: blue;
       }
     }
     ```

   - 维护建议
     - 保持选择器简单
     - 避免过度依赖层叠
     - 使用合适的命名规范
     - 及时重构复杂的选择器
     - 注意样式冲突处理

## 12. CSS 引用的方式有哪些？link 和 @import 的区别是什么？

### 简要回答

CSS 引用方式主要有四种：外部样式表（link 标签）、内部样式表（style 标签）、内联样式（style 属性）和 @import 导入。其中 link 和 @import 都是外部引用 CSS 的方式，但在加载机制和使用场景上有明显区别。

### 详细解答

1. **CSS 引用方式**

   ```html
   <!-- 1. 外部样式表 -->
   <link rel="stylesheet" href="styles.css" />

   <!-- 2. 内部样式表 -->
   <style>
     .button {
       color: blue;
     }
   </style>

   <!-- 3. 内联样式 -->
   <div style="color: red; font-size: 16px;">内联样式</div>

   <!-- 4. @import 导入 -->
   <style>
     @import url('styles.css');
     @import 'theme.css' screen and (min-width: 768px);
   </style>
   ```

2. **link 和 @import 的区别**

   ```css
   /* link 方式（在 HTML 中） */
   <link rel="stylesheet" href="style.css">
   <link rel="stylesheet" href="print.css" media="print">

   /* @import 方式 */
   /* 在 CSS 文件中 */
   @import url("common.css");
   @import url("components.css") screen and (min-width: 768px);

   /* 在 style 标签中 */
   <style>
     @import url("style.css");
     /* 本地样式 */
     .local-style {
       color: blue;
     }
   </style>
   ```

3. **加载特性对比**

   ```html
   <!-- link 并行加载 -->
   <link rel="stylesheet" href="style1.css" />
   <link rel="stylesheet" href="style2.css" />

   <!-- @import 串行加载 -->
   <style>
     @import url('style1.css'); /* 先加载 */
     @import url('style2.css'); /* 后加载 */
   </style>
   ```

### 使用建议（面试加分项）

1. **性能优化**

   ```html
   <!-- 推荐：使用 link -->
   <link rel="stylesheet" href="critical.css" />
   <link rel="stylesheet" href="non-critical.css" media="print" />

   <!-- 不推荐：使用 @import -->
   <style>
     @import url('style.css');
     /* 会阻塞并串行加载 */
   </style>
   ```

2. **最佳实践**

   ```html
   <!-- 1. 关键 CSS 内联 -->
   <style>
     /* 首屏关键样式 */
     .header {
       background: #fff;
     }
   </style>

   <!-- 2. 异步加载非关键 CSS -->
   <link
     rel="preload"
     href="style.css"
     as="style"
     onload="this.rel='stylesheet'"
   />

   <!-- 3. 条件加载 -->
   <link
     rel="stylesheet"
     href="mobile.css"
     media="screen and (max-width: 768px)"
   />
   ```

3. **使用场景**

   - link 适用场景

     ```html
     <!-- 主要样式表 -->
     <link rel="stylesheet" href="main.css" />

     <!-- 按条件加载 -->
     <link
       rel="stylesheet"
       href="dark-theme.css"
       media="(prefers-color-scheme: dark)"
     />

     <!-- 预加载 -->
     <link rel="preload" href="critical.css" as="style" />
     ```

   - @import 适用场景

     ```css
     /* 模块化管理 */
     @import 'variables.css';
     @import 'reset.css';
     @import 'components.css';

     /* 主题切换 */
     @import url('theme-light.css') (prefers-color-scheme: light);
     @import url('theme-dark.css') (prefers-color-scheme: dark);
     ```

4. **注意事项**

   - 加载顺序

     - link 可并行加载
     - @import 串行加载
     - 避免 @import 嵌套

   - 浏览器兼容

     - link 浏览器支持好
     - @import IE8+ 支持
     - 考虑兼容性需求

   - 性能影响
     - link 性能更好
     - @import 可能延迟加载
     - 避免过多请求

## 13. 介绍一下 CSS 的 calc 函数

### 简要回答

calc() 是 CSS 的一个计算函数，允许在样式表中进行数学计算。它可以混合不同的单位进行计算，支持加减乘除四则运算，常用于动态计算元素的尺寸和位置。

### 详细解答

1. **基本用法**

   ```css
   /* 1. 基础运算 */
   .container {
     /* 基本四则运算 */
     width: calc(100% - 20px);
     height: calc(100vh / 2);
     padding: calc(10px + 1em);
     margin: calc(10px * 2);
   }

   /* 2. 混合单位计算 */
   .mixed-units {
     /* 不同单位混合运算 */
     width: calc(100% - 50px);
     height: calc(100vh - 100px);
     font-size: calc(1rem + 2vw);
   }
   ```

2. **常见应用场景**

   ```css
   /* 1. 响应式布局 */
   .responsive-layout {
     /* 保持边距的流体布局 */
     width: calc(33.333% - 20px);
     margin: 10px;
   }

   /* 2. 居中定位 */
   .center-element {
     /* 精确居中 */
     left: calc(50% - 150px);
     top: calc(50% - 150px);
   }

   /* 3. 动态高度 */
   .dynamic-height {
     /* 减去头部和底部后的高度 */
     height: calc(100vh - 60px - 80px);
   }
   ```

3. **嵌套使用**

   ```css
   /* 复杂计算示例 */
   .complex-calc {
     /* 多层嵌套计算 */
     width: calc(100% - calc(20px + 2em));
     padding: calc(calc(1em + 10px) * 2);
   }

   /* 变量结合使用 */
   :root {
     --spacing: 20px;
     --columns: 3;
   }
   .grid-item {
     width: calc(
       (100% - (var(--spacing) * (var(--columns) - 1))) / var(--columns)
     );
   }
   ```

### 使用建议（面试加分项）

1. **性能优化**

   ```css
   /* 1. 避免过度复杂的计算 */
   .simple-calc {
     /* 推荐：简单直接的计算 */
     width: calc(100% - 20px);

     /* 不推荐：复杂的嵌套计算 */
     width: calc(100% - calc(20px + calc(1em * 2)));
   }

   /* 2. 使用变量简化计算 */
   :root {
     --gap: 20px;
     --base-width: calc(100% / 3);
   }
   .optimized {
     width: calc(var(--base-width) - var(--gap));
   }
   ```

2. **常见问题解决**

   ```css
   /* 1. 运算符空格问题 */
   .spacing {
     /* 正确：运算符前后需要空格 */
     width: calc(100% - 20px);

     /* 错误：没有空格会导致计算失败 */
     width: calc(100%-20px);
   }

   /* 2. 回退方案 */
   .fallback {
     /* 提供回退值 */
     width: 90%; /* 回退值 */
     width: calc(100% - 20px); /* 现代浏览器 */
   }
   ```

3. **最佳实践**

   - 布局应用

     ```css
     /* 弹性布局 */
     .flex-layout {
       /* 确保内容不会溢出 */
       flex-basis: calc(33.333% - 20px);
       margin: 10px;
     }

     /* 网格布局 */
     .grid-layout {
       /* 自适应列宽 */
       grid-template-columns: calc(100% / 3);
       gap: calc(1rem + 10px);
     }
     ```

   - 响应式设计

     ```css
     /* 响应式字体 */
     .responsive-text {
       /* 最小 16px，最大 24px */
       font-size: calc(16px + (24 - 16) * ((100vw - 320px) / (1200 - 320)));
     }

     /* 响应式间距 */
     .responsive-spacing {
       padding: calc(1rem + 2vw);
       margin: calc(10px + 1vw);
     }
     ```

   - 注意事项

     - 运算符规范

       - 运算符前后需要空格
       - 避免复杂嵌套计算
       - 注意运算优先级

     - 兼容性处理

       - 提供回退方案
       - 测试不同浏览器
       - 考虑移动端适配

     - 性能考虑
       - 避免过度使用
       - 简化计算逻辑
       - 合理使用变量

## 14. 介绍一下 CSS3 的媒介查询

### 简要回答

媒介查询（Media Queries）是 CSS3 中的一个模块，允许根据设备特性（如视口宽度、设备方向等）来应用不同的样式规则。它是响应式设计的核心技术之一。

### 详细解答

1. **基本语法**

   ```css
   /* 1. 基础语法 */
   @media screen and (max-width: 768px) {
     /* 移动端样式 */
     .container {
       width: 100%;
     }
   }

   /* 2. 多条件组合 */
   @media screen and (min-width: 768px) and (max-width: 1024px) {
     /* 平板样式 */
     .container {
       width: 750px;
     }
   }

   /* 3. 方向判断 */
   @media (orientation: landscape) {
     /* 横屏样式 */
     .content {
       flex-direction: row;
     }
   }
   ```

2. **常用查询条件**

   ```css
   /* 1. 屏幕尺寸 */
   @media (min-width: 1200px) {
     /* 大屏幕样式 */
   }

   /* 2. 设备类型 */
   @media print {
     /* 打印样式 */
     .no-print {
       display: none;
     }
   }

   /* 3. 像素比例 */
   @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
     /* 高清屏样式 */
     .logo {
       background-image: url('logo@2x.png');
     }
   }
   ```

3. **响应式布局实践**

   ```css
   /* 移动优先的响应式设计 */
   .grid {
     display: grid;
     grid-template-columns: 1fr; /* 默认单列 */
     gap: 20px;
   }

   /* 平板布局 */
   @media (min-width: 768px) {
     .grid {
       grid-template-columns: repeat(2, 1fr); /* 双列 */
     }
   }

   /* 桌面布局 */
   @media (min-width: 1024px) {
     .grid {
       grid-template-columns: repeat(3, 1fr); /* 三列 */
     }
   }
   ```

### 使用建议（面试加分项）

1. **断点设置**

   ```css
   /* 1. 主要断点 */
   :root {
     --breakpoint-sm: 576px;
     --breakpoint-md: 768px;
     --breakpoint-lg: 992px;
     --breakpoint-xl: 1200px;
   }

   /* 2. 断点使用 */
   @media (min-width: 576px) {
     .container {
       max-width: 540px;
     }
   }

   @media (min-width: 768px) {
     .container {
       max-width: 720px;
     }
   }
   ```

2. **最佳实践**

   ```css
   /* 1. 移动优先设计 */
   .element {
     /* 基础样式（移动端） */
     width: 100%;
     padding: 15px;
   }

   /* 平板及以上 */
   @media (min-width: 768px) {
     .element {
       width: 50%;
       padding: 20px;
     }
   }

   /* 2. 避免断点重叠 */
   /* 不推荐 */
   @media (max-width: 768px) {
     /* ... */
   }
   @media (min-width: 768px) {
     /* ... */
   }

   /* 推荐 */
   @media (max-width: 767px) {
     /* ... */
   }
   @media (min-width: 768px) {
     /* ... */
   }
   ```

3. **性能优化**

   - 媒体查询组织

     ```css
     /* 集中管理媒体查询 */
     /* base.css */
     .element {
       /* 基础样式 */
     }

     /* media-queries.css */
     @media (min-width: 768px) {
       .element {
         /* 响应式样式 */
       }
     }
     ```

   - 条件优化

     ```css
     /* 避免过多的媒体查询 */
     @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
       /* 过于具体的条件可能导致维护困难 */
     }

     /* 推荐：使用更简单的条件 */
     @media (min-width: 768px) {
       /* 更容易维护的条件 */
     }
     ```

4. **注意事项**

   - 断点选择

     - 基于内容而非设备
     - 避免过多断点
     - 保持断点一致性

   - 代码组织

     - 遵循移动优先
     - 避免代码重复
     - 保持样式模块化

   - 测试要点
     - 跨设备测试
     - 断点边界测试
     - 方向切换测试

## 15. CSS3 中 transition 和 animation 的属性分别有哪些？

### 简要回答

transition 和 animation 都是 CSS3 中用于实现动画效果的属性。transition 用于实现过渡动画，包含 4 个子属性；animation 用于实现关键帧动画，包含 8 个子属性。

### 详细解答

1. **transition 属性**

   ```css
   /* 1. 完整写法 */
   .element {
     /* 所有属性的过渡效果 */
     transition: all 0.3s ease-in-out 0s;

     /* 单个属性写法 */
     transition: width 0.3s ease-in-out, height 0.5s ease-out;
   }

   /* 2. 分解写法 */
   .element {
     transition-property: width, height; /* 过渡属性 */
     transition-duration: 0.3s; /* 过渡时间 */
     transition-timing-function: ease-in-out; /* 过渡曲线 */
     transition-delay: 0s; /* 延迟时间 */
   }
   ```

2. **animation 属性**

   ```css
   /* 1. 完整写法 */
   .element {
     /* 所有动画属性 */
     animation: slideIn 1s ease-out infinite alternate;
   }

   /* 2. 分解写法 */
   .element {
     animation-name: slideIn; /* 动画名称 */
     animation-duration: 1s; /* 动画时间 */
     animation-timing-function: ease-out; /* 动画曲线 */
     animation-delay: 0s; /* 延迟时间 */
     animation-iteration-count: infinite; /* 重复次数 */
     animation-direction: alternate; /* 动画方向 */
     animation-fill-mode: forwards; /* 填充模式 */
     animation-play-state: running; /* 播放状态 */
   }

   /* 3. 关键帧定义 */
   @keyframes slideIn {
     from {
       transform: translateX(-100%);
     }
     to {
       transform: translateX(0);
     }
   }
   ```

### 使用建议（面试加分项）

1. **常见应用场景**

   ```css
   /* 1. 过渡效果 */
   .button {
     background: blue;
     transition: background 0.3s;
   }
   .button:hover {
     background: darkblue;
   }

   /* 2. 循环动画 */
   .loading {
     animation: spin 1s linear infinite;
   }
   @keyframes spin {
     from {
       transform: rotate(0deg);
     }
     to {
       transform: rotate(360deg);
     }
   }
   ```

2. **性能优化**

   ```css
   /* 1. 使用 transform 和 opacity */
   .optimized {
     /* 推荐 */
     transition: transform 0.3s, opacity 0.3s;

     /* 不推荐 */
     transition: left 0.3s, top 0.3s;
   }

   /* 2. 避免同时动画过多属性 */
   .performance {
     /* 推荐 */
     transform: translate(10px, 20px);

     /* 不推荐 */
     margin-left: 10px;
     margin-top: 20px;
   }
   ```

3. **最佳实践**

   - 动画时机

     ```css
     /* 1. 状态切换动画 */
     .menu {
       transform: translateX(-100%);
       transition: transform 0.3s ease-out;
     }
     .menu.open {
       transform: translateX(0);
     }

     /* 2. 加载动画 */
     .loader {
       animation: pulse 1.5s ease-in-out infinite;
     }
     @keyframes pulse {
       0% {
         transform: scale(1);
       }
       50% {
         transform: scale(1.2);
       }
       100% {
         transform: scale(1);
       }
     }
     ```

   - 动画控制

     ```css
     /* 暂停和播放 */
     .animated {
       animation: bounce 1s infinite;
     }
     .animated.paused {
       animation-play-state: paused;
     }

     /* 动画完成后保持状态 */
     .slide-in {
       animation: slideIn 0.5s forwards;
     }
     ```

4. **注意事项**

   - 性能考虑

     - 使用 transform 和 opacity
     - 避免影响文档流的属性
     - 适当使用 will-change

   - 兼容性处理

     - 添加浏览器前缀
     - 提供回退方案
     - 考虑移动端性能

   - 用户体验
     - 考虑 prefers-reduced-motion
     - 动画时长适中
     - 提供关闭动画选项

## 16. CSS 动画是如何实现的？

### 简要回答

CSS 动画可以通过多种方式实现，主要包括：transition 过渡动画、animation 关键帧动画、transform 变换动画，以及一些特殊效果如滤镜动画等。每种方式都有其特定的使用场景。

### 详细解答

1. **过渡动画（transition）**

   ```css
   /* 1. 基础过渡 */
   .button {
     background: blue;
     transform: scale(1);
     transition: all 0.3s ease-in-out;
   }
   .button:hover {
     background: darkblue;
     transform: scale(1.1);
   }

   /* 2. 多属性过渡 */
   .card {
     opacity: 0.8;
     transform: translateY(0);
     transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
   }
   .card:hover {
     opacity: 1;
     transform: translateY(-10px);
   }
   ```

2. **关键帧动画（animation）**

   ```css
   /* 1. 简单动画 */
   .pulse {
     animation: pulse 2s infinite;
   }
   @keyframes pulse {
     0% {
       transform: scale(1);
     }
     50% {
       transform: scale(1.2);
     }
     100% {
       transform: scale(1);
     }
   }

   /* 2. 复杂动画 */
   .loading {
     animation: rotate 1s linear infinite, fade 2s ease-in-out infinite;
   }
   @keyframes rotate {
     from {
       transform: rotate(0deg);
     }
     to {
       transform: rotate(360deg);
     }
   }
   ```

3. **变换动画（transform）**

   ```css
   /* 1. 2D 变换 */
   .transform-2d {
     transition: transform 0.3s;
   }
   .transform-2d:hover {
     transform: translate(20px, 20px) rotate(45deg) scale(1.2);
   }

   /* 2. 3D 变换 */
   .transform-3d {
     transform-style: preserve-3d;
     transition: transform 0.5s;
   }
   .transform-3d:hover {
     transform: perspective(1000px) rotateY(45deg) translateZ(50px);
   }
   ```

### 使用建议（面试加分项）

1. **性能优化**

   ```css
   /* 1. 使用硬件加速 */
   .hardware-accelerated {
     transform: translateZ(0);
     will-change: transform;
   }

   /* 2. 动画属性选择 */
   .good-performance {
     /* 推荐：仅动画 transform 和 opacity */
     transform: translate(100px, 0);
     opacity: 0.8;

     /* 不推荐：改变布局的属性 */
     width: 100px;
     height: 100px;
   }
   ```

2. **动画组合**

   ```css
   /* 1. 组合多个动画效果 */
   .combined-animation {
     animation: slideIn 0.5s ease-out, fadeIn 0.8s ease-in;
   }
   @keyframes slideIn {
     from {
       transform: translateX(-100%);
     }
     to {
       transform: translateX(0);
     }
   }
   @keyframes fadeIn {
     from {
       opacity: 0;
     }
     to {
       opacity: 1;
     }
   }
   ```

3. **最佳实践**

   - 动画触发

     ```css
     /* 1. 状态类触发 */
     .menu {
       transform: translateX(-100%);
       transition: transform 0.3s;
     }
     .menu.active {
       transform: translateX(0);
     }

     /* 2. 媒体查询适配 */
     @media (prefers-reduced-motion: reduce) {
       .animation {
         animation: none;
         transition: none;
       }
     }
     ```

   - 动画控制
     ```css
     /* 动画暂停和播放 */
     .controlled-animation {
       animation: bounce 1s infinite;
     }
     .controlled-animation.paused {
       animation-play-state: paused;
     }
     ```

4. **注意事项**

   - 性能考虑

     - 使用 transform/opacity
     - 避免同时动画多个属性
     - 合理使用硬件加速

   - 兼容性处理

     - 添加浏览器前缀
     - 提供降级方案
     - 考虑移动端表现

   - 用户体验
     - 动画时长适中
     - 提供关闭选项
     - 避免过度动画

## 17. 说说渐进增强和优雅降级

### 简要回答

渐进增强（Progressive Enhancement）和优雅降级（Graceful Degradation）是两种不同的开发策略。渐进增强是先构建基础功能，再逐步增加高级特性；优雅降级则是先实现完整功能，再向下兼容。

### 详细解答

1. **渐进增强示例**

   ```css
   /* 1. 基础样式 */
   .button {
     /* 基本样式，确保在所有浏览器中可用 */
     padding: 10px 20px;
     background: blue;
     color: white;
   }

   /* 2. 增强特性 */
   @supports (backdrop-filter: blur(10px)) {
     .button {
       /* 现代浏览器特性 */
       backdrop-filter: blur(10px);
       background: rgba(0, 0, 255, 0.5);
     }
   }

   /* 3. 更多增强 */
   @media (hover: hover) {
     .button:hover {
       /* 支持悬停设备的增强效果 */
       transform: scale(1.1);
       transition: transform 0.3s;
     }
   }
   ```

2. **优雅降级示例**

   ```css
   /* 1. 完整功能 */
   .modern-layout {
     /* 现代布局方案 */
     display: grid;
     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
     gap: 20px;
   }

   /* 2. 降级方案 */
   @supports not (display: grid) {
     .modern-layout {
       /* 旧浏览器后备方案 */
       display: flex;
       flex-wrap: wrap;
     }
     .modern-layout > * {
       width: calc(33.333% - 20px);
       margin: 10px;
     }
   }
   ```

3. **特性检测**

   ```css
   /* 1. CSS 特性检测 */
   @supports (display: flex) {
     .container {
       display: flex;
     }
   }

   /* 2. 媒体特性检测 */
   @media (pointer: fine) {
     /* 精确指针设备（如鼠标）的样式 */
     .interactive {
       cursor: pointer;
     }
   }
   ```

### 使用建议（面试加分项）

1. **选择策略**

   ```css
   /* 1. 渐进增强示例 */
   .progressive {
     /* 基础样式 */
     background: #eee;
     padding: 20px;

     /* 渐进增强 */
     @supports (backdrop-filter: blur(10px)) {
       background: rgba(238, 238, 238, 0.8);
       backdrop-filter: blur(10px);
     }
   }

   /* 2. 优雅降级示例 */
   .graceful {
     /* 现代特性 */
     display: grid;
     grid-template-columns: 1fr 1fr;

     /* 降级方案 */
     @supports not (display: grid) {
       display: block;
     }
   }
   ```

2. **最佳实践**

   - 布局处理

     ```css
     /* 响应式布局 */
     .layout {
       /* 基础布局 */
       display: block;

       /* 增强布局 */
       @media (min-width: 768px) {
         display: flex;
       }

       /* 现代布局 */
       @supports (display: grid) {
         display: grid;
         grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       }
     }
     ```

   - 功能增强

     ```css
     /* 交互增强 */
     .interactive {
       /* 基础状态 */
       opacity: 1;

       /* 增强效果 */
       @media (hover: hover) {
         &:hover {
           opacity: 0.8;
           transition: opacity 0.3s;
         }
       }
     }
     ```

3. **注意事项**

   - 基础功能

     - 确保核心功能可用
     - 避免依赖特定特性
     - 提供基础样式支持

   - 增强方案

     - 渐进添加新特性
     - 使用特性检测
     - 考虑设备能力

   - 兼容处理
     - 提供回退方案
     - 测试不同环境
     - 监控用户数据

## 18. 什么是渐进式渲染？

### 简要回答

渐进式渲染（Progressive Rendering）是一种优化技术，通过逐步加载页面内容和样式，提高用户体验。它允许页面在完全加载之前就开始显示内容，并随着更多资源的加载而逐步完善。

### 详细解答

1. **关键渲染路径优化**

   ```css
   /* 1. 关键 CSS 内联 */
   <style>
     /* 首屏关键样式 */
     .header {
       height: 60px;
       background: #fff;
     }
     .hero {
       min-height: 100vh;
       background: #f5f5f5;
     }
   </style>

   /* 2. 非关键样式异步加载 */
   <link rel="preload" href="non-critical.css" as="style"
         onload="this.onload=null;this.rel='stylesheet'">
   ```

2. **图片加载优化**

   ```css
   /* 1. 图片懒加载 */
   .lazy-image {
     opacity: 0;
     transition: opacity 0.3s;
   }
   .lazy-image.loaded {
     opacity: 1;
   }

   /* 2. 渐进式图片 */
   .progressive-image {
     filter: blur(10px);
     transition: filter 0.3s;
   }
   .progressive-image.loaded {
     filter: blur(0);
   }
   ```

3. **内容分批加载**

   ```css
   /* 1. 骨架屏 */
   .skeleton {
     background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
     background-size: 200% 100%;
     animation: loading 1.5s infinite;
   }
   @keyframes loading {
     from {
       background-position: 200% 0;
     }
     to {
       background-position: -200% 0;
     }
   }

   /* 2. 内容占位 */
   .placeholder {
     height: 200px;
     background: #f5f5f5;
     margin-bottom: 20px;
   }
   ```

### 使用建议（面试加分项）

1. **性能优化**

   ```css
   /* 1. 优先加载可见内容 */
   .above-fold {
     /* 首屏内容样式 */
     content-visibility: auto;
     contain-intrinsic-size: 0 500px;
   }

   /* 2. 资源优先级 */
   .critical {
     /* 关键资源样式 */
     background-image: url('critical.jpg');
   }
   .non-critical {
     /* 非关键资源延迟加载 */
     background-image: var(--lazy-bg);
   }
   ```

2. **用户体验优化**

   ```css
   /* 1. 加载状态提示 */
   .loading-state {
     position: relative;
   }
   .loading-state::after {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: rgba(255, 255, 255, 0.8);
   }

   /* 2. 平滑过渡 */
   .content-transition {
     opacity: 0;
     transform: translateY(20px);
     transition: all 0.3s ease-out;
   }
   .content-transition.visible {
     opacity: 1;
     transform: translateY(0);
   }
   ```

3. **最佳实践**

   - 资源加载

     ```css
     /* 优先级控制 */
     .priority-high {
       /* 立即加载的关键资源 */
       background: url('critical.jpg');
     }

     /* 延迟加载 */
     .priority-low {
       /* 视口外的非关键资源 */
       background: none;
       transition: background 0.3s;
     }
     ```

   - 性能监控
     ```css
     /* 性能标记 */
     .performance-mark {
       /* 用于性能监测的样式类 */
       content-visibility: auto;
       contain-intrinsic-size: 0 300px;
     }
     ```

4. **注意事项**

   - 加载策略

     - 识别关键资源
     - 合理安排加载顺序
     - 避免资源阻塞

   - 性能考虑

     - 监控加载性能
     - 优化资源大小
     - 使用适当的缓存

   - 用户体验
     - 提供加载反馈
     - 保持视觉连续性
     - 避免布局偏移

## 19. 总结一下如何提升或者优化 CSS 的渲染性能？

### 简要回答

CSS 渲染性能优化主要从选择器优化、属性优化、动画性能、加载优化等多个方面入手。通过合理的代码组织和优化技巧，可以显著提升页面的渲染性能。

### 详细解答

1. **选择器优化**

   ```css
   /* 1. 避免深层嵌套 */
   /* 不推荐 */
   .header .nav .list .item a {
     color: blue;
   }

   /* 推荐 */
   .nav-link {
     color: blue;
   }

   /* 2. 避免通配符 */
   /* 不推荐 */
   * {
     margin: 0;
     padding: 0;
   }

   /* 推荐 */
   .reset {
     margin: 0;
     padding: 0;
   }
   ```

2. **属性优化**

   ```css
   /* 1. 使用简写属性 */
   /* 不推荐 */
   .element {
     margin-top: 10px;
     margin-right: 20px;
     margin-bottom: 10px;
     margin-left: 20px;
   }

   /* 推荐 */
   .element {
     margin: 10px 20px;
   }

   /* 2. 使用高效的布局属性 */
   .layout {
     /* 推荐：使用 transform 代替位置改变 */
     transform: translate(10px, 20px);

     /* 不推荐：触发重排 */
     top: 10px;
     left: 20px;
   }
   ```

3. **动画性能优化**

   ```css
   /* 1. 使用 transform 和 opacity */
   .animation {
     /* 推荐：仅触发合成 */
     transform: scale(1.2);
     opacity: 0.8;
     transition: transform 0.3s, opacity 0.3s;

     /* 不推荐：触发重排 */
     width: 120%;
     height: 120%;
   }

   /* 2. 使用 will-change */
   .optimized-animation {
     will-change: transform;
     transform: translateZ(0);
   }
   ```

### 使用建议（面试加分项）

1. **加载优化**

   ```css
   /* 1. 关键 CSS 内联 */
   <style>
     /* 首屏关键样式 */
     .header {
       height: 60px;
       background: #fff;
     }
   </style>

   /* 2. 异步加载非关键样式 */
   <link rel="preload" href="non-critical.css" as="style"
         onload="this.onload=null;this.rel='stylesheet'">
   ```

2. **渲染优化**

   ```css
   /* 1. 避免重排属性 */
   .performance {
     /* 使用 transform 代替位置变化 */
     transform: translateX(100px);

     /* 使用 opacity 代替显示隐藏 */
     opacity: 0;
     transition: opacity 0.3s;
   }

   /* 2. 分层优化 */
   .layer {
     /* 创建新的渲染层 */
     transform: translateZ(0);
     backface-visibility: hidden;
   }
   ```

3. **最佳实践**

   - 代码组织

     ```css
     /* 模块化组织 */
     .module {
       /* 基础样式 */
       &__element {
         /* 避免过深嵌套 */
       }
     }

     /* 性能优先 */
     .performance-first {
       /* 使用高效属性 */
       transform: translate(0);
       opacity: 1;
     }
     ```

   - 媒体查询优化

     ```css
     /* 移动优先 */
     .element {
       /* 基础样式 */
       width: 100%;

       /* 大屏适配 */
       @media (min-width: 768px) {
         width: 50%;
       }
     }
     ```

4. **注意事项**

   - 选择器优化

     - 避免过度嵌套
     - 使用高效选择器
     - 避免通配符滥用

   - 属性优化

     - 使用简写属性
     - 避免重复定义
     - 合理使用继承

   - 渲染优化

     - 避免频繁重排
     - 合理使用硬件加速
     - 优化动画性能

   - 加载优化
     - 压缩代码
     - 按需加载
     - 缓存策略

## 20. 请简述什么是层叠上下文、什么是层叠等级、什么是层叠顺序？

### 简要回答

层叠上下文（Stacking Context）是 HTML 元素在 z 轴上的层叠关系；层叠等级（Stacking Level）是元素在层叠上下文中的优先级；层叠顺序（Stacking Order）则是元素发生层叠时的特定显示顺序。

### 详细解答

1. **层叠上下文**

   ```css
   /* 1. 创建层叠上下文的方式 */
   .stacking-context {
     /* 方式一：定位 + z-index */
     position: relative;
     z-index: 1;

     /* 方式二：透明度 */
     opacity: 0.9;

     /* 方式三：变换 */
     transform: scale(1);
   }

   /* 2. 嵌套层叠上下文 */
   .parent {
     position: relative;
     z-index: 1;
   }
   .child {
     position: relative;
     z-index: 2; /* 只在父级上下文中生效 */
   }
   ```

2. **层叠等级**

   ```css
   /* 1. 不同等级的元素 */
   .background {
     /* 背景和边框 */
     background: blue;
     border: 1px solid black;
   }

   .block {
     /* 块级元素 */
     position: static;
   }

   .float {
     /* 浮动元素 */
     float: left;
   }

   .positioned {
     /* 定位元素 */
     position: relative;
     z-index: auto;
   }
   ```

3. **层叠顺序**

   ```css
   /* 从下到上的层叠顺序 */
   .elements {
     /* 1. 背景和边框 */
     background: #f0f0f0;
     border: 1px solid #ccc;

     /* 2. 负 z-index */
     .negative-z {
       position: relative;
       z-index: -1;
     }

     /* 3. 块级元素 */
     .block {
       display: block;
     }

     /* 4. 浮动元素 */
     .float {
       float: left;
     }

     /* 5. 行内元素 */
     .inline {
       display: inline;
     }

     /* 6. z-index: 0 */
     .zero-z {
       position: relative;
       z-index: 0;
     }

     /* 7. 正 z-index */
     .positive-z {
       position: relative;
       z-index: 1;
     }
   }
   ```

### 使用建议（面试加分项）

1. **层叠上下文管理**

   ```css
   /* 1. 合理使用 z-index */
   .modal {
     /* 使用合适的 z-index 值 */
     position: fixed;
     z-index: 1000; /* 较大值确保在顶层 */
   }

   /* 2. 避免不必要的层叠上下文 */
   .element {
     /* 不推荐：无意创建层叠上下文 */
     transform: translateZ(0);
   }
   ```

2. **最佳实践**

   - 层级管理

     ```css
     /* z-index 分层管理 */
     :root {
       --z-dropdown: 100;
       --z-sticky: 200;
       --z-modal: 300;
       --z-popup: 400;
     }

     .dropdown {
       z-index: var(--z-dropdown);
     }

     .modal {
       z-index: var(--z-modal);
     }
     ```

   - 避免问题

     ```css
     /* 1. 避免 z-index 滥用 */
     .element {
       /* 不推荐 */
       z-index: 99999;

       /* 推荐 */
       z-index: var(--z-level-1);
     }

     /* 2. 处理层叠问题 */
     .container {
       /* 创建新的层叠上下文隔离内部元素 */
       isolation: isolate;
     }
     ```

3. **注意事项**

   - 层叠上下文

     - 了解触发条件
     - 注意嵌套关系
     - 合理使用隔离

   - 层叠等级

     - 遵循默认规则
     - 避免过度干预
     - 保持简单清晰

   - 层叠顺序
     - 理解显示顺序
     - 控制 z-index 范围
     - 维护文档说明
