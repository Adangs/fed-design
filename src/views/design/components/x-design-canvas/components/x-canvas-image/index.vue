<template>
  <div class="x-canvas-image element-content">
    <el-image
      :src="params.url"
      :style="{ opacity: params.opacity }"
      fit="contain"
      @dblclick.native="onDblclick"
    />
  </div>
</template>

<script>
export default {
  name: 'XCanvasImage',
  components: {},
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    onDblclick () {
      if (this.disabled) return false
    }
  }
}
</script>

<style lang="less">
  .x-canvas-image{
    width: 100%; height: 100%;
  }
</style>
