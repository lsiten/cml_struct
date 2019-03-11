<template>
  <canvas :ref="name" :style="{width: size.width, height: size.height}"></canvas>
</template>

<script>
import F2 from '@antv/f2'
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
      chart: null
    }
  },
  mounted () {
    this.initchart()
  },
  methods: {
    initchart () {
      this.chart = this.chart ? this.chart : new F2.Chart({
                                                              el: this.$refs[this.name],
                                                              pixelRatio: window.devicePixelRatio // 指定分辨率
                                                            })
      this.chart.source(this.options.data || []);
      let genre = (this.options.genre || 'genre')
      let sold = (this.options.sold || 'sold')
      this.chart.interval().position(genre + '*' + sold).color(genre);
      this.chart.render();
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
