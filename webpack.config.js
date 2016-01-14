'use strict';

var webpack = require("webpack");
var path = require('path');

module.exports = {
    cache: true,
    entry: {
        //'webpack-dev-server/client?http://localhost:9000',
        //'webpack/hot/dev-server',
        local: './js/local',
        dnevnik: './js/dnevnik',
        mosreg: './js/mosreg'
    },
    output: {
        path: __dirname + '/app/js',
        filename: "[name].js",
        publicPath: '/app'
    },

    resolve: {
        root: path.resolve('./my_modules'),
        modulesDirectories: ['node_modules'],
        extentions: ['', '.js']
    },

    module: {
        noParse: [
           // /\/my_modules\/soundmanager2\/soundmanager2/
        ],
        loaders: [
            {   test: /\.js$/, 
                //exclude: /node_modules/, 
                include: [
                    __dirname + '/js',
                    __dirname + '/my_modules',
                ], 
                loader: "babel?optional[]=runtime&stage=2",
                // query: {
                //     presets: ['es2015'],
                //     plugins: ['transform-object-assign']
                // }
            },
            {   test: /\.hbs$/, 
                loader: 'handlebars-loader',
                include: [
                    __dirname + '/my_modules/calendar/hbs',
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ]
};

