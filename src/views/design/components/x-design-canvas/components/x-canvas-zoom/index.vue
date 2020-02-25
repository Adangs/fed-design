<template>
  <div class="x-canvas-zoom">
    <div class="preview" @mousedown="elementDown">
      <div class="canvas" :style="previewStyle">canvas</div>
      <div class="zoomed-area" :style="zoomedAreaStyle" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XCanvasZoom',
  components: {},
  props: {},
  data () {
    return {
      w: 160,
      h: 90,
      offsetWidth: 0,
      offsetHeight: 0,
      rawLeft: 0,
      rawTop: 0,
      bounds: {
        mouseX: 0,
        mouseY: 0,
        scaleX: 0,
        scaleY: 0,
        left: 0,
        top: 0
      }
    }
  },
  computed: {
    ...mapState({
      layouts: state => state['design'].layouts
    }),
    width () {
      return this.layouts.width
    },
    height () {
      return this.layouts.height
    },
    // 当前缩放比
    scale () {
      return this.layouts.scale
    },
    // 预览图宽高
    previewAttr () {
      let w = this.w
      let h = Math.ceil(this.height * (w / this.width))
      if (h > this.h) {
        h = this.h
        w = Math.ceil(this.width * (h / this.height))
      }
      const left = (this.w - w) / 2
      const top = (this.h - h) / 2
      return {
        left,
        top,
        width: w,
        height: h
      }
    },
    // 预览图样式
    previewStyle () {
      return {
        'left': `${this.previewAttr.left}px`,
        'top': `${this.previewAttr.top}px`,
        'width': `${this.previewAttr.width}px`,
        'height': `${this.previewAttr.height}px`
      }
    },
    // 缩放区域属性
    zoomedAreaAttr () {
      const width = this.offsetWidth / (this.width / this.previewAttr.width + 10) / this.scale
      const height = this.offsetHeight / (this.height / this.previewAttr.height + 10) / this.scale
      return {
        width,
        height,
        left: this.rawLeft,
        top: this.rawTop
      }
    },
    // 缩放区域样式
    zoomedAreaStyle () {
      const { width, height, left, top } = this.zoomedAreaAttr
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    },
    // 区域限制
    dragLimits () {
      const { width, height } = this.zoomedAreaAttr
      return {
        minLeft: this.previewAttr.left,
        maxLeft: this.previewAttr.left + this.previewAttr.width - width,
        minTop: this.previewAttr.top,
        maxTop: this.previewAttr.top + this.previewAttr.height - height
      }
    }
  },
  watch: {},
  created () {

  },
  mounted () {
    this.setOffset()
  },
  methods: {
    setOffset () {
      const { offsetWidth, offsetHeight } = document.querySelector('.js-deselect-element')
      this.offsetWidth = offsetWidth
      this.offsetHeight = offsetHeight

      const { width, height } = this.zoomedAreaAttr
      const left = (this.w - width) / 2
      const top = (this.h - height) / 2
      this.rawLeft = left
      this.rawTop = top
      this.bounds.left = left
      this.bounds.top = top
    },
    elementDown (e) {
      this.bounds = {
        ...this.bounds,
        mouseX: e.touches ? e.touches[0].pageX : e.pageX,
        mouseY: e.touches ? e.touches[0].pageY : e.pageY,
        scaleX: this.width / this.previewAttr.width,
        scaleY: this.height / this.previewAttr.height
      }

      document.documentElement.addEventListener('mousemove', this.move, false)
      document.documentElement.addEventListener('mouseup', this.handleUp, false)
    },
    move (e) {
      const bounds = this.bounds
      const { minLeft, maxLeft, minTop, maxTop } = this.dragLimits

      const x = bounds.mouseX - (e.touches ? e.touches[0].pageX : e.pageX)
      const y = bounds.mouseY - (e.touches ? e.touches[0].pageY : e.pageY)

      // x区域限制
      this.rawLeft = bounds.left - x
      if (this.rawLeft < minLeft) {
        this.rawLeft = minLeft
      } else if (this.rawLeft > maxLeft) {
        this.rawLeft = maxLeft
      }
      // y区域限制
      this.rawTop = bounds.top - y
      if (this.rawTop < minTop) {
        this.rawTop = minTop
      } else if (this.rawTop > maxTop) {
        this.rawTop = maxTop
      }
      // 向画布发送数据
      this.$bus.emit('bus-design-zoom-move', {
        x: (this.rawLeft - minLeft) * bounds.scaleX,
        y: (this.rawTop - minTop) * bounds.scaleY
      })
    },
    handleUp () {
      this.bounds.left = this.rawLeft
      this.bounds.top = this.rawTop
      document.documentElement.removeEventListener('mousemove', this.move, false)
    }
  }
}
</script>

<style lang="less">
  .x-canvas-zoom{
    position: absolute; background: #fff; right: 20px; bottom: 20px; box-shadow: 0 0 10px rgba(0,0,0,.1); padding: 10px;
    .preview{
      width: 160px; height: 90px; position: relative; overflow: hidden; cursor: move;
      .canvas{ position: absolute; background: #f1f1f1;}
      .zoomed-area{ border: 2px solid #e23738; position: absolute; box-shadow: 0 0 0 200px rgba(252,252,253,.8);}
    }
  }
</style>
