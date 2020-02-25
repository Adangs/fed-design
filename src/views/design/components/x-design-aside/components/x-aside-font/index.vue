<template>
  <div class="x-aside-template font">
    <div class="title">文字</div>
    <div class="button">
      <el-button @click="onAddEditor">添加文字</el-button>
    </div>
    <div class="list">
      <div class="m-expect"><span>文字模板，敬请期待</span></div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex'

export default {
  name: 'XAsideFont',
  components: {},
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
    // 添加文案图层
    async onAddEditor () {
      const current = this.current
      const width = 420
      const height = 95
      let x = (this.layouts.width - width) / 2
      let y = (this.layouts.height - height) / 2
      if (current) {
        x = this.current.x + 20
        y = this.current.y + 20
      }
      const layer = {
        id: uuidv4(),
        type: 'text',
        content: '<p class="ql-align-center"><span style="color: rgb(0, 0, 0); font-size: 50px;">双击编辑文字</span></p>',
        style: {
          'font-family': 'SourceHanSansCN-03',
          'letter-spacing': 0,
          'line-height': 1.4
        },
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
      if (current) {
        // 停用之前选中的图层
        this.$bus.emit('bus-design-element-event', {
          id: current.id,
          callback: (ref) => {
            ref.deselect()
          }
        })
      }
      const { length } = await this.$store.dispatch('design/setElement', {
        type: 'push',
        value: layer
      })
      // 新增的图层设置为当前
      await this.$store.dispatch('design/setCurrentIndex', length - 1)
      await this.$store.dispatch('design/setCurrent', layer)
      // 激活新增的图层
      this.$bus.emit('bus-design-element-event', {
        id: layer.id,
        callback: (ref) => {
          ref.setActive()
        }
      })
    }
  }
}
</script>

<style lang="less">
  .x-aside-template.font{
    .button{
      .el-button{ display: block; width: 100%;}
    }
  }
</style>
