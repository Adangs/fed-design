<template>
  <div class="x-panel-editor template">
    <div class="title">文字</div>
    <div class="content">
      <div id="js-panel-toolbar">
        <div class="block">
          <div class="dt">样式</div>
          <div class="dd">
            <!--文字颜色-->
            <div class="panel-row">
              <dl class="color">
                <dt>颜色</dt>
                <dd>
                  <el-color-picker
                    v-model="color"
                    :class="{ more: colorType === 'object' }"
                    :predefine="predefineColors"
                    color-format="hex"
                    popper-class="x-aside-color"
                    class="panel-color-picker"
                    show-alpha
                    @active-change="onChangeColor"
                  />
                </dd>
              </dl>
            </div>
            <!--文字背景色-->
            <div class="panel-row">
              <dl class="color">
                <dt>背景色</dt>
                <dd>
                  <el-color-picker
                    v-model="background"
                    :class="{ more: backgroundType === 'object' }"
                    :predefine="predefineColors"
                    color-format="hex"
                    popper-class="x-aside-color"
                    class="panel-color-picker"
                    show-alpha
                    @active-change="onChangeBackground"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="block">
          <div class="dt">文字</div>
          <div class="dd">
            <!--字体设置-->
            <div class="font-family">
              <el-select v-model="family" :class="familyClass" placeholder="请选择字体" popper-class="m-popper-font-family" @change="onChangeFont">
                <el-option
                  v-for="item in familyList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                  <span :class="item.value + '-svg'">{{ item.name }}</span>
                </el-option>
              </el-select>
            </div>
            <!--大小设置-->
            <div class="panel-row">
              <dl class="font-size">
                <dt>字号</dt>
                <dd>
                  <el-slider v-model="size" :min="12" :max="400" @input="onChangeSize" />
                </dd>
              </dl>
            </div>
            <!--基本设置-->
            <ul class="panel-row">
              <li><el-button icon="iconfont icon-014" :class="{ active: getFormat.bold }" @click="setBold" /></li>
              <li><el-button icon="iconfont icon-015" :class="{ active: getFormat.italic }" @click="setItalic" /></li>
              <li><el-button icon="iconfont icon-016" :class="{ active: getFormat.underline }" @click="setUnderline" /></li>
              <li><el-button icon="iconfont icon-017" :class="{ active: getFormat.strike }" @click="setStrike" /></li>
            </ul>
            <!--间距设置-->
            <ul class="panel-row">
              <li><el-button :icon="getAlign.icon" @click="setAlign" /></li>
              <li>
                <el-popover placement="bottom" trigger="hover" width="240" popper-class="m-popper-panel-row">
                  <dl class="slider">
                    <dt>字间距</dt>
                    <dd>
                      <el-slider v-model="spacing" :max="90" @input="onChangeSpacing" />
                    </dd>
                  </dl>
                  <el-button slot="reference" icon="iconfont icon-022" />
                </el-popover>
              </li>
              <li>
                <el-popover placement="bottom" trigger="hover" width="240" popper-class="m-popper-panel-row">
                  <dl class="slider">
                    <dt>行间距</dt>
                    <dd>
                      <el-slider v-model="line" :step="0.1" :max="5" @input="onChangeLine" />
                    </dd>
                  </dl>
                  <el-button slot="reference" icon="iconfont icon-023" />
                </el-popover>
              </li>
            </ul>
          </div>
        </div>
        <!--共用操作-->
        <x-panel-common />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import XPanelCommon from '../x-panel-common'

