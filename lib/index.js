
//lib/index.js
const cmd = require('commander');
const create = require('./order/create');

cmd
    .version(`${require('../package.json').version}`, '-v --version')
    .usage('<command> [options]');

cmd
    .command('create <name>')
    .description('Create new project')
    .action(async (name) => {
        create(name);
    });
cmd.parse(process.argv);