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

`span` 用于给文本流添加样式，但即便是给文本添加样式，也要注意是否存在有合适语义的标签可以使用，例如

```html
<p>请注意，明天早上 <time>08:00</time> 在 <em>东湖广场</em> 集合，举办 <q>颁奖大会</q> ，请务必 <strong>正装</strong> 出席。</p>
```

### 扩展 HTML 语意

#### AIRA 的 role 属性

无障碍富英特网应用 (AIRA, accessible rich Internet application) 是对 HTML 规范的补充，它提供了针对辅助访问设备添加更多语义的手段，方式就是为文档中的不同元素制定其包含什么内容，或者说它们提供什么功能。

比如 `role="navigation"` 这个 “地标角色” 用于声明一个元素具有导航的角色。

其它的角色有

- `banner`
- `form`
- `main`
- `search`
- `complementary`
- `contentinfo`
- `application`

完整的 AIRA 角色及其定义参考 [AIRA 规范](https://www.w3.org/TR/html-aria/#allowed-descendants-of-aria-roles)。

下面是一个音量滚动条

```html
<div id="volume-label">Volume</div>
<div class="volume-rail">
  <a
    href="#" class="volume-handle"
    role="slider"
    aria-labelledby="volume-label"
    aria-valuemin="1"
    aria-valuemax="100"
    aria-valuenow="67"
  ></a>
</div>
```

属性 `aria-labelledby`、`aria-valuemin`、`aria-valuemax`、`aria-valuenow` 分别提供了额外的信息，辅助阅读技术可以利用它们帮助残障用户使用这个滑动部件。

#### 微格式

使用基于 vCard 和 iCalendar 等已有的数据格式制定的类名来标注标签。易于开发人员编写工具从中提取数据。

```html
<section class="h-card">
  <p>
    <a class="u-url p-name" href="https://beary.me">Beary</a>
    <span class="p-org">Beary Ltd</span>
    <a class="u-email" href="mailto:bearyme@outlook.com">
      bearyme@outlook.com
    </a>
  </p>
  <p class="p-adr">
    <span class="p-locality">Guangzhou</span>
    <span class="p-country-name">China</span>
  </p>
</section>
```

#### 微数据

跟 HTML5 一起，作为给 HTML 添加结构化数据的另一种方式而推出。其功能和微数据类似，但由于考虑到可扩展性，它可以用于表示任意类型的数据。

定义特定格式的事交给了使用者或第三方。比如由 Bing 、Google、Yahoo! 等搜索引擎共同创建的 https://schema.org 中的一个词汇表。
