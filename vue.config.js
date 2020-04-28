module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '"/jam-along/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}

const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    
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
  }
}