---
title: 选择符
---

# 选择符

## 基本选择符

**类型（元素）选择符** 选择制定类型的元素，**后代选择符** 选择某个或者某组元素的后代。

```css
/* 类型(元素)选择符 */
p {
  color: black;
}

/* 后代选择符 */
blockquote p {
  padding-left: 2em;
}
```

**ID 选择符** 和 **类选择符** 分别使用 `#` 和 `.` 开头。

## 子选择符和同辈选择符

除了基本选择符， CSS 也提供了高级选择符，第一个高级选择符叫 **子选择符** ，它选择一个元素的直接后代。

```html
<style>
/* 子选择符，使用 > 表示 */
#nav > li {
  /* 样式 */
}
</style>

<ul id="nav">
  <li>被选择</li>
  <li>
    <ul>
      <li>未选择</li>
      <li>未选择</li>
    </ul>
  </li>
  <li>被选择</li>
</ul>
```

**相邻同辈选择器** 用于选择某个元素 _后面_ 、并与该元素拥有相同父元素的元素。

```html
<style>
/* 相邻同辈选择器，使用 + 号表示 */
h2 + p {
  /* 样式 */
}
</style>

<main>
  <p>（未被选择）段落</p>
  <h2>标题</h2>
  <p>（被选择）段落</p>
  <p>（未被选择）段落</p>
</main>
```

`>` 和 `+` 被称为 **组合子** ，它描述自身两侧的组合方式。

`~` 是 **一般同辈组合子** ，它与 `+` 类似，但选择的是同级后面的所有元素。

```html
<style>
/* 相邻同辈选择器，使用 + 号表示 */
h2 ~ p {
  /* 样式 */
}
</style>

<main>
  <p>（未被选择）段落</p>
  <h2>标题</h2>
  <p>（被选择）段落</p>
  <p>（被选择）段落</p>
  <p>（被选择）段落</p>
  ...
</main>
```

## 通用选择符

**通用选择符** `*` 匹配任何元素。可以与组合子结合使用。

```css
.production-section > * {
  /* 样式 */
}
```

## 属性选择符

**属性选择符** 基于元素是否具有某个属性、或是属性是否具有某个值来选择元素。

```css
abbr[title] {
  /* 选择有 title 属性的 abbr 元素 */
}
abbr[title]:hover {
  /* 选择有 title 属性的 abbr 元素鼠标悬浮状态 */
}
input[type="submit"] {
  /* 选择有 type 属性为 submit 的 input 元素 */
}
a[href^="http:"] {
  /* 选择 href 以 http: 开头的 a 标签 */
}
img[src$=".jpg"] {
  /* 选择 src 以 .jpg 结尾的 img 标签 */
}
a[href*="/about/"] {
  /* 选择 href 中包含 /about/ 的 a 标签 */
}
a[ref~="next"] {
  /*
   * 选择 ref 中以空格分割后包含 next 的 a 标签
   * 例如 <a ref="aa next xx"></a>
   */
}
a[lang|="en"] {
  /*
   * 匹配指定值或指定值后连着短横线的情况，例如
   * <a lang="en"></a>
   * <a lang="en-us"></a>
   */
}
```

## 伪元素

`::first-letter` 选择一段文本的第一个字符，如果要选择第一行，则用 `::first-line` 。

对应开头和结尾的假想元素，分别是 `::before` 和 `::after` 。通过 `content` 属性插入文本内容后，再像使用普通元素一样添加样式即可。

```css
.chapter::before {
  content: ';'; /* 插入文本内容 */
  font-size: 15em; /* 其它属性 */
}
```

## 伪类

基于文档结构之外的情况为页面添加样式，比如基于超链接或表单元素的状态，就可以使用 **伪类选择器** 。

```css
a:link { }
a:visited { }
a:hover { }
a:focus { }
a:active { }
```

### 目标与反选

当访问浏览器地址栏 `https://xxx.com/path/to/page#comment-3` 时，地址栏的 hash 值为 `#comment-3` ，此时若页面中存在 `<article class="comment" id="comment-3">...</article>` ，那么通过下面的规则可以找到该条评论

```css
.comment:target {
  background-color: #fffec4;
}
```

其中 `.comment` 选择评论，然后 `target` 从地址中取到 `#comment-3` 并进行 ID 匹配。

使用 `:not()` 选择符可以排除某些选择符。

```css
.comment:target:not(.comment-downvoted) {
  /* 和上面的选择器一样，但是如果存在 comment-downvoted 类则排除 */
}
```

### 结构化伪类

`:nth-child()` 等，使用时看文档即可。

### 表单伪类

`input:required` 等，使用时看文档即可。

## 层叠

当多条规则同时选择一个元素时， CSS 通过 **层叠 (cascade)** 的机制来处理冲突。

层叠机制的优先级从高到低

- 标注 `!important` 的用户样式；
- 标注 `!important` 的作者样式；
- 作者样式；
- 用户样式；
- 浏览器（或用户代理）的默认样式；

在此基础上，规则再按照选择符的特殊性排序。特殊性高的选择符覆盖特殊性低的选择符。若特殊性相等，后定义的规则优先。

## 特殊性

特殊性的四个级别

- 行内样式
- ID 选择符
- 类选择符，伪类选择符，属性选择符
- 类型选择符，元素选择符

其特殊性按照对于级别的的选择符数量相加。

比如

```css
#id.class-1.class-2.p {
  /* 100 + 2 * 10 + 1 = 121 */
}
```

### 利用层叠次序

若两条规则特殊性相等，优先应用后定义的规则。

### 控制特殊性

使用类选择符简化选择符、降低特殊性。

## 继承

有些属性，比如颜色或文字大小，会被应用它们的元素的后代所继承。继承没有任何特殊性。

## 为文档应用样式

### link 和 style 元素

在 `head` 中添加 `style` 标签。

使用 `link` 元素。

```html
<link href="/css/base.css" rel="stylesheet" />
```

使用 `@import` 指令加载外部 CSS 文件。可以在 `head` 部分使用，也可以在外部样式中使用。

```html
<style>
  @import url("/css/modules.css");
</style>
```

引入时要注意加载顺序，同样特殊性的规则下、最后加载的会生效。

### 性能

CSS 应该放在 `head` 中，让浏览器尽可能早的下载全部 CSS 和 HTML 。

#### 减少 HTTP 请求

最好把 CSS 文件数量控制在一到两个，尽可能不要在生产环境使用 `@import` ，因为它会产生额外的 HTTP 请求。

#### 压缩和缓存内容

线上启用 GZIP 压缩 CSS ，一般来说 CSS 压缩后其文件大小能减少 70%~80% ，减少带宽占用。

通过 HTTP 头部告诉浏览器缓存文件，如果文件有修改，则通过文件名来 “清除缓存” （例如 webpack 的文件名 hash）。

#### 不让浏览器渲染阻塞 JavaScript

如果在 HTML 的 `<head>` 元素中加入了 `<script>` 元素，那么浏览器必须先把它链接的脚本下载下来，然后再显示网页内容。

主流的做法是在页面最底部的 `</body>` 之前加载 JavaScript 。

比较现代的做法是在 `<head>` 中使用 `<script>` 标签，但添加 `async` 和 `defer` 属性。`defer` 会异步加载脚本，不阻塞 HTML 解析，但脚本加载完成时会立即执行、阻塞 HTML 解析。`defer` 会异步加载脚本，并且在 HTML 加载完毕之后再执行加载的脚本。
