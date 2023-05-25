const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html', // Path to the HTML template file
        title: 'JATE' // Title for the HTML page
      }),

      new InjectManifest({
        swSrc: './src-sw.js', // Path to the service worker source file
        swDest: 'src-sw.js' // Destination path for the generated service worker
      }),
      new WebpackPwaManifest({
        fingerprints: false, // Whether to add fingerprints to the generated assets
        inject: true, // Whether to inject the manifest into the HTML template
        name: 'Just Another Text Editor', // Name of the PWA
        short_name: 'JATE', // Short name of the PWA
        description: 'Just another text editor', // Description of the PWA
        background_color: '#989da3', // Background color of the PWA
        theme_color: '#989da3', // Theme color of the PWA
        start_url: '/', // Start URL of the PWA
        publicPath: '/', // Public path of the generated assets
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Path to the PWA icon
            sizes: [96, 128, 192, 256, 384, 512], // Sizes of the generated icons
            destination: path.join('assets', 'icons'), // Destination path for the generated icons
          },
        ],
      })

    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // Match CSS files
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader for processing CSS files
        },
        {
          test: /\.m?js$/, // Match JavaScript files
          exclude: /node_modules/, // Exclude the 'node_modules' directory
          use: {
            loader: 'babel-loader', // Use babel-loader for transpiling JavaScript files
            options: {
              presets: ['@babel/preset-env'], // Use @babel/preset-env preset for transpiling to compatible JavaScript
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Use additional Babel plugins for language features and runtime support
            },
          },
        },
      ],
    },
  };
};
