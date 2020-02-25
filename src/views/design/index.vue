<template>
  <div class="m-design-main">
    <x-design-header />
    <div class="m-design-flex">
      <x-design-aside />
      <x-design-canvas />
      <x-design-panel />
    </div>
  </div>
</template>

<script>
import { XDesignHeader, XDesignAside, XDesignCanvas, XDesignPanel } from './components'
export default {
  name: 'DesignEdit',
  components: {
    XDesignHeader,
    XDesignAside,
    XDesignCanvas,
    XDesignPanel
  },
  props: {},
  data () {
    return {
      query: this.$route.query
    }
  },
  computed: {},
  watch: {},
  created () {
    if (!this.query.id) {
      this.$store.dispatch('design/resetLayouts')
    }
    this.$store.dispatch('design/setCurrentEditor', null)
    // 页面离开拦截
    // this.onbeforeunload();
  },
  // 页面销毁
  destroyed () {
    // window.onbeforeunload = null;
  },
  methods: {
    // 离开页面提示
    onbeforeunload () {
      window.onbeforeunload = (event) => {
        const e = window.event || event
        e.returnValue = ('确定离开当前页面吗？')
      }
    }
  }
}
</script>

<style lang="less">
  .m-design-main{
    display: flex; height: 100vh; flex-direction: column; font-size: 13px;
    ul,li,dl,dt,dd{ margin: 0; padding: 0; list-style: none;}
    .m-design-flex{
      display: flex; flex: 1; overflow: hidden;
    }
    .el-upload{ display: block;}
  }
  // 字体滑块
  .m-popper-panel-row{
    padding: 0; color: #000;
    ul,li,dl,dt,dd{ margin: 0; padding: 0; list-style: none;}
    dl{
      display: flex; align-items: center; flex: 1;
      dt{ padding: 0 10px; min-width: 5em; text-align: right;}
      dd{ flex: 1;}
    }
    .slider{ padding-right: 10px;}
  }
  // 字体选择
  .m-popper-font-family{
    .el-select-dropdown__item{
      color: #000; padding: 5px 10px;
      span{ display: block; height: 100%; background-size: contain; background-repeat: no-repeat; overflow: hidden; text-indent: -88em;}
    }
  }
</style>
