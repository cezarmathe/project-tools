#!/usr/bin/env node

var parser = require('commander')

parser
    .version('0.1.0', '-v, --version')
    .option('-v, --verbose');

// create function
parser
    .command('create [project]')
    .description('create a new project')
    .option('-g, --git', 'create a git repository')
    .option('-s, --sync', 'create the project in a synced folder and symlink it in the projects directory')
    .option('-e, --editor [editor_name]', 'open the project in your favorite editor(or specify a diffrent one)')
    .action(function(project, options) {
        console.log("called create");
    });

parser.parse(process.argv);
