#!/usr/bin/env node

var parser = require('commander')

parser
    // version
    .version('0.1.0', '-v, --version')
    // commands
    .command('open [project]', "Open a project.").action(function (project) {
        console.log("Opening " + project);
    })
    .command('create [project]', "Create a new project.").action(function (project) {
        console.log("Creating " + project);
    })
    .command('config', "Configure utility parameters.").action(function () {

    })
    // options
    .option('-s, --sync', 'Sync the project to Dropbox.')
    .option('-o, --open', "Open the project in your favorite text editor.")
    // parsing
    .parse(process.argv);

// console.log("Sync: " + parser.sync);
// console.log("Open: " + parser.open);
console.log(parser.open);
