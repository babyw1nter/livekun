/* eslint-disable @typescript-eslint/no-var-requires */
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugin('webpack-bundle-analyzer').use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
    config.plugin('antd-dayjs-webpack-plugin').use(new AntdDayjsWebpackPlugin())
  }
}
