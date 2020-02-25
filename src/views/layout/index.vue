<template>
  <section class="g-layout-all">
    <section class="g-layout-header">
      全局头部
    </section>
    <section class="g-layout-content">
      <section class="g-layout-aside">
        左侧菜单
      </section>
      <section class="g-layout-main">
        <!-- 主要内容 -->
        <transition name="fade" mode="out-in">
          <router-view :key="key" />
        </transition>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  name: 'Layout',
  components: {

  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
