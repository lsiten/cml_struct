<template>
  <canvas :ref="name" :style="{width: size.width, height: size.height}"></canvas>
</template>

<script>
  import getData from '../../../units/echart-f2/chartData.js'
  import F2 from '@antv/f2/lib/index-all'
  import {sumAll, itemPercent, chartDataFormat} from '../../../units/common'
  import Legend from '@antv/f2/lib/plugin/legend'
  import ScrollBar from '@antv/f2/lib/plugin/scroll-bar'
  // import Gesture from '@antv/f2/lib/plugin/gesture'
  import _ from 'lodash'

  F2.Chart.plugins.register(Legend);
  F2.Chart.plugins.register(ScrollBar);
  // F2.Chart.plugins.register(Gesture);
  export default {
    props: {
      name: {
        type: String,
        default: 'lsiten_echart_' + ('' + Math.random()).replace('.', '_')
      },
      size: {
        type: Object,
        default: () => {
          return {width: '100%', height: '400px'}
        }
      },
      options: {
        type: String,
        default: 'param1'
      }
    },
    data() {
      return {
        chart: null,
        chartTypeRends: {
          bar: this.renderBarByType,
          line: this.renderLineByType
        },
        markerTypsMap: {
          bar: 'square',
          line: 'circle'
        }
      }
    },
    mounted() {
      this.polarChart()
    },
    methods: {
      /*柱状图或折线图*/
      async barLineChart() {
        try {
          let options = await getData(this.options)

          this.chart = this.chart ? this.chart : new F2.Chart({
            el: this.$refs[this.name],
            pixelRatio: window.devicePixelRatio // 指定分辨率
          })
          let entity = options.options
          let x_data = 'x_key'
          let x_key_arr = []
          options.data.map(item => {
            x_key_arr.push(item[x_data])
          })
          if (entity.x_Config.type === 'linear') {
            options.dataSoureCfg[x_data].min = x_key_arr[entity.translation.minIndex]
            options.dataSoureCfg[x_data].max = x_key_arr[entity.translation.maxIndex]
          } else {
            options.dataSoureCfg[x_data].values = x_key_arr.slice(entity.translation.minIndex, entity.translation.maxIndex)
          }
          this.chart.source(options.data || [], options.dataSoureCfg)

          let y_data = ''
          let lengendItems = []
          if (entity.optionArr) {
            entity.optionArr.map(item => {
              this.chartTypeRends[item.type || 'bar'](x_data, item.y_data, item.color)
              lengendItems.push({
                name: item.name,
                marker: {
                  symbol: this.markerTypsMap[item.type],
                  fill: item.color,
                  radius: 4
                }
              })
            })
            this.translation(x_data, options.data, entity || false)
            this.generateLengend(entity.lengendName || 'name', lengendItems, entity.lengendStyle || {}, entity.lengendcallback || false)
            this.generateTooltip(entity.tooltipcallback || false)
          } else {
            if (entity.optionObj) {
              this.chartTypeRends[entity.optionObj.type || 'bar'](x_data, entity.optionObj.y_data, entity.optionObj.color)
              this.generateTooltip(entity.tooltipcallback || false)
            } else {
              this.chartTypeRends.bar(x_data, y_data, false, false, false)
            }
          }
          this.chart.interaction('pan')
          this.chart.render()
          
        } catch (err) {
          console.log(err)
        }

      },

      /*环图 */
      async polarChart() {
        try {
          let options = await getData(this.options)
          let optionsConfig = options.options
          this.chart = new F2.Chart({
            el: this.$refs[this.name],
            pixelRatio: window.devicePixelRatio, // 指定分辨率
            padding: optionsConfig.padding || ['auto']
          })
          this.chart.source(options.data || [])
          let x_data = 'nameKey'
          let y_data = 'valueKey'
          let str_key = 'strKey'
          let total = sumAll(options.data, 'y_data')
          this.chart.coord('polar', _.assign({}, {
            transposed: true,
            innerRadius: 0.6,
            radius: 0.7
          }, (optionsConfig.coord || {})));
          this.chart.legend(_.assign({}, {
            position: 'bottom',
            align: 'center',
            triggerOn: 'click'
          }, (optionsConfig.legendConfig || {})));
          this.chart.axis(false)
          this.chart.tooltip(false)
          this.chart.interval().position(str_key + '*' + y_data).color(x_data, optionsConfig.colorArr ? optionsConfig.colorArr : ['#FF9990', '#FFD893', '#66D6D5', '#7DC5FF', '#AC90DD', '#70AD47', '#81c784', '#ffe0b2', '#f48fb1', '#42a5f5']).adjust('stack')
          this.chart.pieLabel(optionsConfig.pieLabel ? optionsConfig.pieLabel : false)
          optionsConfig.showInner ? this.showInner(optionsConfig, total) : {}
          this.chart.render()
        } catch (err) {
          console.log(err)
        }
      },
      showInner(options, total) {
        this.chart.guide().html({
          position: options.guidePosition || ['50%', '48%'],
          html: options.innerHtml ? options.innerHtml : '<div style="width: 250px;height: 40px;text-align: center;">' + '<div style="font-size: 1em">总资产<span style="font-size:0.8em">(' + options.unit + ')</span></div>' + '<div style="font-size: 1.8em;color:#6f77c9">' + total + '</div>' + '</div>'
        })
      },
      // 平移
      translation(x_data, data, entity) {
        if (entity.translation) {
          this.chart.interaction('pan', {
            limitRange: {
              [x_data]: {
                min: data[entity.translation.minIndex][x_data],
                max: data[entity.translation.maxIndex][x_data]
              }
            },
            step: 5,
          });
          // 定义进度条
          this.chart.scrollBar(entity.translation.scrollBar || {
            mode: 'x',
            xStyle: {
              backgroundColor: '#e8e8e8',
              offsetY: -5
            }
          });
        }
      },
      // 渲染图标，柱状图
      renderBarByType(x_data, y_data, color) {

        this.chart.interval().position(x_data + '*' + y_data).color([color])
      },
      // 渲染图标，折线图
      renderLineByType(x_data, y_data, color) {
        this.chart.line({connectNulls: true}).position(x_data + '*' + y_data).color([color]).shape('smooth')
      },
      generateLengend(name, lengendItems, lengendStyle, lengendcallback) {
        if (lengendcallback && typeof lengendcallback === 'function') {
          lengendcallback()
        } else {
          let lengendStyleFinish = _.assign({
            custom: true,
            items: lengendItems,
          }, lengendStyle)
          this.chart.legend(lengendStyleFinish)
        }
      },
      generateTooltip(tooltipcallback) {
        if (tooltipcallback && typeof tooltipcallback === 'function') {
          tooltipcallback()
        } else {
          let chart = this.chart
          this.chart.tooltip({
            showCrosshairs: true,
            custom: true, // 自定义 tooltip 内容框
            onChange: function onChange(obj) {
              let legend = chart.get('legendController').legends.top[0]
              let tooltipItems = obj.items
              let legendItems = legend.items
              let map = {}
              legendItems.map(function (item) {
                map[item.name] = _.clone(item)
              })
              tooltipItems.map(function (item) {
                let name = item.name
                let value = item.value + (item.origin.lsitenSubs || '')
                if (map[name]) {
                  map[name].value = value
                }
              });
              legend.setItems(_.values(map))
            },
            onHide: function onHide() {
              var legend = chart.get('legendController').legends.top[0]
              legend.setItems(chart.getLegendItems().country)
            }
          });
        }
      },
      findLegendItem(name, legendItems) {
        var index = void 0;
        for (var i = 0; i < legendItems.length; i++) {
          if (legendItems[i].name === name) {
            index = i;
            break;
          }
          return index;
        }
      }
    },
    watch: {
      size() {
        this.initEchart()
      },
      options() {
        this.initEchart()
      }
    }
  }
</script>
