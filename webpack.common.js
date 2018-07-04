const ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');

const cssDist = 'assets/css/';

const ExtractSass = new ExtractTextPlugin({filename: cssDist + '[name].css', allChunks: true});

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { 
      test: /\.(css|sass|scss)$/,
      use: ExtractSass.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]', outputPath: 'assets/graphics' }
          }
        ]
      }
    ]
   },
   resolve: {
     symlinks: false
   },
   plugins: [
	 ExtractSass
   ]
};
