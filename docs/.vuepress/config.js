module.exports = {
  base: '/carousel/',
  title: 'Carousel',
  description: 'Carousel 文档',
  head: [
    ['script', { async: '', src: '/carousel.min.js' }],
    ['link', { rel: 'stylesheet', href: '/carousel.min.css' }],
    ['link', { rel: 'stylesheet', href: '/theme.min.css' }]
  ],
  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: 'Github', link: 'https://www.github.com/inottn/carousel' }
    ],
    sidebar: ['/start', '/demo', '/theme'],
    sidebarDepth: 3
  }
}
