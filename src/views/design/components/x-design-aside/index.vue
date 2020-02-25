<template>
  <div class="m-design-aside">
    <ul class="piece">
      <li v-for="item in piece" :key="item.name" @click="onChange(item)">
        <div class="item" :class="{active: current.name === item.name}">
          <i class="iconfont" :class="item.icon" />
          <em>{{ item.name }}</em>
        </div>
      </li>
    </ul>
    <div v-if="current.name" class="content">
      <!--模板内容-->
      <x-aside-template v-if="current.value === 'template'" />
      <!--文字内容-->
      <x-aside-font v-else-if="current.value === 'font'" />
      <!--图片内容-->
      <x-aside-image v-else-if="current.value === 'image'" />
      <!--元素内容-->
      <x-aside-element v-else-if="current.value === 'element'" />
      <!--背景内容-->
      <x-aside-background v-else-if="current.value === 'background'" />
      <!--收起-->
      <div class="close" @click="onClose">
        <i class="el-icon-arrow-left" />
      </div>
    </div>
  </div>
</template>

<script>
import XAsideTemplate from './components/x-aside-template'
import XAsideBackground from './components/x-aside-background'
import XAsideFont from './components/x-aside-font'
import XAsideElement from './components/x-aside-element'
import XAsideImage from './components/x-aside-image'

export default {
  name: 'XDesignAside',
  components: {
    XAsideTemplate,
    XAsideFont,
    XAsideBackground,
    XAsideElement,
    XAsideImage
  },
  props: {},
  data () {
    return {
      current: {},
      piece: [{
        icon: 'icon-001',
        name: '模板',
        value: 'template'
      }, {
        icon: 'icon-002',
        name: '字体',
        value: 'font'
      }, {
        icon: 'icon-003',
        name: '图片',
        value: 'image'
      }, {
        icon: 'icon-004',
        name: '元素',
        value: 'element'
      }, {
        icon: 'icon-005',
        name: '背景',
        value: 'background'
      }]
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    onChange (row) {
      this.current = row
    },
    onClose () {
      this.current = {}
    }
  }
}
</script>

<style lang="less">
.m-design-aside{
  background: #fff; width: 65px; position: relative; z-index: 90; box-shadow: 3px 0 4px rgba(0,0,0,.1);
  .piece{
    .item{
      text-align: center; padding: 10px 0; cursor: pointer; margin-bottom: 1px;
      &.active{ color: #e23738; background: #fafafa;}
      &:hover{ background: #fafafa;}
      i,em{ display: block; font-style: normal;}
      em{ font-size: 12px; padding-top: 6px;}
    }
  }
  .content{
    position: absolute; padding: 0 10px; left: 65px; top: 0; background: #fff; height: 100%; width: 330px; box-shadow: 3px 3px 10px rgba(0,0,0,.1); z-index: 50;
    .m-expect{
      height: 100%; display: flex; align-items: center; text-align: center; color: #999;
      span{ flex: 1;}
    }
    .x-aside-template{ display: flex; flex-direction: column; height: 100%;}
    .title{ font-weight: bold; padding: 10px 0; line-height: 1;}
    .list{ overflow: auto; flex: 1;}
    .close{ position: absolute; width: 16px; border-radius: 0 5px 5px 0; display: flex; align-items: center; text-align: center; background: #fff; height: 60px; left: 100%; top: 50%; transform: translate3d(0,-50%,0); box-shadow: 3px 3px 10px rgba(0,0,0,.1); cursor: pointer;}
  }
}
</style>
