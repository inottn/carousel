export default class Carousel {
  constructor(options = {}) {
    this.DEFAULTS = {
      carouselContainerClassName: 'in-carousel-container',
      carouselWrapperClassName: 'in-carousel-wrapper',
      carouselItemClassName: 'in-carousel-item',
      indicatorContainerClassName: 'in-indicator-container',
      activedIndicatorClassName: 'in-indicator-active',
      arrowClassName: 'in-arrow',
      arrowPreviousClassName: 'in-arrow-prev',
      arrowNextClassName: 'in-arrow-next',
      height: '300px',
      duration: 300,
      interval: 4000,
      easing: 'ease-out',
      autoplay: true,
      trigger: 'click',
      vertical: false,
      initialIndex: 0,
      loop: true,
      finish: true,
      hoverStop: true
    }
    this.config = Object.assign({}, this.DEFAULTS, options)
    this.autoplayTimer = null
    this.isPlaying = false
    this.init()
  }

  init() {
    this.normalizeEl()
    this.normalizeInfo()
    this.createCarousel()
    this.carouselContainer = this.config.el.querySelector(
      '.' + this.config.carouselContainerClassName
    )
    this.carouselWrapper = this.config.el.querySelector(
      '.' + this.config.carouselWrapperClassName
    )
    this.indicatorContainer = this.config.el.querySelector(
      '.' + this.config.indicatorContainerClassName
    )
    this.arrowPrevious = this.config.el.querySelector(
      '.' + this.config.arrowPreviousClassName
    )
    this.arrowNext = this.config.el.querySelector(
      '.' + this.config.arrowNextClassName
    )
    this.carouselItemsCount = this.carouselWrapper.childElementCount - 2
    this.targetId = this.currentId = this.config.initialIndex + 1
    this.setStyles()
    this.step = 100 / (this.carouselItemsCount + 2)
    this.transform(-this.step * this.currentId, false)
    this.changeActivedIndicatorItem()
    this.eventRegister()
    if (this.config.autoplay) this.play()
  }

  createCarousel() {
    let carouselHTML = ''
    let carouselItemHTML = ''
    let indicatorItemHTML = ''

    this.config.info.forEach((item, index, info) => {
      carouselItemHTML += this.createCarouselItem(item, index)

      if (index === 0) {
        carouselItemHTML =
          this.createCarouselItem(info[info.length - 1], info.length - 1) +
          carouselItemHTML
      } else if (index === info.length - 1) {
        carouselItemHTML += this.createCarouselItem(info[0], 0)
      }

      indicatorItemHTML += `<li data-item-id="${index + 1}"></li>`
    })

    carouselHTML = `
      <div class="${this.config.carouselContainerClassName}">
        <ul class="${this.config.carouselWrapperClassName}">
          ${carouselItemHTML}
        </ul>
        <button 
          class="${this.config.arrowClassName}
            ${this.config.arrowPreviousClassName}">
        </button>
        <button 
          class="${this.config.arrowClassName}
            ${this.config.arrowNextClassName}">
        </button>
      </div>
      <ul class="${this.config.indicatorContainerClassName}">
        ${indicatorItemHTML}
      </ul>
    `
    this.config.el.innerHTML = carouselHTML
  }

  normalizeEl() {
    if (typeof this.config.el === 'string') {
      this.config.el = document.querySelector(this.config.el)
    }
  }

  normalizeInfo() {
    this.config.info.forEach((item, index, info) => {
      if (typeof item === 'string') {
        info[index] = {
          imgUrl: item
        }
      }
    })
  }

  hasHref(index) {
    const item = this.config.info[index]

    return item.hasOwnProperty('href')
  }

  createCarouselItem(item, index) {
    if (this.hasHref(index)) {
      return `
      <li class="${this.config.carouselItemClassName}"
        data-item-id="${index + 1}">
        <a href="${item.href}">
          <img src="${item.imgUrl}">
        </a>
      </li>`
    } else {
      return `
      <li class="${this.config.carouselItemClassName}"
        data-item-id="${index + 1}">
          <img src="${item.imgUrl}">
      </li>`
    }
  }

  setStyles() {
    const style = this.carouselWrapper.style

    if (this.config.height.search('%') === -1) {
      this.carouselContainer.style.height = this.config.height
    } else {
      this.carouselContainer.style.height = '0'
      this.carouselContainer.style['padding-bottom'] = this.config.height
    }

    if (this.config.vertical) {
      style['flex-direction'] = 'column'
    } else {
      style['flex-direction'] = 'row'
      style['width'] = `${(this.carouselItemsCount + 2) * 100}%`
    }

    style['transition-property'] = 'transform'
    style['transition-timing-function'] = `${this.config.easing}`
    style['transition-duration'] = `${this.config.duration}ms`

    Array.from(this.carouselWrapper.children).forEach(item => {
      if (!this.config.vertical) {
        item.style.width = `${100 / (this.carouselItemsCount + 2)}%`
      }
    })
  }

  changeActivedIndicatorItem() {
    const items = this.indicatorContainer.children
    const className = this.config.activedIndicatorClassName

    items[this.currentId - 1].classList.remove(className)
    items[this.targetId - 1].classList.add(className)
  }

  transform(translateValue, transitionStatus) {
    const style = this.carouselWrapper.style

    this.carouselContainer.offsetWidth

    if (transitionStatus) {
      style['transition-duration'] = `${this.config.duration}ms`
    } else {
      style['transition-duration'] = '0s'
    }

    if (this.config.vertical) {
      style['transform'] = `translateY(${translateValue}%)`
    } else {
      style['transform'] = `translateX(${translateValue}%)`
    }
  }

  direct() {
    this.transform(-this.targetId * this.step, true)
  }

  directLoop() {
    const currentId = this.currentId
    const targetId = this.targetId
    const itemsCount = this.carouselItemsCount

    if (targetId < currentId) {
      this.transform(0, false)
      this.transform(-targetId * this.step, true)
    } else {
      this.transform(-(itemsCount + 1) * this.step, false)
      this.transform(-targetId * this.step, true)
    }
  }

  switch(type) {
    const currentId = this.currentId
    const targetId = this.targetId
    const itemsCount = this.carouselItemsCount

    if (targetId === currentId) return
    if (this.config.finish && this.isPlaying) return

    this.isPlaying = true

    this.changeActivedIndicatorItem()

    this.config.changeStart && this.config.changeStart(currentId, targetId)

    switch (type) {
      case 'autoplay':
        this.config.autoplayStart &&
          this.config.autoplayStart(currentId, targetId)
        break
      case 'arrowTrigger':
        this.config.arrowTriggerStart &&
          this.config.arrowTriggerStart(currentId, targetId)
        break
      case 'indicatorTrigger':
        this.config.indicatorTriggerStart &&
          this.config.indicatorTriggerStart(currentId, targetId)
        break
      default:
        break
    }

    const isFirst = currentId === 1 && targetId === itemsCount
    const isLast = currentId === itemsCount && targetId === 1

    if (this.config.loop && (isFirst || isLast)) {
      this.directLoop()
    } else {
      this.direct()
    }

    this.currentId = this.targetId
  }

  play() {
    clearTimeout(this.autoplayTimer)
    this.autoplayTimer = setTimeout(() => {
      this.autoplay()
    }, this.config.interval)
  }

  stop() {
    clearTimeout(this.autoplayTimer)
    this.autoplayTimer = null
  }

  autoplay() {
    clearTimeout(this.autoplayTimer)

    const currentId = this.currentId
    this.targetId = currentId === this.carouselItemsCount ? 1 : currentId + 1
    this.switch('autoplay')

    this.autoplayTimer = setTimeout(() => {
      this.autoplay()
    }, this.config.interval + this.config.duration)
  }

  prev(type) {
    if (this.config.finish && this.isPlaying) return
    this.stop()

    const currentId = this.currentId
    const itemsCount = this.carouselItemsCount

    this.targetId = currentId - 1 === 0 ? itemsCount : currentId - 1
    this.switch(type)

    if (this.config.autoplay) this.play()
  }

  next(type) {
    if (this.config.finish && this.isPlaying) return
    this.stop()

    const currentId = this.currentId
    const itemsCount = this.carouselItemsCount

    this.targetId = currentId === itemsCount ? 1 : currentId + 1
    this.switch(type)

    if (this.config.autoplay) this.play()
  }

  indicatorTrigger() {
    let trigger

    if (this.config.trigger === 'click') {
      trigger = 'click'
    } else if (this.config.trigger === 'hover') {
      trigger = 'mouseover'
    }

    this.indicatorContainer.addEventListener(trigger, e => {
      if (this.config.finish && this.isPlaying) return
      this.stop()

      if (Array.from(this.indicatorContainer.children).includes(e.target)) {
        this.targetId = Number(e.target.dataset.itemId.substr(-1))
        this.switch('indicatorTrigger')
      }

      if (this.config.autoplay) this.play()
    })
  }

  eventRegister() {
    this.indicatorTrigger()

    this.arrowPrevious.addEventListener('click', () => {
      this.prev('arrowTrigger')
    })
    this.arrowNext.addEventListener('click', () => {
      this.next('arrowTrigger')
    })

    this.carouselWrapper.addEventListener('transitionend', () => {
      this.isPlaying = false
      this.config.changeEnd &&
        this.config.changeEnd(this.currentId, this.targetId)
    })

    if (this.config.hoverStop) {
      this.carouselContainer.addEventListener('mouseenter', () => {
        this.stop()
      })
      this.carouselContainer.addEventListener('mouseleave', () => {
        if (this.config.autoplay) this.play()
      })
    }
  }
}
