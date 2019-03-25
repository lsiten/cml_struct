
// 设置静态资源的线上路径
const publicPath = 'http://10.8.10.131:8080';
// 设置api请求前缀
const apiPrefix = 'https://api.chameleon.com';

cml.config.merge({
  templateLang: "cml",
  templateType: "html",
  platforms: ["web","weex","wx"],
  buildInfo: {
    wxAppId: '123456'
  },
  wx: {
    dev: {
    },
    build: {
      apiPrefix
    }
  },
  check: {
    enable: true,
    enableTypes: ["Object","Array","Nullable"]
  },
  web: {
    dev: {
      analysis: false,
      console: false
    },
    build: {
      hash: true,
      analysis: false,
      publicPath: `${publicPath}/web/`,
      apiPrefix
    }
  },
  weex: {
    dev: {
      console: true
    },
    build: {
      hash: true,
      publicPath: `${publicPath}/weex/`,
      apiPrefix
    },
    custom: {
      publicPath: `${publicPath}/wx/`,
      apiPrefix
    }
  },
  proxy: {
    // enable: true,
  }
})

