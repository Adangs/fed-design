<template>
  <div class="x-panel-common">
    <div class="block">
      <div class="dt">共用</div>
      <div class="dd">
        <!--透明度-->
        <div class="panel-row">
          <dl class="opacity">
            <dt>不透明</dt>
            <dd>
              <el-slider v-model="opacity" @input="onChangeOpacity" />
            </dd>
          </dl>
        </div>
        <!--图层操作-->
        <ul class="panel-row">
          <li>
            <el-tooltip placement="top" :content="lockInfo.content">
              <el-button :icon="lockInfo.icon" @click="onLock" />
            </el-tooltip>
          </li>
          <li>
            <el-tooltip placement="top" content="图层顺序">
              <el-button icon="iconfont icon-011" :disabled="lock" />
            </el-tooltip>
          </li>
          <li>
            <el-tooltip placement="top" content="复制">
              <el-button icon="iconfont icon-012" :disabled="lock" @click="onCopy" />
            </el-tooltip>
          </li>
          <li>
            <el-tooltip placement="top" content="删除">
              <el-button icon="iconfont icon-013" :disabled="lock" @click="onDelete" />
            </el-tooltip>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'XPanelCommon',
  components: {},
  props: {},
  data () {
    return {
      opacity: 100
    }
  },
  computed: {
    ...mapState({
      current: state => state['design'].current,
      currentIndex: state => state['design'].currentIndex
    }),
    lock () {
      return this.current ? this.current.lock : false
    },
    lockInfo () {
      return this.current ? this.current.lock ? {
        icon: 'iconfont icon-009',
        content: '解锁图层'
      } : {
        icon: 'iconfont icon-010',
        content: '锁定图层'
      } : {}
    }
  },
  watch: {},
  created () {
    this.opacity = this.current ? this.current.opacity * 100 : 100
  },
  methods: {
    // 设置当前选中模块
    setCurrent (value) {
      this.$store.dispatch('design/setCurrent', value)
      this.$store.dispatch('design/setElement', {
        index: this.currentIndex,
        value
      })
    },
    // 锁定、解锁
    onLock () {
      const { lock } = this.current
      const current = {
        ...this.current,
        lock: !lock
      }
      this.setCurrent(current)
    },
    // 透明度
    onChangeOpacity (value) {
      if (this.current) {
        const current = {
          ...this.current,
          opacity: value / 100
        }
        console.log(this.current.id)
        this.setCurrent(current)
      }
    },
    // 复制图层
    async onCopy () {
      const current = this.current
      const layer = {
        ...current,
        x: current.x + 20,
        y: current.y + 20,
        id: uuidv4()
      }
      const { length } = await this.$store.dispatch('design/setElement', {
        type: 'push',
        value: layer
      })
      // 与其它组件进行通信
      // 停用之前选中的图层
      this.$bus.emit('bus-design-element-event', {
        id: current.id,
        callback: (ref) => {
          ref.deselect()
        }
      })
      // 激活新增的图层
      this.$bus.emit('bus-design-element-event', {
        id: layer.id,
        callback: (ref) => {
          ref.setActive()
        }
      })
      // 新增的图层设置为当前
      // console.log(current.id);
      await this.$store.dispatch('design/setCurrent', layer)
      await this.$store.dispatch('design/setCurrentIndex', length - 1)
    },
    // 删除图层
    onDelete () {
      this.$store.dispatch('design/setElement', {
        type: 'delete',
        index: this.currentIndex
      })
      this.$store.dispatch('design/setCurrent', null)
      this.$store.dispatch('design/setCurrentIndex', null)
    }
  }
}
</script>

<style lang="less">
  .x-panel-common{
    .panel-row{
      .iconfont{ font-size: 22px; font-weight: bold;}
      .icon-009{ color: #e23738;}
      .opacity{
        padding: 4px 20px 4px 0;
        .el-slider{
          .el-slider__runway{ margin: 0;}
        }
      }
    }
  }
</style>
