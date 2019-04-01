const cml = require('chameleon-api')

const fetch = function fetch(url, params) {
  return new Promise((resolve, reject) => {
    cml.post({
      url: url,
      data: params
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

const fetch_json = function (url, params) {
  return new Promise((resolve, reject) => {
    cml.post({
      url: url,
      data: params,
      header: {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

module.exports = {
  fetch,
  fetch_json
}
