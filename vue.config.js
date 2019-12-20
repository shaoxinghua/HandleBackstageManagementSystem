module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/public/' : '/',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: false,
  /* webpack-dev-server 相关配置 */
  devServer: {
  /* 自动打开浏览器 */
  open: false,
  /* 设置为本机地址，不能用localhost或者0.0.0.0，否则跨域不生效 */
  host: '192.168.1.4',
  port: 8080,
  https: false,
  hot:true,
  hotOnly: false,
  /* 使用代理 */
    proxy: {
      '/devApi': {
        /* 目标代理服务器地址 */
        target: "http://www.web-jshtml.cn/productapi/token",
        /* 允许跨域 */
        changeOrigin: true,
        /*这里理解成用‘/devApi’代替target里面的地址，后面组件中我们调接口时直接用devApi代替。比如我要调用'http://47.100.47.3/user/add'，直接写‘/api/user/add’即可*/
        pathRewrite: {
          '^/devApi': '' 
        }
      },  
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");     
    svgRule.uses.clear();     
    svgRule
    .use("svg-sprite-loader")       
    .loader("svg-sprite-loader")       
    .options({         
      symbolId: "icon-[name]",         
      include: ["./src/icons"]       
    });  
  }
}