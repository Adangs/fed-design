<template>
  <div class="m-design-canvas js-deselect-element">
    <div
      ref="js-design-canvas"
      class="capture js-design-canvas"
      :class="{'preview': isPreview}"
      :style="canvasStyle"
    >
      <!--背景层-->
      <x-canvas-background :layouts="canvas" />
      <!--主要元素内容  :z="item.zIndex"-->
      <x-draggable-resizable
        v-for="(item, index) in elements"
        :ref="'ref-element-' + item.id"
        :key="item.id"
        :handles="item.type === 'image' ? ['tl','tr','br','bl'] : ['tl','tr','mr','br','bl','ml']"
        :r="item.rotate"
        :w="item.width"
        :h="item.height"
        :x="item.x"
        :y="item.y"
        :scale="canvas.scale"
        :draggable="!item.lock && !isPreview && item.draggable"
        :resizable="!item.lock && !isPreview"
        :min-width="30"
        :lock-aspect-ratio="item.type === 'image'"
        snap
        deselect-element=".js-deselect-element"
        @dragging="onDrag"
        @activated="onActivated(item, index)"
        @resizing="onResize"
        @deactivated="onDeactivated(item, index)"
        @on-line-params="getRefLineParams"
        @on-rotate="onRotate"
      >
        <!--图片内容-->
        <x-canvas-image v-if="item.type === 'image'" :params="item" :index="index" :disabled="isPreview" />
        <!--文本内容-->
        <x-canvas-editor v-if="item.type === 'text'" :params="item" :index="index" :disabled="isPreview" />
      </x-draggable-resizable>
      <!--辅助线-->
      <span
        v-for="(item, index) in vLine"
        v-show="item.display"
        :key="'v-' + index"
        class="ref-line v-line"
        :style="{ left: item.position, top: item.origin, height: item.lineLength}"
      />
      <span
        v-for="(item, index) in hLine"
        v-show="item.display"
        :key="'h-' + index"
        class="ref-line h-line"
        :style="{ top: item.position, left: item.origin, width: item.lineLength}"
      />
    </div>
    <!--缩放工具-->
    <x-canvas-scale v-if="!isPreview" ref="ref-canvas-scale" />
    <!--缩放面板-->
    <x-canvas-zoom v-if="!isPreview" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XDraggableResizable from './components/x-draggable-resizable'
import XCanvasBackground from './components/x-canvas-background'
import XCanvasImage from './components/x-canvas-image'
import XCanvasEditor from './components/x-canvas-editor'
import XCanvasScale from './components/x-canvas-scale'
import XCanvasZoom from './components/x-canvas-zoom'

