const { extendPackage } = require('../utils/common');
module.exports = function (packageJson) {
    mergePackage(packageJson);
}

// 合并package.json数据
function mergePackage(packageJson) {
    const stateManagerConfig = {
        dependencies: {
            'redux': '^4.0.5',
        }
    }

    extendPackage(stateManagerConfig, packageJson);
}
