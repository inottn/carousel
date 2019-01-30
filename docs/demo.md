# 演示

## 配置

### 基本配置

`el` 和 `info` 是必填项。`height` 建议填写。

<div class="in-carousel-base">
  <button class="init-carousel-button" @click="initCarousel(options_base)">点击初始化轮播图</button>
</div>

```js
const info = [
  '/carousel/01.png',
  '/carousel/02.png',
  '/carousel/03.png',
  '/carousel/04.png',
  '/carousel/05.png',
]
new InCarousel({
  el: '.in-carousel-base',
  info,
  height: '200px',
})
```

### info 配置项

只需要图片，`info` 可简写为 `['url1', 'url2', 'url3']` 的格式

<div class="in-carousel-info-1">
  <button class="init-carousel-button" @click="initCarousel(options_info_1)">点击初始化轮播图</button>
</div>

```js
const info = [
  '/carousel/01.png',
  '/carousel/02.png',
  '/carousel/03.png',
  '/carousel/04.png',
  '/carousel/05.png',
]
```

需要为图片添加超链接，`info` 格式如下

<div class="in-carousel-info-2">
  <button class="init-carousel-button" @click="initCarousel(options_info_2)">点击初始化轮播图</button>
</div>

```js
const info = [
  {
    href: 'https://github.com/inottn',
    imgUrl: '/carousel/01.png'
  },
  {
    href: 'https://github.com/inottn',
    imgUrl: '/carousel/02.png'
  },
  {
    href: 'https://github.com/inottn',
    imgUrl: '/carousel/03.png'
  },
  {
    href: 'https://github.com/inottn',
    imgUrl: '/carousel/04.png'
  },
  {
    href: 'https://github.com/inottn',
    imgUrl: '/carousel/05.png'
  }
]
```

### height 配置项

当 `height` 设置为百分比时，相对于轮播图的宽度。

<div class="in-carousel-height">
  <button class="init-carousel-button" @click="initCarousel(options_height)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '56.2%',
})
```

### autoplay 配置项

是否自动播放，默认为 `true` 。

<div class="in-carousel-autoplay">
  <button class="init-carousel-button" @click="initCarousel(options_autoplay)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  autoplay: false,
})
```

### trigger 配置项

指示器的触发方式，默认 `click` 触发，可设置为 `hover` 。

<div class="in-carousel-trigger">
  <button class="init-carousel-button" @click="initCarousel(options_trigger)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  trigger: 'hover',
})
```

### initialIndex 配置项

初始状态激活的幻灯片的索引，从 `0` 开始，默认为 `0` 。

<div class="in-carousel-initial-index">
  <button class="init-carousel-button" @click="initCarousel(options_initial_index)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  initialIndex: 3,
})
```

### loop 配置项

是否循环显示，默认 `true` 。

<div class="in-carousel-loop">
  <button class="init-carousel-button" @click="initCarousel(options_loop)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  loop: false,
})
```

### hoverStop 配置项

鼠标悬停面板上是否停止播放，默认为 `true` 。

<div class="in-carousel-hover-stop">
  <button class="init-carousel-button" @click="initCarousel(options_hover_stop)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  hoverStop: false,
})
```

### vertical 配置项

是否垂直切换，默认为 `false` 。

<div class="in-carousel in-carousel-vertical">
  <button class="init-carousel-button" @click="initCarousel(options_vertical)">点击初始化轮播图</button>
</div>

```js
new InCarousel({
  el,
  info,
  height: '200px',
  vertical: true,
})
```

## 钩子

更新中。。。

<style>
.in-carousel {
  min-width: 550px;
}

.init-carousel-button {
  border: 2px solid #333;
  background-color: #fff;
  cursor: pointer;
  outline: none;
  border-radius: 33px;
  padding: 5px 16px;
  font-size: 13px;
  font-weight: 700;
  transition: background-color .3s ease;
}

.init-carousel-button:hover {
  color: #fff;
  background-color: #333;
}
</style>

<script>
export default {
  data() {
    return {
      info: [
        '/carousel/01.png',
        '/carousel/02.png',
        '/carousel/03.png',
        '/carousel/04.png',
        '/carousel/05.png',
      ],
      info2: [
        {
          href: 'https://github.com/inottn',
          imgUrl: '/carousel/01.png'
        },
        {
          href: 'https://github.com/inottn',
          imgUrl: '/carousel/02.png'
        },
        {
          href: 'https://github.com/inottn',
          imgUrl: '/carousel/03.png'
        },
        {
          href: 'https://github.com/inottn',
          imgUrl: '/carousel/04.png'
        },
        {
          href: 'https://github.com/inottn',
          imgUrl: '/carousel/05.png'
        }
      ],
      options_base: {
        el: '.in-carousel-base',
      },
      options_info_1: {
        el: '.in-carousel-info-1',
      },
      options_info_2: {
        el: '.in-carousel-info-2',
      },
      options_height: {
        el: '.in-carousel-height',
        height: '56.2%',
      },
      options_vertical: {
        el: '.in-carousel-vertical',
        vertical: true,
      },
      options_trigger: {
        el: '.in-carousel-trigger',
        trigger: 'hover',
      },
      options_initial_index: {
        el: '.in-carousel-initial-index',
        initialIndex: 3,
      },
      options_loop: {
        el: '.in-carousel-loop',
        loop: false,
      },
    }
  },
  methods: {
    initCarousel(options) {
      new Carousel(options)
    }
  },
  created() {
    this.options_base.info = this.info
    this.options_info_1.info = this.info
    this.options_info_2.info = this.info2
    this.options_height.info = this.info
    this.options_vertical.info = this.info
    this.options_trigger.info = this.info
    this.options_initial_index.info = this.info
    this.options_loop.info = this.info
  }
}
</script>