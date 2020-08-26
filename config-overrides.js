const {InjectManifest} = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  webpack: function(config, env) {
    // config.plugins.push(
    //   new InjectManifest({
    //     globPatterns: [
    //       'images/*.png',
    //       'images/*.ico',
    //       'models/*.glb',
    //       'music/*.mp3',
    //       'sound/*.mp3'
    //     ],
    //     globDirectory: 'build',
    //     swSrc: path.join('src', 'serviceWorker.js'),
    //     swDest: 'service-worker.js'

    //   })
    // );

    return config;
  }
}
