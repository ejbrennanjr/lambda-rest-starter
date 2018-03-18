/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod.babel';
import colors from 'colors';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via Webpack.');

webpack(webpackConfig).run((err, stats) => {
    if(err) {
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if(jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`Webpack stats: ${stats}`);

    // if we got this far, build succeeded
    console.log('Successfully compiled in production mode to /dist');

    return 0;
});
