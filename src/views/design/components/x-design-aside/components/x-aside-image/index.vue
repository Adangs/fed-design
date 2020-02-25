<template>
  <div class="x-aside-template image">
    <div class="title">图片</div>
    <div class="button">
      <x-design-upload @on-success="onAddImage">
        <el-button>上传图片</el-button>
      </x-design-upload>
    </div>
    <div class="list">
      <div class="m-expect"><span>图片模板，敬请期待</span></div>
    </div>
  </div>
</template>

<script>
import XDesignUpload from '../../../../components/x-design-upload'
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'

export default {
  name: 'XAsideImage',
  components: {
    XDesignUpload
  },
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState({
      layouts: state => state['design'].layouts,
      current: state => state['design'].current
    })
  },
  watch: {},
  created () {

  },
  methods: {
    // 添加图片图层
    async onAddImage (src, info) {
      const current = this.current
      let width = info.width
      let height = info.height
      // 尺寸
      const scaleW = this.layouts.width * 0.8
      const scaleH = this.layouts.height * 0.8
      if (width > scaleW || height > scaleH) {
        if (width > scaleW) {
          width = scaleW
          height = info.height * (scaleW / info.width)
        }
        if (height > scaleH) {
          height = scaleH
          width = info.width * (scaleH / info.height)
        }
      }
      // 坐标
      let x = (this.layouts.width - width) / 2
      let y = (this.layouts.height - height) / 2
      if (current) {
        x = this.current.x + 20
        y = this.current.y + 20
      }
      const layer = {
        id: uuidv4(),
        type: 'image',
        url: src,
        zIndex: 1,
        draggable: true,
        lock: false,
        opacity: 1,
        rotate: 0,
        width,
        height,
        x,
        y
      }
      const { length } = await this.$store.dispatch('design/setElement', {
        type: 'push',
        value: layer
      })
      if (current) {
        // 停用之前选中的图层
        this.$bus.emit('bus-design-element-event', {
          id: current.id,
          callback: (ref) => {
            ref.deselect()
          }
        })
      }
      // 激活新增的图层
      this.$bus.emit('bus-design-element-event', {
        id: layer.id,
        callback: (ref) => {
          ref.setActive()
        }
      })
      // 新增的图层设置为当前
      await this.$store.dispatch('design/setCurrentIndex', length - 1)
      await this.$store.dispatch('design/setCurrent', layer)
      await this.$store.dispatch('design/setCurrentEditor', null)
    }
  }
}
</script>

<style lang="less">
  .x-aside-template.image{
    .button{
      .el-button{ display: block; width: 100%;}
    }
  }
</style>
