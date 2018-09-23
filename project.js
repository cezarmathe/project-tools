#!/usr/bin/env node

var parser = require('commander')
const fs = require('fs');
const exec = require('child_process').exec;


const config = JSON.parse(fs.readFileSync(require('os').homedir + '/.config/project_tools.json'));
var _verbose = false;


function log(level, output) {
    if (level == 0 && _verbose) {
        console.log(output);
    }
    else if (level == 1) {
        console.log(output);
    }
}

function execute(command) {
    log(0, `Executing ${command}`);
    exec(command, (err, stdout, stderr) => {
        process.stdout.write(stdout);
        process.stderr.write(stderr);
    });
}


function project_create(path, full = false) {
    if (full) {
        execute(`mkdir ${path}`);
    }
    else {
        execute(`mkdir ${config["project_dir_path"]}/${path}`);
    }

}

function project_create_sync(path) {
    project_create(`${config["project_sync_path"]}/${path}`, true);
    execute(`ln -s ${config["project_sync_path"]}/${path} ${config["project_dir_path"]}/${path}`);
}

function project_git_init(path) {
    execute(`git init ${config["project_dir_path"]}/${path}`)
}


parser
    .version('0.1.0', '-V, --version')
    .option('-v, --verbose', 'enable verbose', () => {
        _verbose = true;
    })

// Create feature
parser
    .command('create [project]')
    .description('create a new project')
    .option('-g, --git', 'create a git repository')
    .option('-s, --sync', 'create the project in a synced folder and symlink it in the projects directory')
    .option('-e, --editor', 'open the project in the project editor')
    .option('-t, --terminal', 'open the project in a new terminal window')
    .option('-f, --file-manager', 'open the project in the file manager')
    .action((project, options) => {
        log(0, 'Creating the project ' + project + '.');
        log(0, 'Sync is set to ' + options.sync + '.');
        log(0, 'Git is set to ' + options.git + '.');
        log(0, 'Editor is set to ' + options.editor + '.');

        if (options.sync === true) {
            project_create_sync(project);
            log(0, 'Created the sync project file.');
        }
        else {
            project_create(project);
            log(0, 'Created the project file.');
        }

        if (options.git === true) {
            project_git_init(project);
            log(0, 'Created the git repository');
        }

        if (options.editor === true) {
            execute(`${config["editor"]} ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in the editor.');
        }

        if (options.filemanager === true) {
            execute(`thunar ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in a file manager.');
        }

        if (options.terminal === true) {
            execute(`xfce4-terminal --default-working-directory=${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in a new terminal window.');
        }
        // TODO: open the project in the same terminal
        else {
            execute(`cd ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in the same terminal.');
        }
        process.exit();

    });

// Open feature
parser
    .command('open [project]')
    .description('open an existing project')
    .option('-e, --editor', 'open the project in the project editor')
    .option('-t, --terminal', 'open the project in a new terminal window')
    .option('-f, --filemanager', 'open the project in the project editor')
    .action((project, options) => {
        log(0, 'Opening the project ' + project + '.');
        log(0, 'Editor is set to ' + options.editor + '.');

        if (options.editor === true) {
            execute(`${config["editor"]} ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in the editor.');
        }

        if (options.terminal === true) {
            execute(`xfce4-terminal --default-working-directory=${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in a new terminal window.');
        }

        if (options.filemanager === true) {
            execute(`thunar ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in a file manager.');
        }

        if (options.editor === true) {
            execute(`${config["editor"]} ${config["project_dir_path"]}/${project}`);
            log(0, 'Opened the project in the editor.');
        }
        // TODO: open the project in the same terminal
        else {
            execute(`cd ${config["project_dir_path"]}/${project}`);
            execute(`exec bash`);
            log(0, 'Opened the project in the same terminal.');
        }
        process.exit();
    });

parser.parse(process.argv);
