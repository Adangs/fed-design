<template>
  <div class="x-aside-template template">
    <div class="title">模板类型</div>
    <div class="search">
      <el-input v-model="search" placeholder="请输入关键字或标签">
        <el-button slot="append" icon="el-icon-search" />
      </el-input>
    </div>
    <ul class="list">
      <li v-for="item in list" :key="item.id" @click="onChange(item)">
        <el-image :src="item.pic" />
      </li>
    </ul>
  </div>
</template>

<script>
import Layouts from '~/views/design/json'

export default {
  name: 'XAsideTemplate',
  components: {},
  props: {},
  data () {
    return {
      search: null,
      list: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
  },
  methods: {
    getList () {
      for (const key in Layouts) {
        Layouts[key].forEach(item => {
          // 带有基础数据的添加到列表内
          if (item.layouts) {
            this.list.push(item)
          }
        })
      }
    },
    // 切换模板
    onChange (item) {
      const layouts = item.layouts
      const formData = {
        title: '主标题',
        subtitle: '副标题',
        copywriting: '行动文案'
      }
      layouts.elements.forEach(row => {
        // 文案内容替换
        if (row.type === 'text') {
          const key = ['title', 'subtitle', 'copywriting']
          key.forEach(k => {
            const reg = new RegExp(`\\{\\{${k}\\}\\}`, 'gi')
            row.content = row.content.replace(reg, formData[k])
          })
        }
      })
      this.$store.dispatch('design/setLayouts', layouts)
      // 初始化
      this.$bus.emit('bus-design-created-canvas')
    }
  }
}
</script>

<style lang="less">
  .x-aside-template.template{
    .search{ padding-bottom: 10px;}
    .list{
      li{ padding-bottom: 10px;}
      .el-image{
        position: relative; cursor: pointer;
        &:hover{
          &:after{ position: absolute; content: ''; width: 100%; height: 100%; background: rgba(0,0,0,.3); left: 0; top: 0;}
        }
      }
    }
  }
</style>
