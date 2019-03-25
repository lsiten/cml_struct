export default {
  /*
* 折线/柱状图配置项：
* type：必须不能为poplar
* padding：[]图表绘图区域和画布边框的间距（上右下左）
* chartOptions:配置项
* chartOptions.legendItems：图例配置项（柱状图和线图），同 antv f2图例配置
* chartOptions.translation：平移配置项，false为不平移
* chartOptions.optionArr:各数据的配置项,全部必填。其中，name：参数显示名称，x_data为x轴显示内容的参数名，y_data为y轴显示内容的参数名，type为显示图表类型（bar，line），color：报表颜色
* */
  barLine: {
    type: '',
    padding: ['auto'],
    chartOptions: {
      legendItems: [
        {
          name: '金额',
          marker: 'square',
          fill: '#FACC14',
          checked: true
        },
        {
          name: '同比',
          marker: function marker(x, y, r, ctx) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = ctx.fillStyle;
            ctx.moveTo(x - r - 3, y);
            ctx.lineTo(x + r + 3, y);
            ctx.stroke();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.fill();
          },
          fill: '#000',
          checked: true
        }
      ],
      translation: {
        minIndex: 0,
        maxIndex: 5
      },
      x_Config: {
        type: 'cat',
      },
      optionArr: [
        // {
        //   name: '金额',
        //   x_data: 'x_data',
        //   y_data: 'y_data',
        //   type: 'bar',
        //   color: '#66D6D5',
        // },
        {
          name: '同比',
          x_data: 'x_data',
          y_data: 'y_data_1',
          type: 'line',
          color: '#AC90DD',
        }
      ]
    }
  },
  /*
  * 环图配置项：
  * type：必填，图表类型为polar
  * padding：[]图表绘图区域和画布边框的间距（上右下左）
  * showInner:是否在内圆显示内容false为不显示
  * innerHtml：内圆区的html代码
  * guidePosition：内圆内容显示位置配置
  * unit：内圆单位
  * colorArr：饼图颜色配置
  * pieLabel：饼图label配置，false为不显示
  * legendConfig：图例配置，false为不显示
  * coord：饼图坐标系配置
  * strKey:一个常量名
  * */
  polar: {
    type: 'polar',
    padding: ['auto', 'auto', 50, 'auto'],
    showInner: false,
    innerHtml: false,
    unit: '亿元',
    nameKey: 'x_data',
    valueKey: 'y_data',
    colorArr: ['#FF9990', '#FFD893', '#66D6D5', '#7DC5FF', '#AC90DD', '#70AD47', '#81c784', '#ffe0b2', '#f48fb1', '#42a5f5'],
    guidePosition: ['50%', '48%'],
    pieLabel: {
      anchorOffset: -10,
      label1: function label1(data, color) {
        return {text: data.nameKey, fill: color}
      },
      label2: function label1(data, color) {
        console.log(data)
        return {text: '值：' + data.valueKey, fill: color}
        // {text: itemPercent(data.y_data, total), fill: color}
      }
    },
    legendConfig: {
      position: 'bottom',
      align: 'center',
      triggerOn: 'click'
    },
    coord: {
      transposed: true,
      innerRadius: 0.6,
      radius: 0.7
    }
  },
  urlData0: {
    url: '',
    callback(res) {
    
    }
  }
  
  
}