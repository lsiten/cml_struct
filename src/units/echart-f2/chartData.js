import options from './params'

export default async function getData(param) {
  let option = options[param]
  let dataReturn = await (option.url ? getUrlData(option) : getStateData(option))
  let entity = {}
  let eData = []
  if (option.type === 'polar') {
    entity = {
      data: dataReturn,
      option: option
    }
    eData = chartDataFormat_polar(entity)
    return {
      data: eData,
      options: option || {}
    }
  } else {
    entity = {
      data: dataReturn,
      optionArr: option.chartOptions && option.chartOptions.optionArr ? option.chartOptions.optionArr : false
    }
    let changeName = {}
    eData = chartDataFormat(entity)
    for (let i = 0; i < entity.optionArr.length; i++) {
      changeName[entity.optionArr[i].y_data] = {
        alias: entity.optionArr[i].name
      }
    }
    changeName['x_key'] = option.chartOptions.x_Config
    return {
      dataSoureCfg: changeName,
      data: eData,
      options: option.chartOptions || {}
    }
  }
}
let getUrlData = async (option) => {

}

let getStateData = async (option) => {
  if (option.callback && typeof option.callback === 'function') {
    return option.callback()
  }
  if (option.url) {
  }
  let pieY = ('' + Math.random()).replace('.', '_')
  let dataPolar = [
    {x_data: '芳华', y_data: 666},
    {x_data: '妖猫传', y_data: 888},
    {x_data: '机器之血', y_data: 999},
    {x_data: '心理罪', y_data: 6551},
    {x_data: '寻梦环游记', y_data: 566},
    {x_data: '其他', y_data: 555}
  ];
  let otherData1 = [
    {x_data: 0, y_data: 666, y_data_1: 65},
    {x_data: 1, y_data: 666, y_data_1: 65},
    {x_data: 2, y_data: 888, y_data_1: 615},
    {x_data: 3, y_data: 999, y_data_1: 655},
    {x_data: 4, y_data: 551, y_data_1: 665},
    {x_data: 5, y_data: 566, y_data_1: 665},
    {x_data: 6, y_data: 566, y_data_1: 665},
    {x_data: 7, y_data: 555, y_data_1: 666},
    {x_data: 8, y_data: 666, y_data_1: 65},
    {x_data: 9, y_data: 888, y_data_1: 615},
    {x_data: 10, y_data: 999, y_data_1: 655},
    {x_data: 11, y_data: 551, y_data_1: 665},
    {x_data: 12, y_data: 566, y_data_1: 665},
    {x_data: 13, y_data: 999, y_data_1: 655},
    {x_data: 14, y_data: 551, y_data_1: 665},
    {x_data: 15, y_data: 566, y_data_1: 665},
    {x_data: 16, y_data: 566, y_data_1: 665},
    {x_data: 17, y_data: 555, y_data_1: 666},
    {x_data: 18, y_data: 666, y_data_1: 65},
  ];
  let otherData = [
    {x_data: '芳华1', y_data: 666, y_data_1: 65},
    {x_data: '芳华2', y_data: 888, y_data_1: 615},
    {x_data: '芳华3', y_data: 999, y_data_1: 655},
    {x_data: '芳华4', y_data: 551, y_data_1: 665},
    {x_data: '芳华5', y_data: 566, y_data_1: 665},
    {x_data: '芳华6', y_data: 555, y_data_1: 666},
    {x_data: '芳华7', y_data: 666, y_data_1: 65},
    {x_data: '芳华8', y_data: 888, y_data_1: 615},
    {x_data: '芳华9', y_data: 999, y_data_1: 655},
    {x_data: '芳华10', y_data: 551, y_data_1: 665},
    {x_data: '芳华11', y_data: 566, y_data_1: 665},
    {x_data: '芳华12', y_data: 555, y_data_1: 666},
    {x_data: '芳华13', y_data: 666, y_data_1: 65},
    {x_data: '芳华14', y_data: 888, y_data_1: 615},
    {x_data: '芳华15', y_data: 999, y_data_1: 655},
    {x_data: '芳华16', y_data: 551, y_data_1: 665},
    {x_data: '芳华17', y_data: 566, y_data_1: 665},
    {x_data: '芳华18', y_data: 555, y_data_1: 666}
  
  ];
  return option.type === 'polar' ? dataPolar : otherData
}
/*
* 环图/饼图entity{
* * data:数据源
* * x_key:返回的数据key名称,
* * y_key:返回的数据key名称,
* */
let chartDataFormat_polar = (entity) => {
  let sData = entity.data ? entity.data : []
  let arr = new Array()
  if (entity.option) {
    let pieY = ('' + Math.random()).replace('.', '_')
    let option = entity.option
    for (let i = 0; i < sData.length; i++) {
      let newObj = {
        nameKey: sData[i][option.nameKey],
        valueKey: sData[i][option.valueKey],
        strKey: pieY
      }
      arr.push(newObj)
    }
  }
  return arr
}
let findLegendItem = (name, legendItems) => {
  let index = void 0;
  for (let i = 0; i < legendItems.length; i++) {
    if (legendItems[i].name === name) {
      index = i;
      break;
    }
  }
  return index;
}
/*
* 组合报表entity{
* * data:数据源
* * x_key:返回的数据key名称,
* * y_key:返回的数据key名称,
* * optionArr:[{
* * * name:数据名称0（必填）
* * * x_data:x轴数据源0的键名（必填）
* * * y_data:y轴数据源0的键名（必填）
* * * type:数据源0类型的键名（必填）
* *}……]
* }
* */

let chartDataFormat = (entity) => {
  let sData = entity.data ? entity.data : []
  let arr = new Array()
  if (entity.optionArr) {
    let optionArr = entity.optionArr
    for (let i = 0; i < sData.length; i++) {
      let ent = new Object()
      ent['x_key'] = sData[i][optionArr[0].x_data]
      for (let j = 0; j < entity.optionArr.length; j++) {
        if (optionArr[j].x_data) {
          ent[optionArr[j].y_data] = sData[i][optionArr[j].y_data]
        }
      }
      arr.push(ent)
    }
  }
  return arr
}
let chartDataFormat0 = (entity) => {
  let sData = entity.data ? entity.data : []
  let arr = new Array()
  if (entity.optionArr) {
    let optionArr = entity.optionArr
    for (let i = 0; i < optionArr.length; i++) {
      let name = optionArr[i].name ? optionArr[i].name : '数组' + i
      if (optionArr[i].x_data) {
        for (let j = 0; j < sData.length; j++) {
          let ent = new Object()
          ent.x_key = sData[j][optionArr[i].x_data]
          ent[optionArr[i].y_data] = sData[j][optionArr[i].y_data]
          ent.name = name
          arr.push(ent)
        }
      }
    }
  }
  return arr
}
