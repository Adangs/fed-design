<template>
  <ul class="m-login">
    <li><el-input type="text" name="name" placeholder="用户名" v-model="formData.name" /></li>
    <li><el-input type="password" name="password" placeholder="密码" v-model="formData.password" /></li>
    <li><el-button @click="onLogin">登录</el-button></li>
  </ul>
</template>

<script>
export default {
  name: 'index',
  components: {},
  props: {},
  data () {
    return {
      formData: {
        name: null,
        password: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {

  },
  methods: {
    onLogin () {
      this.$store.dispatch('user/login').then(res => {
        this.$router.push({ path: '/demo' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .m-login{
    width: 300px; margin: 0 auto; padding-top: 20%;
    li{ margin-bottom: 10px;}
    button{
      width: 100%;
    }
  }
</style>
