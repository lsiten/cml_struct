const GROUP_NAME = 'home';
const redirect = require('../config/map.json');
const config = require('../config/index');
const CodeMap = require('../config/responseCode');
const homeControllers = require('../controller/home');
module.exports = [
  {
    method: 'post',
    path: `/${GROUP_NAME}/addr`,
    handler: async (request, reply) => {
      let url = redirect.web_url + '?wx_addr=' + encodeURIComponent(redirect.wx_url) + '&weex_path=' + encodeURIComponent(redirect.entry_path)
      return url
    }
  },
  {
    method: 'get',
    path: `/${GROUP_NAME}/addr`,
    handler: async (request, reply) => {
      let data = JSON.parse(JSON.stringify(config.response))
      data.code = CodeMap.OK.code
      data.msg = CodeMap.OK.message

      let body = homeControllers.test()
      data.body = body

      const response = reply.response(data);
      response.type('text/plain');
      response.header('content-type', 'application/json; charset=utf-8');
      return response;
    }
  }
];