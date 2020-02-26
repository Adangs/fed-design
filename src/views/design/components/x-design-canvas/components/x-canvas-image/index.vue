<template>
  <div class="x-canvas-image element-content" :style="style" @dblclick.native="onDblclick" />
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
    return {

    }
  },
  computed: {
    style () {
      return {
        'opacity': this.params.opacity,
        'background-image': `url(${this.params.url})`,
        'background-repeat': 'no-repeat',
        'background-position': 'center center',
        'background-size': 'cover'
      }
    }
  },
  watch: {

  },
  created () {

  },
  methods: {
    onDblclick () {
      if (this.disabled) return false
    }
  }
}
</script>

<style lang="scss">
  .x-canvas-image{
    width: 100%; height: 100%;
  }
</style>
