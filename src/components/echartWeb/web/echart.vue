<template>
  <div :ref="name" :style="{width: size.width, height: size.height}"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    name: {
      type: String,
      default: 'lsiten_echart_' + ('' + Math.random()).replace('.', '_')
    },
    size: {
      type: Object,
      default: () => {return {width: '100%', height: '400px'}}
    },
    options: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      echart: null
    }
  },
  mounted () {
    this.initEchart()
  },
  methods: {
    initEchart () {
      this.echart = this.echart ? this.echart : echarts.init(this.$refs[this.name])
      this.echart.clear()
      this.echart.setOption(this.options)
    }
  },
  watch: {
    size () {
      this.initEchart()
    },
    options () {
      this.initEchart()
    }
  }
}
</script>
