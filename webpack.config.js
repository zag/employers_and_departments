
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require('fs');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src/');
var DEV = process.env.DEV || 'false';


const options = {
    root : __dirname,
    appName : 'Plosure'
  };
  
  function resolve( ...args ) {
    return fs.realpathSync(path.join( ...args ));
  }
  
/*
https://github.com/webpack/webpack-dev-server/pull/127

 proxy [{
        // proxy all requests not containing ".hot-update.js"
        // regex is still crappy because JS doesn't have negative lookbehind
        path:    /^(?!.*\.hot-update\.js)(.*)$/, 
        // koa running on 3001 with koa-send and isomorphic react
        target:  'http://localhost:3001/'
    }]

       {
        path:    /^(?!.*\.hot-update\.js)(.*)$/, 
        target: 'http://localhost:5000',},

//        path:    /^(?!.*(\.hot-update\.json|\d{4}\/\d{3}\/(?!.*(png|jpg))))(.*)$/, 
//        path:    /(?!hot\-update)|(?!\d+)$/, 

*/
var config = {

  devServer: {
    port: 8080,
    contentBase: 'build',
    publicPath: "/",
    // historyApiFallback: true,
    historyApiFallback: {
        rewrites: [
            // shows views/landing.html as the landing page
            { from: /^\/api\/Fetch.*/, to: '/api/Fetch' },
            // shows views/subpage.html for all routes starting with /subpage
            { from: /^\/subpage/, to: '/views/subpage.html' },
            // shows views/404.html on all other pages
            // { from: /./, to: '/views/404.html' },
        ],
    },
     proxy: {
        // '/api/': {
        //     target: 'http://localhost:5000',
        //     secure: false,
        //     // bypass: function(req, res, proxyOptions) {
        //         // if (req.headers.accept.indexOf('html111') !== -1) {
        //         //   console.log('Skipping proxy for browser request.');
        //         //   return '/index.html';
        //         // }
        //     // changeOrigin: true
        //   },
        //   '/Ui/*': {
        //     target: 'http://localhost:5000',
        //     secure: false,
        //     pathRewrite: function (url) {
        //         return url.replace(/^\/api/, '/Ui');
        //       }
        //     // changeOrigin: true
        //   },
          // '!/**/*.{css,js,hot-update.json}': {
          //   target: 'http://localhost:5000',
          //   secure: false
          //   // changeOrigin: true
          // },
          '/api/**': {
            target: 'http://localhost:5000',
            secure: false,
            pathRewrite: function (path, req) {
              // translate /api/Posts -> back
              //           /api/posts  -> front
            var letter = path.match(/\/api\/(\w).*/);
              if ( letter  ){
                letter = letter[1];
                if ( letter == letter.toLowerCase()) {
                      return '/api/'
                }}
              
                  return path
                }
            // changeOrigin: true
          },

              }
  },
    entry: "./src/index.js",
    // output: {
    //         path: BUILD_DIR,
    //         filename: "bundle.js"
    // },
    output: {
      // path: path.join(options.root, './dist'),
      path: BUILD_DIR,
      pathinfo: true,
      publicPath: '/',
      // filename: '[name].[hash].js',
      filename: "bundle.js",
      chunkFilename: '[id].[chunkhash].js',
      sourceMapFilename: '[file].map'
    },
  
    module: {
        rules: [
        //     { test: /\.css$/, 
	    // loader: ExtractTextPlugin.extract("style-loader", "css-loader")
	    // },

            //  {test : /\.jsx?/,
            //  include : APP_DIR,
            //  loader : 'babel'},
             {
                test: /\.js$/,
                use: [{
                  loader: 'babel-loader'
                }],
                include: [
                  path.resolve(__dirname, 'src'),
                  path.resolve(__dirname, 'node_modules/react-icons/')
                ]
              },
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            {
                test: /\.scss$/,
                include: [resolve(__dirname, 'src')],
                exclude: [resolve(__dirname, 'src/styles')],
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      module: true,
                      localIdentName: '[name]-[local]',
                    },
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                      plugins: (loader) => [
                        require('autoprefixer')({
                          browsers: ['> 5%', 'ie >= 9']
                        }),
                      ]
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      outputStyle: 'expanded',
                      sourceMap: true,
                    //   includePaths: [resolve(__dirname, 'app/styles/core')],
                    },
                  },
                ],
              }, {
                test: /\.(scss|css)$/,
                include: [resolve(__dirname, 'src/styles'), resolve(__dirname, 'node_modules')],
                use: [
                  {
                    loader: 'style-loader',
                  },
                  {
                    loader: 'css-loader',
                    options: {
                      module: true,
                      localIdentName: '[local]',
                    },
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      sourceMap: true,
                      plugins: (loader) => [
                        require('autoprefixer')({
                          browsers: '> 5%'
                        }),
                      ]
                    },
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      outputStyle: 'expanded',
                      sourceMap: true
                    },
                  },
                ],
              }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css")
    ]
};

module.exports = config;
