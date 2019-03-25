/*计算饼图内部的百分比
* data:饼图数据源
* keyName：饼图各个元素的名称的key
* keyValue:饼图各个元素值的key
* */
export function mapPercent(data, total, keyName, keyValue) {
  let map = {}
  console.log(data)
  data.map(function (obj) {
    map[obj[keyName]] = parseFloat(parseFloat(obj[keyValue]) * 100 / total) + '%'
  })
  return map
}

/*
*  计算占比
*  item：数字
*  total：总数
*/
export function itemPercent(item, total) {
  let percent = 0
  if (item && total) {
    percent = (parseFloat(item) * 100 / total).toFixed(2) + '%'
  }
  return percent
}

/*求和
* data:数组对象
* itemKey：对象中求和项，必须是数字
* */
export function sumAll(data, itemKey) {
  let total = 0
  for (let i = 0; i < data.length; i++) {
    if (parseFloat(data[i][itemKey]).toString() == "NaN") {
      data[i][itemKey] = 0
    }
    total += data[i][itemKey] * 1
  }
  return total.toFixed(2)
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
export function chartDataFormat(entity) {
  
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
          ent.y_key = sData[j][optionArr[i].y_data]
          ent.name = name
          arr.push(ent)
        }
      }
    }
  }
  console.log(arr)
  return arr
}

/*
* 数组去重*/
export function uniq(array) {
  let temp = []
  for (let i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i])
    }
  }
  return temp
}
