const {injectBabelPlugin} = require('react-app-rewired');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const rewireLess = require('react-app-rewire-less');
module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}], config);
    config = injectBabelPlugin(['lodash'], config);
    config.plugins.push(new LodashModuleReplacementPlugin);
    config = rewireLess.withLoaderOptions({
        modifyVars: {"@primary-color": "#1DA57A"},
    })(config, env);
    return config;
};
