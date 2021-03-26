const { getProjectPath } = require("./common");
const { exec, cd } = require("shelljs");
const { existsSync, writeFileSync } = require('fs');
const { prompt } = require('inquirer')
const defatulPackageJson = require('../../config/defatulPackageJson')
const chalk = require('chalk')

const log = console.log

// 初始化文件夹
function initProjectDir(projectName) {
    const file = getProjectPath(projectName);
    if (existsSync(file)) {
        console.log(`${file} 已经存在`);
        process.exit(1);
    }
    exec(`mkdir ${projectName}`);
    cd(projectName);
}

// 选择模块
async function selectFeature() {
    const answers = await prompt([
        {
            name: 'stateManager',
            type: 'list',
            message: '选择状态管理器',
            choices: [
                { name: 'redux', value: 'redux', checked: true },
                { name: 'mobx', value: 'mobx' },
                { name: 'pajk-mobx', value: 'pajk-mobx' },
                { name: '不使用', value: 'no',},
            ],
        },
        {
            name: 'uiComponent',
            type: 'list',
            message: '选择组件库',
            choices: [
                { name: 'h5', value: 'h5', checked: true },
                { name: 'pc', value: 'h5' },
                { name: 'pc-admin', value: 'h5' },
                { name: '不使用', value: 'no',},
            ],
        },
        {
            name: 'api',
            type: 'confirm',
            message: '是否使用module api',
            default: true
        },
    ]);

    const modules = getModules(answers)

    return ['entry', ...modules];
}

// 输出features数组形式
function getModules(features) {
    let featureArr = []
    Object.keys(features).forEach(feature => {
        const value = features[feature]
        if (value && value !='no') {
            featureArr.push(value === true ? feature : features[feature])
        }
    })

    return featureArr
}

// 合并模块配置项
function installFeature(feature, projectName) {
    //根据需要的feature，到文件名对应的路径下加载对应的功能模块
    const featureArr = feature.map(name => require(`../feature/${name}`));

    //设置默认的package.json内容
    const packageJson = Object.assign(defatulPackageJson, {
        "name": projectName,
    })

    //调用对应功能的创建方法复制模块配置项到当前目录
    featureArr.forEach(item => {
        item(packageJson)
    })

    return packageJson;
}

// 写入package.json
function initPackage(package) {
    writeFileSync(process.cwd() + "/package.json", JSON.stringify(package, null, 4));
}

// 安装所有模块
function installModule() {
    log(chalk.green(('开始安装模块...')))
    exec('cnpm install')
}

module.exports = {
    initProjectDir,
    selectFeature,
    installFeature,
    initPackage,
    installModule
};





