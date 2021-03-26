const { resolve } = require('path')
const { writeFile, readdir, stat, readFileSync, mkdir } = require('fs');

function getProjectPath(projectName) {
    return resolve(process.cwd(), projectName);
}

// 合并json数据
function extendPackage(current, main) {
    for (let key in current) {
        if (!main[key]) {
            main[key] = current[key];
        } else {
            if (Object.prototype.toString.call(current[key]) === '[object Object]') {
                extendPackage(current[key], main[key]);
            } else {
                main[key] = current[key];
            }
        }
    }
};

// 复制模板
async function copyTemplate(from, to) {
    stat(from, (err, stat) => {
        if (stat.isDirectory()) {
            readdir(from, (err, paths) => {
                paths.forEach(path => {
                    if (!/\./.test(path)) {
                        mkdir(to + "/" + path, () => {
                            copyTemplate(from + "/" + path, to + "/" + path)
                        })
                    } else {
                        copyTemplate(from + "/" + path, to + "/" + path)
                    }
                })
            })
        } else {
            writeFile(to, readFileSync(from), () => { });
        }
    })
}

function generateFiles(tempName, path = '') {
    const from = resolve(__dirname, `../template/${tempName}`);
    const to = process.cwd() + path;
    copyTemplate(from, to);
}

module.exports = {
    getProjectPath,
    extendPackage,
    generateFiles
}
