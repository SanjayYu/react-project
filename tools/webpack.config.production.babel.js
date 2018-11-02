import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlIncludeAssetsPlugin from 'html-webpack-include-assets-plugin';
import webpackConfigBase from './webpack.config.base.babel';
import paths from './paths';
import urls from './urls';
import getValueByEnv from './getValueByEnv';
import switchConfig from './swtich.config';

const {
  USE_DLL,
  OPEN_SOURCE_MAP,
  USE_PRIVATE_SOURCE_MAP_SERVER,
} = switchConfig;

const isProd = process.env.NODE_ENV === 'production';

// 是否使用私有 sourcemap 服务器
const PRIVATE_SOURCE_MAP_SERVER = getValueByEnv(urls, {
  field: 'PRIVATE_SOURCE_MAP_SERVER',
  defaultEnv: 'online',
});
const SOURCE_MAP_PUBLICH_PATH = USE_PRIVATE_SOURCE_MAP_SERVER
  ? PRIVATE_SOURCE_MAP_SERVER
  : paths.publicPath;

let manifestJson = null;
if (USE_DLL) {
  try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    manifestJson = require(paths.appDistDllManifestJson);
  } catch (error) {
    console.error('【构建失败】您开启了 DLL 功能，但我没有找到 dll 文件');
    console.info('请先执行\n\tnpm run build:dll\n以生成 dll 文件');
    process.exit(0);
  }
}

const webpackConfigProd = {
  ...webpackConfigBase,
  mode: 'production',
  output: {
    // 产出
    filename: 'js/[name].[hash:8].bundle.js', // 入口文件名
    chunkFilename: 'js/[name].[hash:8].chunk.js', // 非入口代码分块文件名规则
    path: paths.appDist,
  },

  // 使用 SourceMapDevToolPlugin 生成的 sourcemap
  devtool: false,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: OPEN_SOURCE_MAP,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    ...webpackConfigBase.plugins,

    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[contenthash:8].css' : '[name].css',
      chunkFilename: isProd ? 'css/[id].[contenthash:8].css' : '[id].css',
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    USE_DLL &&
      new webpack.DllReferencePlugin({
        manifest: manifestJson,
      }),

    USE_DLL &&
      new HtmlIncludeAssetsPlugin({
        assets: ['dll/vendor.dll.js'], //  添加的资源相对html的路径
        append: false, // false 在其他资源的之前添加 true 在其他资源之后添加
      }),

    // 自定义 sourcemap 地址
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map',
      publicPath: SOURCE_MAP_PUBLICH_PATH,
      fileContext: 'js',
    }),

    // 清理旧文件, plugins 顺序应该放在最后
    new CleanWebpackPlugin([paths.appDist], {
      root: paths.appRoot,
      exclude: USE_DLL ? ['dll'] : [],
    }),
  ].filter(Boolean),
};

export default webpackConfigProd;
