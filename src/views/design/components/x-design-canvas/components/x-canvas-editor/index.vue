<template>
  <div class="x-canvas-editor element-content">
    <quill-editor
      key="edit"
      :content="params.content"
      :options="editorOption"
      :style="style"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditReady($event)"
      @change="onEditorChange($event)"
      @dblclick.native="onDblclick"
    />
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { mapState } from 'vuex'

export default {
  name: 'XCanvasEditor',
  components: {
    quillEditor
  },
  props: {
    params: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      quill: null,
      isEdit: false
    }
  },
  computed: {
    ...mapState({
      current: state => state['design'].current
    }),
    editorOption () {
      return {
        debug: false,
        placeholder: '',
        modules: {
          toolbar: false
        }
      }
    },
    style () {
      return {
        'font-family': `Roboto, ${this.params.style['font-family']}, sans-serif`,
        'line-height': this.params.style['line-height'],
        'letter-spacing': `${this.params.style['letter-spacing']}px`,
        'opacity': this.params.opacity,
        // 'display': 'inline-block',
        'min-width': '1em'
      }
    }
  },
  watch: {
    'current.id' () {
      // 当前选中的模块是否为当前编辑器
      this.isEdit = this.current && this.current.id === this.params.id
      if (this.isEdit) {
        // 设置当前激活文本编辑器
        this.setCurrentEditor()
      } else {
        // 启用父组件拖动行为
        this.setDraggable(true)
        // 禁用编辑
        this.quill.enable(false)
      }
    }
  },
  created () {
    this.register()
  },
  mounted () {

  },
  methods: {
    // 编辑器注册插件
    register () {
      // 配置字号大小可选值
      const fontSizeStyle = Quill.import('attributors/style/size')
      const whitelist = () => {
        const size = []
        for (let i = 12; i < 800; i++) {
          size.push(`${i}px`)
        }
        return size
      }
      fontSizeStyle.whitelist = whitelist()
      Quill.register(fontSizeStyle, true)
    },
    // 设置当前选中模块
    setCurrent (value) {
      this.current && this.$store.dispatch('design/setCurrent', value)
      this.$store.dispatch('design/setElement', {
        index: this.index,
        value
      })
    },
    // 配置可编辑编辑器
    onEditReady (quill) {
      // console.log('onEditReady');
      this.quill = quill
      this.quill.enable(false)
      // 初始化时的默认字号
      // const length = this.quill.getLength();
      // if (this.params.style['font-size']) {
      //   this.quill.formatText(0, length, 'size', `${this.params.style['font-size']}px`);
      // }
      // 初始化时的默认字体
      // if (this.params.style['font-family']) {
      //   this.quill.formatText(0, length, 'font', this.params.style['font-family']);
      // }

      // 更新编辑器信息
      this.$nextTick(() => {
        this.getEditorInfo()
      })
    },
    // 编辑状态下内容变化时
    onEditorChange (e) {
      this.setCurrent({
        ...this.params,
        content: e.html
      })
      this.$nextTick(() => {
        this.getEditorInfo()
      })
    },
    // 获取焦点
    onEditorFocus () {
      // console.log('onEditorFocus');
    },
    // 失去焦点
    onEditorBlur () {
      // console.log('onEditorBlur');
    },
    // 双击
    onDblclick () {
      // console.log('onDblclick');
      if (this.disabled) return false
      // 启用编辑
      this.quill.enable(true)
      // 全选内容
      this.quill.setSelection(0, this.quill.getLength())
      // 禁用父组件拖动行为
      this.setDraggable(false)
    },
    // 设置当前激活文本编辑器
    setCurrentEditor () {
      this.$store.dispatch('design/setCurrentEditor', this.quill)
    },
    // 设置父组件拖动行为
    setDraggable (status) {
      if (status !== this.params.draggable) {
        if (status) {
          this.quill.setSelection(0, 0)
        }
        this.setCurrent({
          ...this.params,
          draggable: status
        })
      }
    },
    // 更新编辑器信息
    getEditorInfo () {
      if (this.disabled) return false
      const { clientWidth, clientHeight } = this.quill.root
      const current = {
        ...this.params,
        width: clientWidth + 1,
        height: clientHeight + 1
      }
      this.setCurrent(current)
      // console.log(this.quill);
    }
  }
}
</script>

<style lang="less">
  .x-canvas-editor{
    .ql-container{ border: 0; font-size: inherit; font-family: inherit;}
    // 使用全局行间距
    .ql-editor{ line-height: inherit;}
  }
</style>
