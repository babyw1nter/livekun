/* eslint-disable @typescript-eslint/no-var-requires */
const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const isProduction = process.env.NODE_ENV !== 'development'

module.exports = {
  productionSourceMap: !isProduction,
  lintOnSave: false,
  chainWebpack: config => {
    // isProduction && config.plugin('webpack-bundle-analyzer').use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
    config.plugin('antd-dayjs-webpack-plugin').use(new AntdDayjsWebpackPlugin())
  }
}
