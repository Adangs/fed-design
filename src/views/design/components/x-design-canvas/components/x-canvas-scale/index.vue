<template>
  <div class="x-canvas-scale">
    <ul class="tools">
      <li>
        <el-tooltip placement="top" content="缩小">
          <i class="el-icon-remove-outline" @click="onSetZoom(-10)" />
        </el-tooltip>
      </li>
      <li class="number">{{ formatScale | formatZero(0) }}%</li>
      <li>
        <el-tooltip placement="top" content="放大">
          <i class="el-icon-circle-plus-outline" @click="onSetZoom(10)" />
        </el-tooltip>
      </li>
      <li>
        <el-tooltip placement="top" content="实际大小">
          <i class="iconfont icon-030" @click="setScale(1)" />
        </el-tooltip>
      </li>
      <li>
        <el-tooltip placement="top" content="适应屏幕">
          <i class="iconfont icon-029" @click="onEqual" />
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XCanvasScale',
  components: {},
  props: {},
  data () {
    return {
      offsetWidth: 0,
      offsetHeight: 0
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
    // 百分比文案显示
    formatScale () {
      return this.scale * 100
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
      this.onEqual()
    },
    // 设置缩放
    onSetZoom (zoom) {
      const scale = Number(this.$options.filters.formatZero(this.scale + zoom / 100))
      if (scale < 0.1 || scale > 4) return false
      this.setScale(scale)
    },
    // 适应屏幕
    onEqual () {
      let w = this.width
      let h = this.height
      if (w > this.offsetWidth || h > this.offsetHeight) {
        if (w > this.offsetWidth) {
          w = this.offsetWidth * 0.8
          h = h * (w / this.width)
        }
        if (h > this.offsetHeight) {
          h = this.offsetHeight * 0.8
          w = w * (h / this.height)
        }
        w = Number(this.$options.filters.formatNumber(w / this.offsetWidth, 1))
        h = Number(this.$options.filters.formatNumber(h / this.offsetHeight, 1))
        const scale = Math.max.apply(null, [w, h])
        this.setScale(scale)
      }
      // console.log(scale, w, h, this.offsetWidth, this.offsetHeight);
    },
    // 设置缩放
    setScale (scale) {
      // console.log(scale);
      this.$store.dispatch('design/setData', {
        scale
      })
    }
  }
}
</script>

<style lang="less">
  .x-canvas-scale{
    position: absolute; left: 0; bottom: 20px; width: 100%; z-index: 99;
    .tools{
      position: absolute; left: 50%; bottom: 0; transform: translate3d(-50%, 0, 0); display: flex; align-items: center; background: #fff; padding: 5px 10px; border-radius: 40px; box-shadow: 0 0 10px rgba(0,0,0,.1);
      li{
        padding: 5px 8px;
        i{ cursor: pointer; font-size: 22px;}
        &.number{ min-width: 60px; text-align: center;}
      }
    }
  }
</style>
