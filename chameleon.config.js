
// 设置静态资源的线上路径
const publicPath = '//www.static.chameleon.com/cml';
// 设置api请求前缀
const apiPrefix = 'https://api.chameleon.com';

cml.config.merge({
  templateLang: "cml",
  templateType: "html",
  platforms: ["web","weex","wx"],
  buildInfo: {
    wxAppId: '123456'
  },
  globalCheckWhiteList: ['canvas.js', /node_modules/, /f2-canvas/, /ec-canvas/],
  wx: {
    dev: {
    },
    build: {
      apiPrefix
    }
  },
  check: {
    enable: false,
    enableTypes: ["Object","Array","Nullable"]
  },
  web: {
    dev: {
      analysis: false,
      console: false
    },
    build: {
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