export default {
  name: 'XPanelEditor',
  components: {
    XPanelCommon
  },
  props: {},
  data () {
    return {
      size: 15, // 字号
      spacing: null, // 字间距
      line: null, // 行间距
      colorType: null, // 颜色类型
      color: '#000', // 颜色
      backgroundType: null, // 背景色类型
      background: '#FFF', // 背景色
      predefineColors: ['#000000', '#737373', '#D9D9D9', '#FFFFFF', '#A82B2A', '#A86F0E', '#528725', '#191F8B', '#49188B', '#E70B18'],
      family: 'SourceHanSansCN-03', // 字体
      familyList: [{
        name: '思源黑体-极细',
        value: 'SourceHanSansCN-01'
      }, {
        name: '思源黑体-纤细',
        value: 'SourceHanSansCN-02'
      }, {
        name: '思源黑体-常规',
        value: 'SourceHanSansCN-03'
      }, {
        name: '思源黑体-粗体',
        value: 'SourceHanSansCN-04'
      }, {
        name: '思源黑体-中等',
        value: 'SourceHanSansCN-05'
      }, {
        name: '思源黑体-中粗',
        value: 'SourceHanSansCN-06'
      }, {
        name: '思源黑体-特粗',
        value: 'SourceHanSansCN-07'
      }],
      range: null, // 当前选中，index | length
      oldRange: null, // 之前选中，index | length
      align: [{
        name: '',
        icon: 'iconfont icon-018'
      }, {
        name: 'center',
        icon: 'iconfont icon-019'
      }, {
        name: 'right',
        icon: 'iconfont icon-020'
      }, {
        name: 'justify',
        icon: 'iconfont icon-021'
      }]
    }
  },
  computed: {
    ...mapState({
      editor: state => state['design'].currentEditor,
      current: state => state['design'].current,
      currentIndex: state => state['design'].currentIndex
    }),
    // 动态处理 index \ length
    getRange () {
      const range = this.range || {}
      const index = range.index || 0
      const length = range.length === undefined ? (this.editor ? this.editor.getLength() : 0) : range.length
      return {
        index,
        length
      }
    },
    // 获取字体样式
    getFormat () {
      const { index, length } = this.getRange
      return this.editor ? this.editor.getFormat(index, length) : {}
    },
    // 获取当前对齐方式
    getAlign () {
      const { align } = this.editor ? this.editor.getFormat() : {}
      if (align) {
        return this.align.find(item => item.name === align)
      } else {
        return {
          name: '',
          icon: 'iconfont icon-018'
        }
      }
    },
    // 字体样式
    familyClass () {
      if (this.family) {
        return this.family + '-select'
      } else {
        return ''
      }
    }
  },
  watch: {
    editor (val) {
      val && this.initOn()
    }
  },
  created () {

  },
  methods: {
    // 设置当前选中模块
    async setCurrent (value) {
      await this.$store.dispatch('design/setCurrent', value)
      await this.$store.dispatch('design/setElement', {
        index: this.currentIndex,
        value
      })
    },
    // 初始化事件
    initOn () {
      // 解除之前的事件
      this.editor.off('selection-change', this.onSelectionChange)
      // 注册事件
      this.editor.on('selection-change', this.onSelectionChange)
      // 设置初始属性
      this.initAttr()
      // 字间距
      this.spacing = this.current.style['letter-spacing']
      // 行间距
      this.line = this.current.style['line-height']
      // 字体
      this.family = this.current.style['font-family']
    },
    // 初始化属性
    initAttr () {
      // 设置初始属性
      const { color, background, size } = this.getFormat
      // 字体色
      this.color = color || '#000'
      this.colorType = typeof color
      if (this.colorType === 'object') {
        this.color = '#fff'
      }
      // 背景色
      this.background = background || '#fff'
      this.backgroundType = typeof background
      if (this.backgroundType === 'object') {
        this.background = '#fff'
      }
      // 字号
      if (typeof size === 'string') {
        this.size = parseInt(size)
      }

      // console.log('init-attr-> ', this.getFormat);
    },
    // selection-change
    onSelectionChange (range, oldRange, source) {
      // console.log(range, oldRange);
      this.range = range
      this.oldRange = oldRange
      this.initAttr()
    },
    // 设置全局字体样式
    setFormat (format, value) {
      this.editor.format(format, value)
    },
    // 设置选中字体样式
    formatText (format, value) {
      const { index, length } = this.getRange
      const end = (index === length) && length === 0 ? this.editor.getLength() : length
      this.editor.formatText(index, end, format, value)
    },
    // 设置加粗
    setBold () {
      const { bold } = this.getFormat
      this.formatText('bold', !bold)
    },
    // 倾斜
    setItalic () {
      const { italic } = this.getFormat
      this.formatText('italic', !italic)
    },
    // 下划线
    setUnderline () {
      const { underline } = this.getFormat
      this.formatText('underline', !underline)
    },
    // 删除线
    setStrike () {
      const { strike } = this.getFormat
      this.formatText('strike', !strike)
    },
    // 设置对齐
    setAlign () {
      const { name } = this.getAlign
      let index = this.align.findIndex(item => item.name === name) || 0
      index++
      if (index === this.align.length) {
        index = 0
      }
      this.setFormat('align', this.align[index].name)
    },
    // 颜色
    onChangeColor (color) {
      this.color = color
      this.formatText('color', color)
    },
    // 背景色
    onChangeBackground (color) {
      this.background = color
      this.formatText('background', color)
    },
    // 字体
    onChangeFont (value) {
      const current = {
        ...this.current,
        style: {
          ...this.current.style,
          'font-family': value
        }
      }
      this.setCurrent(current)
      this.editor && this.getEditorInfo()
    },
    // 字号
    onChangeSize (value) {
      if (this.editor) {
        const { index, length } = this.getRange
        this.editor.formatText(index, length, 'size', `${value}px`)
      }
    },
    // 字间距
    onChangeSpacing (value) {
      if (this.current) {
        const current = {
          ...this.current,
          style: {
            ...this.current.style,
            'letter-spacing': value
          }
        }
        this.setCurrent(current)
        this.editor && this.getEditorInfo()
      }
    },
    // 行间距
    onChangeLine (value) {
      if (this.current) {
        const current = {
          ...this.current,
          style: {
            ...this.current.style,
            'line-height': value
          }
        }
        this.setCurrent(current)
        this.editor && this.getEditorInfo()
      }
    },
    // 更新编辑器信息
    getEditorInfo () {
      const { clientWidth, clientHeight } = this.editor.root
      const current = {
        ...this.current,
        width: clientWidth + 1,
        height: clientHeight + 1
      }
      this.setCurrent(current)
    }
  }
}
</script>

