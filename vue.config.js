module.exports = {
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