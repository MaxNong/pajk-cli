// lib\order\create.js
const { initProjectDir, selectFeature, installFeature, initPackage, installModule } = require("../utils/create");

module.exports = async function create(projectName) {
    // 初始化项目目录
    initProjectDir(projectName);

    // 选择需要的功能
    const feature = await selectFeature();

    //加载模块配置，合并package.json
    const package = installFeature(feature, projectName);

    // 写入package
    initPackage(package);

    //进入目录并安装modules
    installModule();
}