<style lang="less">
  .x-panel-editor{
    .ql-toolbar{
      border: 0; padding: 0;
    }
    .font-family{
      margin-bottom: 10px;
      .el-select{
        display: block;
        .el-input__inner{ color: #000;}
        &.SourceHanSansCN-01-select .el-input__inner{ font-family: 'SourceHanSansCN-01' !important; }
        &.SourceHanSansCN-02-select .el-input__inner{ font-family: 'SourceHanSansCN-02' !important; }
        &.SourceHanSansCN-03-select .el-input__inner{ font-family: 'SourceHanSansCN-03' !important; }
        &.SourceHanSansCN-04-select .el-input__inner{ font-family: 'SourceHanSansCN-04' !important; }
        &.SourceHanSansCN-05-select .el-input__inner{ font-family: 'SourceHanSansCN-05' !important; }
        &.SourceHanSansCN-06-select .el-input__inner{ font-family: 'SourceHanSansCN-06' !important; }
        &.SourceHanSansCN-07-select .el-input__inner{ font-family: 'SourceHanSansCN-06' !important; }
      }
      .el-input--medium .el-input__inner{
        height: 40px; line-height: 40px;
      }
    }
    .font-size{
      padding: 4px 20px 4px 0;
      .el-slider{
        .el-slider__runway{ margin: 0;}
      }
    }
    .panel-color-picker{
      display: block; padding-right: 10px; height: 22px;
      .el-icon-arrow-down,
      .el-icon-close{ display: none;}
      .el-color-picker__color{ border-color: #f1f1f1; border-radius: 3px; overflow: hidden;}
      .el-color-picker__trigger{ padding: 0; border: 0; width: 100%; height: 22px;}
      &.more{
        position: relative;
        &:after{ position: absolute; content: '多种颜色'; pointer-events: none; left: 0; top: 50%; transform: translate3d(0, -50%, 0); width: 100%; color: #666; text-align: center; font-size: 12px;}
      }
    }
  }

</style>
