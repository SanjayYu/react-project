import { v4 } from 'internal-ip';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpackConfigBase from './webpack.config.base.babel';
import paths, { PUBLIC_PATH } from './paths';
import proxyConfigAll from './proxy.config';

const HOST = process.env.HOST || v4.sync(); // 本机IP
const PORT = process.env.PORT || 8080; // 端口号

// 根据 npm start --[参数] 进行环境切换, 例如 `npm start --qa`
let proxyCurrent = proxyConfigAll.dev; // 默认使用 dev 环境
Object.keys(proxyConfigAll).forEach(envKey => {
  if (process.env[`npm_config_${envKey}`]) {
    proxyCurrent = { ...proxyCurrent, ...proxyConfigAll[envKey] };
  }
});

const webpackConfigDev = {
  ...webpackConfigBase,
  devServer: {
    // 允许访问的机器列表
    allowedHosts: [HOST],

    // 客户端日志信息等级
    clientLogLevel: 'none',

    // gzip 压缩
    compress: true,

    // 提供静态资源的文件夹，可以使用数组，推荐使用 *绝对路径*
    contentBase: paths.appPublic,

    // 绕过主机检查，仅在需要其它机器连接时打开此选项
    disableHostCheck: false,

    // html5路由
    historyApiFallback: true,

    // ip地址
    host: HOST,

    // 热模块替换
    hot: true,

    // 启动后打开浏览器
    open: true,

    // 服务端口号
    port: PORT,

    // api转发
    proxy: proxyCurrent,

    // 服务目录，总是以`/`开头或结尾，与 `output.publicPath` 相同
    publicPath: PUBLIC_PATH,
  },
  plugins: webpackConfigBase.plugins.concat([
    // html 模板
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),

    // 模块热替换
    new webpack.HotModuleReplacementPlugin(),
  ]),
};

export default webpackConfigDev;
