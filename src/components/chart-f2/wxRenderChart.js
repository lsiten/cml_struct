const renderChartTools = {
  // 渲染图标，柱状图
  renderBarByType(x_data, y_data, color) {
    chart.interval().position(x_data + '*' + y_data).color([color])
  },
  // 渲染图标，折线图
  renderLineByType(x_data, y_data, color) {
    chart.line({connectNulls: true}).position(x_data + '*' + y_data).color([color]).shape('smooth')
  },
  generateLengend(name, lengendItems, lengendStyle, lengendcallback) {
    if (lengendcallback && typeof lengendcallback === 'function') {
      lengendcallback()
    } else {
      let lengendStyleFinish = _.assign({
        custom: true,
        items: lengendItems,
      }, lengendStyle)
      chart.legend(lengendStyleFinish)
    }
  },
  generateTooltip(tooltipcallback) {
    if (tooltipcallback && typeof tooltipcallback === 'function') {
      tooltipcallback()
    } else {
      chart.tooltip({
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
}

export default renderChartTools
