import webpack from 'webpack';
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'index'),
    target: 'node',    
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin()
    ],  
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            include: path.join(__dirname, 'src'),
            use: 'babel-loader'
          }
        ]
    }    
};