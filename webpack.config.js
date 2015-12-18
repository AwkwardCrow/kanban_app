//pull in exports from other modules
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');

//lets us know which environment we are building to, dev or prod
const TARGET = process.env.npm_lifecycle_event;

//pass target env to bable through webpack
process.env.BABEL_ENV = TARGET;


//set up our paths const variable as a jSON object
//use path.join(__dirname,'pathname') to set up the path to the app and build directories
const PATHS = {
app: path.join(__dirname, 'app'),
build: path.join(__dirname, 'build')
};



var common = {
  // Entry accepts a path or an object of entries.
  entry: PATHS.app,
  resolve:
  {
    //these resolve in order from left to right
    //so if you had test.js and test.jsx and just wrote 'test', test.js would be found first
    extensions: ['', '.js', '.jsx']
  },
  // The build chapter contains an example of the latter.
  //we no longer need the output, will look into this more in the build chapter
  /*output:
  {
    path: PATHS.build,
    filename: 'bundle.js'
  },*/
  module:
  {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
  // Important! move HotModuleReplacementPlugin below
  //new webpack.HotModuleReplacementPlugin(),
  new HtmlwebpackPlugin({
    title: 'Kanban app'
  })
  ]
};

if(TARGET === 'start' || !TARGET)
{
  module.exports = merge(common,
  {
    devtool: 'eval-source-map',
    devServer:
    {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      // Display only errors to reduce the amount of output.
      stats: 'errors-only',
      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
    new webpack.HotModuleReplacementPlugin()
    ]
  });
}
