const api = require('../fetch/modules/home')
const CodeMap = require('../config/responseCode')
module.exports = {
  test: async () => {
    let responseData = {}
    try {
      let requestData = {}
      requestData = await api.com_test({
        ieFlag: "0",
        timeType: "201808"
      })
      responseData.body = requestData.body || {}
      responseData.code = requestData.errcode || CodeMap.ERROR.code
      responseData.msg = requestData.message || CodeMap.ERROR.message
    } catch (e) {
      responseData.code = CodeMap.ERROR.code
      responseData.msg = CodeMap.ERROR.message
      responseData.body = {}
    }
    return responseData
  }
}