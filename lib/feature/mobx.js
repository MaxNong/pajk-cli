const { extendPackage } = require('../utils/common');
module.exports = function (packageJson) {
    mergePackage(packageJson);
}

// 合并package.json数据
function mergePackage(packageJson) {
    const mobxConfig = {
        dependencies: {
            'mobx': '^6.1.8',
        }
    }

    extendPackage(mobxConfig, packageJson);
}