export default {
  name: 'XDesignCanvas',
  components: {
    XDraggableResizable,
    XCanvasBackground,
    XCanvasImage,
    XCanvasEditor,
    XCanvasScale,
    XCanvasZoom
  },
  props: {
    type: {
      type: String,
      default: 'create' // create | edit | preview
    },
    preview: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isPreview: false, // 是否为预览
      offset: {
        left: 0,
        top: 0,
        offsetWidth: 0,
        offsetHeight: 0
      },
      vLine: [],
      hLine: []
    }
  },
  computed: {
    ...mapState({
      layouts: state => state['design'].layouts,
      editor: state => state['design'].currentEditor,
      current: state => state['design'].current,
      currentIndex: state => state['design'].currentIndex
    }),
    // 当前画布
    canvas () {
      return this.isPreview ? this.preview.layouts : this.layouts
    },
    // 子元素
    elements () {
      return this.canvas.elements
    },
    // 画布宽
    width () {
      return this.canvas.width
    },
    // 画布高
    height () {
      return this.canvas.height
    },
    // 画布样式
    canvasStyle () {
      return {
        'left': `${this.offset.left}px`,
        'top': `${this.offset.top}px`,
        'transform': `scale(${this.canvas.scale})`,
        'width': `${this.width}px`,
        'height': `${this.height}px`
      }
    },
    preview_width () {
      return this.preview
    }
  },
  watch: {
    type: {
      handler (val) {
        if (val === 'preview') {
          this.isPreview = true
          this.setPreview()
        }
      },
      immediate: true
    }
  },
  created () {
    // 重置画布
    this.$bus.on('bus-design-created-canvas', this.onBusCreatedCanvas)
    // 获取图层组件并进行回调
    this.$bus.on('bus-design-element-event', this.onBusElementEvent)
    // 移动缩放画布
    this.$bus.on('bus-design-zoom-move', this.onBusZoomMove)
  },
  mounted () {
    this.setOffset()
  },
  methods: {
    // 重置、初始化、切换画布
    onBusCreatedCanvas () {
      // 位置调整
      this.setOffset()
      // 适应屏幕
      this.$nextTick(() => {
        this.$refs['ref-canvas-scale'] && this.$refs['ref-canvas-scale'].onEqual()
      })
    },
    // 获取更新画布信息
    setOffset () {
      const { offsetWidth, offsetHeight } = this.$el
      const left = (offsetWidth - this.width) / 2
      const top = (offsetHeight - this.height) / 2

      this.offset = {
        offsetWidth,
        offsetHeight,
        left,
        top
      }
    },
    // 辅助线回调事件
    getRefLineParams (params) {
      // console.log(params);
      const { vLine, hLine } = params
      this.vLine = vLine
      this.hLine = hLine
    },
    // 设置当前选中模块
    setCurrent (value) {
      this.$store.dispatch('design/setCurrent', value)
      this.$store.dispatch('design/setElement', {
        index: this.currentIndex,
        value
      })
    },
    // 被激活时
    onActivated (e, index) {
      if (e.type !== 'text') {
        // 当前选中图层非文本时，清除选中编辑器数据
        this.$store.dispatch('design/setCurrentEditor', null)
      }
      this.$store.dispatch('design/setCurrentIndex', index)
      this.$store.dispatch('design/setCurrent', e)
    },
    // 拖动中
    onDrag (x, y) {
      const current = {
        ...this.current,
        x,
        y
      }
      this.setCurrent(current)
    },
    // 旋转
    onRotate (rotate) {
      const current = {
        ...this.current,
        rotate
      }
      this.setCurrent(current)
    },
    // 调整大小
    onResize (x, y, width, height) {
      const current = {
        ...this.current,
        width,
        height,
        x,
        y
      }
      this.setCurrent(current)
      this.editor && this.getEditorInfo()
    },
    // 被停用
    onDeactivated () {
      this.$store.dispatch('design/setCurrentIndex', null)
      this.$store.dispatch('design/setCurrent', null)
    },
    // 事件中转
    onBusElementEvent ({ id, callback }) {
      if (callback) {
        // 找到ref给回调函数
        const refs = this.$refs[`ref-element-${id}`]
        if (Object.prototype.toString.call(refs) === '[object Object]') {
          refs && callback(refs)
        } else {
          refs && callback(refs[0])
        }
      }
    },
    // 更新编辑器信息
    getEditorInfo () {
      const { clientWidth, clientHeight } = this.editor.root
      const current = {
        ...this.current,
        width: clientWidth + 1,
        height: clientHeight + 1
      }
      this.setCurrent(current)
    },
    // 缩放画布拖动
    onBusZoomMove ({ x, y }) {
      // const { offsetWidth, offsetHeight } = this.$el;
      // const left = (offsetWidth - this.width) / 2;
      // const top = (offsetHeight - this.height) / 2;
      // console.log(x, y);

      this.offset.left = -x
      this.offset.top = -y
    },
    // 设置为预览模式
    setPreview () {
      const { layouts } = this.preview
      layouts.scale = this.preview_width / layouts.width
    }
  }
}
</script>

<style lang="less">
  .m-design-canvas{
    flex: 1; position: relative;
    .capture{
      position: absolute; overflow: hidden; box-shadow: 1px 1px 15px rgba(0,0,0,.2);
      background-color: #fff; background-image: linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc),linear-gradient(to top right,#ccc 25%,transparent 0,transparent 75%,#ccc 0,#ccc); background-size: 16px 16px; background-position: 0 0,8px 8px;
      &.preview{
        .x-draggable-resizable{
          &.active:before,
          &:hover:before{ display: none;}
        }
      }
      .el-image{ width: 100%; height: 100%;}
      .background{ width: 100%; height: 100%; }
      .x-draggable-resizable{
        border: 0;
        .handle{ z-index: 30;}
        &:before{ pointer-events: none; position: absolute; content: ''; border: 1px solid #6ccfff; width: 100%; height: 100%; left: 0; top: 0; display: none; box-sizing: border-box; }
        &.active:before,
        &:hover:before{ display: block; z-index: 30;}
      }
      .ref-line{
        position: absolute; background-color: rgb(255, 0, 204); z-index: 9999;
        &.v-line{ width: 1px; }
        &.h-line{ height: 1px; }
      }
    }
  }
</style>
