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
