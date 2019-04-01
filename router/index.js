var requireAll = require('require-all')
var fs = require('fs')
var path = require('path')

var templateJson = require('./template.json')
var routers = []

var pages = requireAll({
  dirname: __dirname + '/modules/pages'
})

var weexs = requireAll({
  dirname: __dirname + '/modules/weex'
})

for (var index in pages) {
  routers = [
    ...routers,
    ...pages[index]
  ]
}

for (var index in weexs) {
  routers = [
    ...routers,
    ...weexs[index]
  ]
}

templateJson.routes = routers

fs.writeFile(path.join(path.resolve(__dirname, '../src'), 'router.config.json'), JSON.stringify(templateJson, null, 2), {
    encoding: 'utf-8'
}, (err) => {
  if(err) {
    return console.log(err)
  }
  console.log("File saved successfully!")

})

