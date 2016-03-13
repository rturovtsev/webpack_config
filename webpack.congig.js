'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    //исходный файл
    entry: "./start/home",

    //файл на выходе
    output: {
        path: __dirname + "/start",
        filename: "build.js",
        //глобальная переменная или объект с экспортированными функциями
        library: "home "
    },

    //автоматическая пересборка только в деве
    watch: NODE_ENV == 'development',

    //пересборка через .1s после сохранения файла
    watchOptions: {
        aggregateTimeout: 100
    },

    //карта кода только в деве
    devtool: NODE_ENV == 'development' ? "source-map" : null,

    //плагины и переменные, которы будут доступны в модулях
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],

    //настройки поиска модулей
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    //применяем внешние трансформаторы к определенным файлам
    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015'
        }]
    }
};

//сожмем для прода
if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}