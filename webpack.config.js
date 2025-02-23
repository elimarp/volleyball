const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  // Other webpack config...
  plugins: [
    new InjectManifest({
      swSrc: './src/service-worker.js', // Ensure this file exists
      swDest: 'service-worker.js',
    }),
  ],
};
