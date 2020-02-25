<template>
  <div class="x-panel-global template">
    <div class="title">全局</div>
    <div class="content">
      <div class="block">
        <div class="dt">画布尺寸</div>
        <div class="dd">
          <el-input v-model="width" placeholder="输入宽度" @change="onChangeWidth">
            <template slot="append">宽</template>
          </el-input>
          <div class="lock">
            <i class="iconfont" :class="lockIcon" @click="onChangeLock" />
          </div>
          <el-input v-model="height" placeholder="输入高度" @change="onChangeHeight">
            <template slot="append">高</template>
          </el-input>
        </div>
        <div class="submit">
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'XPanelGlobal',
  components: {},
  props: {},
  data () {
    return {
      lock: false,
      width: 0,
      height: 0
    }
  },
  computed: {
    ...mapState({
      layouts: state => state['design'].layouts
    }),
    lockIcon () {
      return this.lock ? 'icon-009' : 'icon-010'
    }
  },
  watch: {
    'layouts.width': {
      handler (val) {
        this.width = val
      },
      immediate: true
    },
    'layouts.height': {
      handler (val) {
        this.height = val
      },
      immediate: true
    }
  },
  created () {

  },
  methods: {
    // 锁定状态
    onChangeLock () {
      this.lock = !this.lock
    },
    // 调整宽
    onChangeWidth (val) {
      if (!/^[1-9]([0-9])*$/gi.test(val)) {
        this.$message.warning('宽度仅支持输入正整数')
        this.width = this.layouts.width
      } else if (Number(val) < 20) {
        this.$message.warning('宽度最小为20')
        this.width = 20
      } else if (this.lock) {
        // 等比
        this.height = Math.ceil(this.layouts.height * (Number(val) / this.layouts.width))
      }
    },
    // 调整高
    onChangeHeight (val) {
      if (!/^[1-9]([0-9])*$/gi.test(val)) {
        this.$message.warning('高度仅支持输入正整数')
        this.height = this.layouts.height
      } else if (Number(val) < 20) {
        this.$message.warning('高度最小为20')
        this.height = 20
      } else if (this.lock) {
        // 等比
        this.width = Math.ceil(this.layouts.width * (Number(val) / this.layouts.height))
      }
    },
    // 确定调整画布
    onSubmit () {
      if (this.width < 20 || this.height < 20) {
        return this.$message.warning('宽高度最小为20')
      }
      this.$store.dispatch('design/setData', {
        width: +this.width,
        height: +this.height
      })
    }
  }
}
</script>

<style lang="less">
  .x-panel-global{
    .el-input-group__append{ padding: 0 10px;}
    .lock{
      display: flex; align-items: center; padding: 0 5px;
      .iconfont{ font-size: 22px; cursor: pointer;}
    }
    .dd{ display: flex;}
  }
</style>
