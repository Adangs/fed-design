<template>
  <div class="x-aside-template background">
    <div class="title">背景</div>
    <div class="pure">
      <ul>
        <li>
          <div class="item">
            <el-color-picker v-model="color" color-format="hex" popper-class="x-aside-color" @active-change="onActiveChange" />
          </div>
        </li>
        <li v-for="item in pure" :key="item">
          <div class="item" :style="{ background: item }" @click="onActiveChange(item)" />
        </li>
      </ul>
    </div>
    <div class="list">
      <ul>
        <li v-for="item in pic" :key="item.src"><el-image :src="item.src + '?x-oss-process=image/resize,w_176,h_176,m_fill/interlace,1,image/format,webp'" @click="onSetBackPic(item)" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'XAsideBackground',
  components: {},
  props: {},
  data () {
    return {
      color: '#fa5a53',
      pic: [{
        src: 'https://st0.dancf.com/csc/310/materials/0/20190914-165039-699e.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/materials/0/20190914-165330-8204.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190513-213113-bc56.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190513-222925-79e8.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190513-223156-ce0b.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190514-193203-1401.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190513-223453-e943.png',
        color: '#FFF'
      }, {
        src: 'https://st0.dancf.com/csc/310/material-backgrounds/0/20190513-223218-572b.png',
        color: '#FFF'
      }],
      pure: ['#000000', '#737373', '#D9D9D9', '#FFFFFF', '#A82B2A', '#A86F0E', '#528725', '#191F8B', '#49188B', '#E65354', '#FFD935', '#70BC59', '#607BF4']
    }
  },
  computed: {
    ...mapState({
      layouts: state => state['design'].layouts
    }),
    // 背景
    background () {
      return this.layouts.background
    }
  },
  watch: {},
  created () {
    this.color = this.background.color || '#fa5a53'
  },
  methods: {
    onActiveChange (color) {
      this.$store.dispatch('design/setData', {
        'background.color': color,
        'background.image': null
      }).then(() => {
        this.color = color
      })
    },
    // 选择背景图片
    onSetBackPic (item) {
      this.$store.dispatch('design/setData', {
        'background.color': item.color,
        'background.image': item.src
      })
    }
  }
}
</script>

