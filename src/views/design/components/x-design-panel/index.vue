<template>
  <div class="m-design-panel">
    <!--全局配置-->
    <x-panel-global v-if="!current" />
    <!--背景内容-->
    <x-aside-background v-if="current && current.type === 'background'" />
    <!--字体-->
    <x-panel-editor v-show="current && current.type === 'text'" />
    <!--图片-->
    <x-panel-image v-show="current && current.type === 'image'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XPanelGlobal from './components/x-panel-global'
import XPanelEditor from './components/x-panel-editor'
import XPanelImage from './components/x-panel-image'
import XAsideBackground from '../x-design-aside/components/x-aside-background'

export default {
  name: 'XDesignPanel',
  components: {
    XAsideBackground,
    XPanelGlobal,
    XPanelEditor,
    XPanelImage
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      current: state => state['design'].current
    })
  },
  watch: {},
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less">
.m-design-panel{
  width: 260px; background: #fff; position: relative; z-index: 90; box-shadow: -3px 0 4px rgba(0,0,0,.1);
  .template{ display: flex; flex-direction: column; height: 100%;}
  .title{ font-weight: bold; padding: 10px; line-height: 1; border-bottom: 1px solid #f1f1f1; font-size: 13px;}
  .content{
    flex: 1; padding: 10px; overflow: auto;
    .block{
      padding-bottom: 20px;
      .dt{ color: #999; padding-bottom: 10px;}
      .submit{
        padding-top: 10px;
        .el-button{ width: 100%;}
      }
      dl{
        display: flex; align-items: center; flex: 1;
        dt{ padding: 0 10px; min-width: 5em; text-align: right;}
        dd{ flex: 1;}
      }
    }
    .panel-row{
      display: flex; border: 1px solid #ddd; padding: 8px 0; border-radius: 3px; margin-bottom: 10px;
      &:last-child{ margin-bottom: 0;}
      .el-button{
        border: 0; padding: 0; background: transparent; height: 22px; overflow: hidden; color: #000;
        &.active{ color: #e23738;}
        &.is-disabled{ color: #C0C4CC;}
      }
      li{
        flex: 1; text-align: center; border-right: 1px solid #ddd;

        &:last-child{ border-right: 0;}
      }
    }
  }
  // 背景
  .x-aside-template.background{
    .pure li{
      .item{ width: 36px; height: 36px;}
      .el-color-picker__trigger,
      .el-color-picker{ width: 34px; height: 34px;}
    }
  }
}
</style>
