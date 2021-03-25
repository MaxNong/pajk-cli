const { extendPackage, generateFiles } = require('../utils/common');
module.exports = function(packageJson) {
    mergePackage(packageJson);
    generateFiles('babel');
}

// 合并package.json数据
function mergePackage(packageJson) {
    const babelConfig = {
        babel: {
            presets: ['@babel/preset-env'],
        },
        dependencies: {
            'core-js': '^3.8.3',
        },
        devDependencies: {
            '@babel/core': '^7.12.13',
            '@babel/preset-env': '^7.12.13',
            'babel-loader': '^8.2.2',
        },
    }

    extendPackage(babelConfig, packageJson);
}
