import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

// https://github.com/webpack/webpack/issues/1403
// https://github.com/webpack/webpack/issues/5960
// http://www.romanfilippov.com/webpack-config-babel-js/
export default {
    context: __dirname,
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index'),
    target: 'node',    
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],  
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        library: "index",
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            use: {
                loader: 'babel-loader',
                options: {
                    babelrc: true
                }
            }
          }     
        ]
    }    
};
