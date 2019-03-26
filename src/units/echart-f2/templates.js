export default {
  /*单独柱状图*/
  bar: {
    url: '',
    type: 'bar',
    padding: ['auto'],
    chartOptions: {
      legendItems: [
        {
          name: '金额',
          marker: 'square',
          fill: '#FACC14',
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
        {
          name: '金额',
          x_data: 'x_data',
          y_data: 'y_data',
          type: 'bar',
          color: '#66D6D5',
        }
      ]
    },
    callback: false
  },
  /*单独线图*/
  line: {
    url: '',
    type: 'line',
    padding: ['auto'],
    chartOptions: {
      legendItems: [
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
        {
          name: '同比',
          x_data: 'x_data',
          y_data: 'y_data_1',
          type: 'line',
          color: '#AC90DD',
        }
      ]
    },
    callback: false
  },
  /*单独点图*/
  point: {
    url: '',
    type: 'points',
    padding: ['auto'],
    chartOptions: {
      legendItems: [
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
        {
          name: '同比',
          x_data: 'x_data',
          y_data: 'y_data_1',
          type: 'point',
          color: '#AC90DD',
        }
      ]
    },
    callback: false
  },
  /*单独点加线图*/
  pointLine: {
    url: '',
    type: 'pointLine',
    padding: ['auto'],
    chartOptions: {
      legendItems: [
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
        {
          name: '同比',
          x_data: 'x_data',
          y_data: 'y_data_1',
          type: 'pointLine',
          color: '#AC90DD',
        }
      ]
    },
    callback: false
  },
  /*单独饼图：图例在右侧,不显示饼图文字*/
  polarRight: {
    url: '',
    type: 'polar',
    padding: ['auto'],
    showInner: false,
    innerHtml: false,
    unit: '亿元',
    nameKey: 'x_data',
    valueKey: 'y_data',
    colorArr: ['#FF9990', '#FFD893', '#66D6D5', '#7DC5FF', '#AC90DD', '#70AD47', '#81c784', '#ffe0b2', '#f48fb1', '#42a5f5'],
    guidePosition: ['50%', '48%'],
    pieLabel: false,
    legendConfig: {
      position: 'right',
      align: 'center',
      triggerOn: 'click',
    },
    coord: {
      transposed: true,
      innerRadius: 0.6,
      radius: 0.7
    },
    callback: false
  }
}