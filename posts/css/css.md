---
title: CSS 基础知识
---

# CSS 基础知识

## 渐进增强

为最小公分母准备可用的内容，然后再为支持新特性的浏览器添加更多交互优化。

HTML 和 CSS 的实现已经部分内置了这一策略。

对于 HTML:

```html
<input type="text" />

<!-- 在不支持 type="email" 的浏览器会被解析成上面的形式 -->
<input type="email" />
```

对于 CSS:

```css
.overlay {
  background-color: #000;

  /* 如果浏览器支持 rgba ，则覆盖上一条 */
  background-color: rgba(0, 0, 0, 0.8);
}
```

### 厂商前缀

厂商可以为自家浏览器引入实验性特性，并通过其自定义的前缀来识别该特性。

```css
.myThing {
  -webkit-transform: translate(0, 10px);
  -moz-transform: translate(0, 10px);
  -ms-transform: translate(0, 10px);

  /* 加一条不带前缀的声明，支持标准属性名称的浏览器 */
  transform: translate(0, 10px);
}
```

### 条件规则与检测

使用 `@supports` 块来判断浏览器是否支持某个 CSS 特性、并提供对应的样式，这个特殊的代码块被称为**条件规则**。

```css
@supports (display: grid) {
  /* 在支持网格布局的浏览器中要应用的规则 */
}
```

## 语义化 HTML

在正确的地方使用正确的元素

- 确保尽可能多的人能够使用（文本浏览器/屏幕阅读器/盲文点触设备）
- 利于机器识别，搜索引擎优化
- 有益于 CSS 的组织

### 结构化元素

HTML5 新增一批结构化元素，这些元素是为了在 HTML 文档中创建逻辑性区块。

- section
- header（特定区块的头部）
- footer
- nav（导航组件）
- article（内容）
- aside
- main（在一个 HTML 文档中应该只出现一次）

```html
<!-- 使用新元素之前 -->
<div class="article">
  <div class="header">
    <h1>Title</h1>
  </div>
  <p>Content</p>
</div>

<!-- 使用语义化的新元素后 -->
<article>
  <header>
    <h1>Title</h1>
  </header>
  <p>Content</p>
</article>

<!-- 更为灵活的用法 -->
<article class="post">
  <header class="post-header">
    <h1>Title</h1>
  </header>
  <p>Content</p>
</article>
```
上面的第三种做法是最好的，它更据语义化，但增加 CSS 时又不会像第二种方式那样覆盖所有标签的 CSS 。

```css
.post {
  /* 样式 */
}
.post-header {
  /* 其它样式 */
}
```

### div 和 span

在仅需样式而无需或没有合适语义的情况下使用 `div` 和 `span` 。
