module.exports = {
  publicPath: '',

  "transpileDependencies": [
    "vuetify"
  ],

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}

const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
        alias: {
            videojs: 'video.js',
            WaveSurfer: 'wavesurfer.js',
            RecordRTC: 'recordrtc'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            videojs: 'video.js/dist/video.cjs.js',
            RecordRTC: 'recordrtc'
        })
    ]
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
}
