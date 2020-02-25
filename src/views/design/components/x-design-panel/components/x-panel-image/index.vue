<template>
  <div class="x-panel-image">
    <div class="title">图片</div>
    <div class="content">
      <div class="block">
        <div class="submit">
          <x-design-upload @on-success="onSuccess">
            <el-button>替换图片</el-button>
          </x-design-upload>
        </div>
      </div>

      <!--共用操作-->
      <x-panel-common />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XPanelCommon from '../x-panel-common'
import XDesignUpload from '~/views/design/components/x-design-upload'

export default {
  name: 'XPanelImage',
  components: {
    XPanelCommon,
    XDesignUpload
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      current: state => state['design'].current,
      currentIndex: state => state['design'].currentIndex
    })
  },
  watch: {},
  created () {

  },
  methods: {
    // 设置当前选中模块
    setCurrent (value) {
      this.$store.dispatch('design/setCurrent', value)
      this.$store.dispatch('design/setElement', {
        index: this.currentIndex,
        value
      })
    },
    onSuccess (src) {
      const current = {
        ...this.current,
        url: src
      }
      this.setCurrent(current)
    }
  }
}
</script>

<style>

</style>