<style lang="less">
  .x-aside-template.background{
    display: flex; flex-direction: column; height: 100%;
    .pure{
      padding-bottom: 20px;
      ul{ display: flex; flex-wrap: wrap;}
      li{
        padding: 2px;
        .item{ width: 40px; height: 40px; border: 1px solid #f1f1f1; border-radius: 3px; overflow: hidden;}
        .el-color-picker__trigger,
        .el-color-picker{ width: 38px; height: 38px;}
        .el-color-picker__trigger{ border: 0; padding: 0;}
        .el-color-picker__color{ border: 0;}
        .el-icon-arrow-down{ display: none;}
        .el-color-picker__color-inner{
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAwCAYAAACsVQxYAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAJrElEQVRo3sVay44kRxU9+arunhmNkZGxbCwhxFfxKSxY8TEg/4kRLLxAAvOSsBkY5uXpmeruemQmi7g348TJG1mzQaQUiqysyqiIE+c+4zafzb+YgTNSG6U/Vfojfa795owOM3oAO2tX1m4APKL2GMAT6r3x9zfWrq3tAAzWdwC6GXkZJ5nqiaZ8DJYyFtMGzkCfhm8AtPbUe9hzbXzN1M8AJptm6iecMdn/epukzTQK5F9bXzSAnu7b4H75A16g7qODtL2fDIyC4lPj+0sAzbaHDtCEGS0mTAUgEUgMDv8DA+DgePPPLYPiZOfFH4gxEVAOCoM6FsAwKC21LUAUmNmmm5c6YkJL8+4roCgwDgrPJGJL6/ugLDkHoOg9g8MtA9MRKH7PwGjf0DIigFhYMmsYkLN8VlFiMHqs2eLAVJnygFK/MHsiXcPMSaJ0RUDUQFEG8d7WmJMBUtacBTp/cwuULvjcsI1gJjgoRwLDgVFdE7BFdIzvaUu9AhUBtgVOXv6IsdAvZ5S6pgaMt4EAWURIWXIkUA7WlC3ahCkkSjsht4MRgdJdACUCJvVJnOYQFGaOj8wK1kHh+5VFOQSgODDcaqAwOBkYZ4gD1BFIvb3VUX8MWOT7zRfbohkjTjjZiMxcZoyDE4FSFaEHawyIf3bQFJSaGGVR2tH0HIxR7pnYJ8Q2w5lUF6kkUFPBWp+PihKLz0BtceSYJdwUGGVKpHRV+Z0LUWJys3FlsfL7qKlpZ3Ayc86YVixmq+R2UUXHbeeiPB2AewPBe2UOi1HNPBMgPiEBxjXaiOxx+DR9hC3jqb6Pg5OBmTHhjHG1YaP9mq3PjloPoB0JlAcAdwbIHYFTY0vNEjkHxPskYCaUOsEh7IEV+X0PjwFAyiAGZzTWjCtRZ+XroAzSCvHZGyAOjjdmjIpRpGzZTBIvDJhyV/N9L29rcOmKOVKRark4VJhwwqlgOAPjQHjQuXNQnBXvCZi9sIatk+oWBUSZQtwwB0/DOtY17Kt6PwhAzpxFRVKLxOpcAHMiYFzpXhMw3UiLf2fAeHPWqH6J2KK+Ai+TzeO0OHjsczAwzKJBoGbx8v09EDguDIuRtaVn5X7EcVmDx/MuRpxeWPTJrQFzK8Co4tVUQ2R5FIw6Y2bp9V6jHI7zr2wWnnU5IKtNFjM357Ox5owDJjzYKA7MDbXmYAB8b+0WwFthCyvdS0qWbcwULHXNGP4GlbdYvFTveMzlHL62mbKmYHASqPe4wz0Bs0NOUA2jMeQNgFfWv7Vne2T9ws6cphICixNygIO2Ehh/Grn0UdRcA4i13dFm7vvPAAGua/Y44cGe3CBn8/AOwEsAL6x/LWxRUNjyRCF8lCHTJVozYPyaP6Ap7yLHkAF6ZDO/Iy5cEzgnvMcr7O3TYwAfAej2AP4N4J/WvzJRcraor8KJJrUbqh38c23JKICZpcf611WIy5honTdmr+wjAE+NF9cGzT3e4A4A8EMAT0cA3wL4C4DvAPzHxMiZwuY4ctJUPCqsKJbI11z4MYh/sXp7DkbTrVCRc5fVnZE7AJ84DACA5/gaAPBjAPgzgN8D+KuxxcWHlSuDUVOil/Y44gEWxnQVMKJr3nhWA0+57KJ2RJKJnwH4iSnfr/H0jwC+BPAnJL2yR04wsc6oMQHYXvzWRb9rPpsfPvS1//n17POf/r+nsFwBY/xqPuB5E3+3pbddBI5IEvUawDcAfgP8Es/wK3wH4NcA/oBkjlyGNLjZ0qLARVnZvGYGptHv1vdbfU1y2JK7Dt4j6Y3nAP4G4LfA8FUa6jm+wKf4OYDfISmbZ8ia1z05t3hsDSPHdGuitcU5MGNT/x6oq47IQGloxVbbA8C9seQFkuX5JpHjE/uLbwF8jC/MVv4AwD8MwddIbq/aaslJVoG61MrF90uQgo3fbrky0UkaW2n38TwAfIvkk/zLUPg7MLxPRhy2/NcAPsXn9uQGyXK9NOZ4oOTeHUeLqqEjoKJdXS+0X/IQHwLGVnTAeQ7Nxbr7/r2t7YWRwKTkMczTtZ+9AfAELR7jR/Z0QHIMnyCLFYPjIbUGSVuHw5G3l5/1S5ASef+ojBc5unq+44kjz5m8M2Be2+Y/T2scTtkXhi3Tl73DDgM+tm865Lj71qD0pIzvQBRW1/IMEe3zwhMwW2IyYw2Gnv65/8ai436ci9AtMealfb5Ly7xB9r89eHhvz3s8QlNkazwx4XUTHEleiia3XOTSVe6XgGtLd2j+Qs90WMG6539PK3Rg3howFu8M0zqsHOn1+4Ujj2jSnsryHJCzqJbXjI4EagzKrccRsf6oHRyw+PApH4dDzpY9yYUD886+O5TJbncafFgH5wpAhxYDblCaTAaIR9IjgksZK44rMkD9EpkCsTIfZSxVsNGhl4uQK10HxlXCYZ3nK7M0ZbI/JUsHtAU4fGbJo93TvZ6dsP8jJ2zChAxMzfSqgtX6Ej7jYRlgYJwlBkpzKk8CPPkJWzZb+gcStavlRONSCcBAk2KQtIQqSgI7MIeASewK1CqUOJvAjGFgXMdw+vEUH71qRpjB8VR7OkGIwPFjOgVnoBEG5BMN7+uWq2QMs0pTKm55zjJjBoWBcS+XDcYxnTvr1PlwN8oFZnECWrTollTJpRoJra5xuB2c2snbmRhTOz7izJie0yhb+KiUU4/kmOrRq0+dD1git+gEPrHq0YRxjxY5dfIvJ+l1kfn0tS/OXFTJarzDjIksEesZ9tbtvXaqn3o7YzhhqgDxUd5QJPEjYJgxrqQZJD+P76VP9z0eSHScScoULc5RYNiERO6EjRMVGDIofrFUR9UauRaP6/1U52gdT1+8mYFxyJlFo+kY1itskiNQ2G/RIh0OevkkbUwVUDUtwDqmPOVe65vy8LdFix7rKj5mUFTqyCUt3OfaoL7q+0RBoZoKLu3S8gupn43q6baO/zUUizyPtOwOTcgcFa/atnCZS2ZNUr4a+6huUS9XlW/trNiYqFNicLTEMXK+a6KUhaSntyPWcGlKrejSR02FUj3TvfB5amXnDIoDpVG/KPSogqZWTcPgRD4m245cINegXUIEBUjrlGuVw96fAmA0OGSTELFGYzUda1yru0i3aIEaUDrjkSfBRXBpyS0adIizbcog3wZljwtoRw6eere1OnxVwJVafExAM8XSrTWgyhbOlEaNy5l8rFQDpsBEgNTYw+1sfkxkntXTVXCi0lDxrtWjqJU0KjhRQUqU1T3LOMk1U3B2G6xR3ZNnV1qlmihFfozqITYZE9DMMRBR4ys6DI6yHw42syYt0fUNjzbIv+hWqKZr8V+ZxZEjhIcYoAAAAABJRU5ErkJggg==) center center !important; background-size: cover;
        }
      }
    }
    .list {
      ul{
        display: flex; flex-wrap: wrap;
        .el-image{ display: block; cursor: pointer;}
        li{ width: 25%; padding: 2px;}
      }
    }
  }
  .x-aside-color{
    .el-color-predefine__color-selector{
      div{ border: 1px solid #f1f1f1;}
    }
    .el-color-dropdown__btns{
      .el-button{ display: none;}
    }
  }
</style>
