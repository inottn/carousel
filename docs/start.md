# 开始

<div class="in-carousel-start"></div>

## 安装

使用 `npm` :

```
npm install @inottn/carousel --save
```

使用 `Yarn` :

```
yarn add @inottn/carousel
```

或者直接下载使用 `script` 及 `link` 标签引入:

```html
<link rel="stylesheet" href="carousel.min.css">
<link rel="stylesheet" href="theme.min.css">
<script src="carousel.min.js"></script>
```

## 入门

::: tip 提示
`carousel` 插件包含 `js` 文件和 `css` 文件。其中 `css` 文件有两部分。

`carousel.min.css` 文件声明了插件所必须的样式。

`theme.min.css` 文件声明 `indicator` 和 `arrow` 结构的基本样式，可根据需求自定义。
:::


使用 `script` 标签引入 `js` 文件，`Carousel` 会被注册为一个全局变量。

```html
<link rel="stylesheet" href="carousel.min.css">
<link rel="stylesheet" href="theme.min.css">
<div id="carousel"></div>
<script src="carousel.min.js"></script>
```

使用模块管理器引入

```javascript
import '@inottn/carousel/dist/carousel.min.css'
import '@inottn/carousel/dist/theme.min.css'
import Carousel from '@inottn/carousel'
```

创建 `Carousel` 对象

```javascript
const carousel = new Carousel({
  el: '#carousel',
  info: [
    '/carousel/01.png',
    '/carousel/02.png',
    '/carousel/03.png',
    '/carousel/04.png',
    '/carousel/05.png',
  ],
  height: '200px'
})
```

## 配置项

### 基本配置

部分配置项具体说明点击 [演示](./demo.html)

名称 | 说明 | 类型 | 可选值 | 默认值
--- | --- | --- | ----- | -----
el | 挂载目标 | HTMLElement \| string | — | —
info | 轮播图信息 | Array | — | —
height | 轮播图高度 | string | — | 300px
autoplay | 是否自动切换 | boolean | — | true
loop | 是否循环显示 | boolean | — | true
trigger | 指示器的触发方式 | string | click / hover | click
interval | 自动切换的时间间隔，单位为毫秒 | number | — | 4000
duration | 切换持续时间，单位为毫秒 | number | — | 400
easing | 切换时的动画效果 | string | — | ease-out
vertical | 是否垂直切换 | boolean | — | false
initialIndex | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0
finish | 当前切换完成后可触发下一次切换 | boolean | — | true
hoverStop | 鼠标悬停面板上是否停止自动播放 | boolean | — | true

### 类名

当类名冲突时可配置下列项修改默认类名

名称 | 默认值
--- | ----- 
carouselContainerClassName | in-carousel-container
carouselWrapperClassName | in-carousel-wrapper
carouselItemClassName | in-carousel-item
indicatorContainerClassName | in-indicator-container
activedIndicatorClassName | in-indicator-active
arrowClassName | in-arrow
arrowPreviousClassName | in-arrow-prev
arrowNextClassName | in-arrow-next

### 钩子

回调参数均为切换前的幻灯片的索引，切换后幻灯片的索引，索引从 `1` 开始

切换开始时，`changeStart` 事件最先执行

`finish` 配置项为 `false` 且连续切换，则只触发最后一次 `changeEnd` 事件

事件名 | 说明
----- | ---
changeStart | 切换开始时执行
changeEnd | 切换结束时执行
autoPlayStart | 自动切换开始时执行
arrowTriggerStart | 触发箭头切换开始时执行
indicatorTriggerStart | 触发指示器切换开始时执行

## 实例方法

`play()` : 开启自动切换

`stop()` : 停止自动切换

`next(type)` : 切换至上一张幻灯片，参数 `type` 可触发对应钩子事件

`prev(type)` : 切换至下一张幻灯片，参数 `type` 可触发对应钩子事件

<style>
.in-carousel-start .in-carousel-container {
  /* padding-bottom: 56.2%; */
}
</style>

<script>
export default {
  mounted () {
    const info = [
      '/carousel/01.png',
      '/carousel/02.png',
      '/carousel/03.png',
      '/carousel/04.png',
      '/carousel/05.png',
    ]

    new Carousel({
      el: '.in-carousel-start',
      info,
      height: '56.2%',
    })
  }
}
</script>