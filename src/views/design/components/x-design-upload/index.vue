<template>
  <el-upload
    class="f-ad-upload"
    :action="params.action || action"
    :accept="params.accept || '.jpg,.png'"
    :headers="headers"
    :data="params.data"
    :disabled="disabled"
    :show-file-list="false"
    :with-credentials="true"
    :before-upload="beforeUpload"
    :on-success="onSuccess"
    :on-remove="onRemove"
    :on-error="onError"
    :on-progress="onProgress"
  >
    <slot />
  </el-upload>
</template>

<script>
export default {
  name: 'FDesignUpload',
  components: {},
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      action: `${process.env.VUE_APP_BASE_API}/upload/uploadImg`,
      disabled: false,
      fileInfo: null,
      isImage: null // 文件是否为图片类型
    }
  },
  computed: {
    headers () {
      return {
        token: 'token'
      }
    }
  },
  watch: {},
  created () {

  },
  methods: {
    // 上传文件之前的钩子
    async beforeUpload (file) {
      // 确定文件类型，true 为图片，false 为视频；因为限制了文件选择后缀，所以简单校验一下即可
      const is = file.type.indexOf('image') !== -1
      await this.validateImage(file)
      if (is) {
        // 开始上传
        this.disabled = true
        this.$emit('before-upload')
      }
      return is
    },
    // 文件上传成功时的钩子
    onSuccess (res) {
      // 此处可能需要根据 response 的值，校验接口是否成功
      this.disabled = false
      if (res.success) {
        let data = res.data
        if (Object.prototype.toString.call(data) === '[object Array]') {
          data = data[0]
        }
        this.$emit('on-success', data.replace('https://cdn.', 'https://alicdn.'), this.fileInfo)
        // console.log(res)
      } else {
        // 处理异常
        const message = res.msg || '抱歉，请求出错'
        this.$message({
          message,
          type: 'error',
          duration: 5 * 1000
        })
        this.onError(...arguments)
      }
    },
    // 文件列表移除文件时的钩子
    onRemove () {
      this.$emit('on-remove', ...arguments)
    },
    // 文件上传失败时的钩子
    onError () {
      this.$emit('on-error', ...arguments)
    },
    // 文件上传时的钩子
    onProgress (event) {
      console.log('上传进度--> ', event)
      this.$emit('on-progress', ...arguments)
    },
    // 校验图片
    validateImage (file) {
      return new Promise((resolve, reject) => {
        // 尺寸验证
        const URL = window.URL || window.webkitURL
        const src = URL.createObjectURL(file)
        const img = new Image()
        img.src = src
        img.onload = () => {
          this.fileInfo = {
            file,
            width: img.width,
            height: img.height,
            type: file.type,
            size: file.size
          }
          return resolve()
        }
      })
    }
  }
}
</script>

<style>

</style>
