// noinspection JSUnresolvedFunction
const {injectBabelPlugin} = require('react-app-rewired');
// noinspection JSUnresolvedFunction
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// noinspection JSUnresolvedVariable
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}], config);
    config = injectBabelPlugin(['lodash'], config);
    config.plugins.push(new LodashModuleReplacementPlugin);
    return config;
};
