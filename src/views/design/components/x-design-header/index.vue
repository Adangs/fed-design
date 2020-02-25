<template>
  <div class="m-design-header">
    <div class="title">图片编辑</div>
    <div class="tools" />
    <div class="save">
      <el-button size="mini" @click="onConsole">
        debug
      </el-button>
      <el-button size="mini" @click="onPreview">
        预览
      </el-button>
      <el-divider direction="vertical" />
      <template v-if="isEdit">
        <el-button size="mini" @click="onReset">重置</el-button>
        <el-divider direction="vertical" />
        <el-button size="mini" @click="onCancel">取消并返回</el-button>
        <el-divider direction="vertical" />
        <el-button type="primary" size="mini" plain @click="onSaveBack">保存并返回</el-button>
        <el-divider direction="vertical" />
      </template>
      <el-dropdown trigger="click" @command="onDownload">
        <el-button type="primary" size="mini" @click="onDeselect">
          下载<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown" class="m-design-download-menu">
          <el-dropdown-item v-for="item in menu" :key="item.value" :command="item" :disabled="disabled">
            <dl>
              <dt>{{ item.name }}</dt>
              <dd>{{ getSizeInfo(item) }}</dd>
            </dl>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog v-if="visible" :visible.sync="visible" :modal="false">
      <el-image :src="src" fit="contain" />
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'XDesignHeader',
  components: {},
  props: {},
  data () {
    return {
      query: this.$route.query,
      visible: false,
      src: null,
      disabled: false,
      menu: [{
        name: 'Web @1x',
        value: 1
      }, {
        name: 'Web @2x',
        value: 2
      }, {
        name: 'Web @3x',
        value: 3
      }]
    }
  },
  computed: {
    ...mapState({
      current: state => state['design'].current,
      layouts: state => state['design'].layouts,
      batchPreview: state => state['design'].batchPreview
    }),
    scale () {
      return this.layouts.scale
    },
    isEdit () {
      return !!this.query.id
    }
  },
  watch: {},
  created () {

  },
  methods: {
    onDownload (row) {
      this.disabled = true
      html2canvas(document.querySelector('.js-design-canvas'), {
        scale: row.value * (1 / this.scale),
        useCORS: true
      }).then((canvas) => {
        const base64 = canvas.toDataURL().split(';base64,')[1]

        const zip = new JSZip()
        // 文件夹名称
        const name = this.$options.filters.formatDate(new Date(), 'yyyy-MM-dd hh-mm-ss')
        const img = zip.folder(name)
        img.file(`${uuidv4()}.png`, base64, { base64: true })
        zip.generateAsync({ type: 'blob' }).then((content) => {
          // see FileSaver.js
          saveAs(content, `${name}.zip`)
          this.disabled = false
        })
      })
    },
    // 停用之前选中的图层
    onDeselect () {
      if (this.current) {
        // 停用之前选中的图层
        this.$bus.emit('bus-design-element-event', {
          id: this.current.id,
          callback: (ref) => {
            ref.deselect()
          }
        })
      }
    },
    // 下载尺寸
    getSizeInfo (row) {
      return `${this.layouts.width * row.value}px x ${this.layouts.height * row.value}px`
    },
    // 重置
    async onReset () {
      const find = JSON.parse(JSON.stringify(this.batchPreview.find(item => item.id === this.query.id)))
      await this.$store.dispatch('design/setLayouts', find.layouts)
      // 初始化
      this.$bus.emit('bus-design-created-canvas')
    },
    // 取消并返回
    onCancel () {
      this.$router.push({
        path: '/design/template',
        query: {
          steps: 1
        }
      })
    },
    // 保存并返回
    async onSaveBack () {
      const list = this.batchPreview.map(item => {
        if (item.id === this.query.id) {
          return {
            ...item,
            layouts: this.layouts
          }
        } else {
          return item
        }
      })
      await this.$store.dispatch('design/setBatchPreview', JSON.parse(JSON.stringify(list)))
      this.$router.push({
        path: '/design/template',
        query: {
          steps: 1
        }
      })
    },
    // 输出代码
    onConsole () {
      console.log(JSON.parse(JSON.stringify(this.layouts)))
    },
    // 预览
    onPreview () {
      html2canvas(document.querySelector('.js-design-canvas'), {
        scale: 1 / this.scale,
        useCORS: true
      }).then((canvas) => {
        this.src = canvas.toDataURL()
        this.visible = true
      })
    }
  }
}
</script>

<style lang="less">
.m-design-header{
  background: #fff; height: 40px; border-top: 1px solid #f1f1f1; border-bottom: 1px solid #f1f1f1; padding: 0 20px; display: flex; align-items: center; position: relative; z-index: 90;
  .title{ font-weight: bold; color: #000;}
  .tools{ flex: 1;}
}
.m-design-download-menu{
  .el-dropdown-menu__item{ padding: 0 10px;}
  dl,dt,dd{ padding: 0; margin: 0;}
  dl{ display: flex;}
  dt{ flex: 1;}
  dd{ font-size: 12px; color: #999; text-align: right; min-width: 110px;}
}
</style>
