<template>
  <x-draggable-resizable
    :ref="'ref-element-' + background.id"
    :w="layouts.width"
    :h="layouts.height"
    :z="0"
    :draggable="false"
    :resizable="false"
    deselect-element=".js-deselect-element"
    @activated="onActivated"
    @deactivated="onDeactivated"
  >
    <div class="background" :style="{'background-color': background.color || '#fff'}">
      <!--背景图片-->
      <el-image v-if="background.image" fit="cover" :src="background.image + '?x-oss-process=image/interlace,1,image/format,webp'" />
    </div>
  </x-draggable-resizable>
</template>

<script>
import XDraggableResizable from '../x-draggable-resizable'

export default {
  name: 'XCanvasBackground',
  components: {
    XDraggableResizable
  },
  props: {
    layouts: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  computed: {
    // 背景
    background () {
      return this.layouts.background
    }
  },
  watch: {},
  created () {
    // 获取图层组件并进行回调
    this.$bus.on('bus-design-element-event', this.onBusElementEvent)
  },
  methods: {
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
    // 被激活时
    onActivated () {
      this.$store.dispatch('design/setCurrent', this.background)
    },
    // 被停用
    onDeactivated () {
      this.$store.dispatch('design/setCurrent', null)
    }
  }
}
</script>

<style>

</style>
