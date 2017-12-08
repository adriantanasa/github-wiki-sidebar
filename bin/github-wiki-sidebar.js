#!/usr/bin/env node
/**
 * CLI helper tool for generating giHub Wiki sidebar 
 *
 * Note: After `npm install` the path to ./node_modules/bin/ can be used
 *
 */
'use strict';
const debug = require('debug')('git-wiki-sidebar');
const path = require('path');
var shell = require('shelljs');
const fs = require('fs');
const Console = require('console').Console;
const inquirer = require('inquirer');

const myConsole = new Console(process.stdout, process.stderr);
const argv = require('minimist')(process.argv.slice(2));
let baseDir = __dirname;
let dataDir = path.join(baseDir, '../data');
let workDir = process.cwd();
let defaultOptions = require(path.join(dataDir, 'prototype-options.json'));

let action = argv['action'] || 'run';
let doGit =  argv['git-push'] ? true : false;

if (doGit && !shell.which('git')) {
    myConsole.error('Sorry, this option requires git to be installed!');
    process.exit(1);
}

if (argv['help']) action = 'help';

const buildSidebar = function(doSidebar = true, doClean = true, doOptionFile = null, doGit = false) {
    let optionFilePath = path.join(workDir, 'options.json');

    if (doGit) {
        debug('Pushing results to origin');
        shell.exec('git fetch origin');
        shell.exec('git pull');
    }

    if (doOptionFile) {
        debug('Generating the custom options.json file ...');
        try {
            let fileContent = JSON.stringify(doOptionFile, null, 2);
            fs.writeFileSync(optionFilePath, fileContent);
        } catch (e) {
            myConsole.error('Failure running job!', e);
            process.exit(1);
        }
    }

    if (doSidebar) {
        debug('Build the _Sidebar.md file ...');
        let pathBin = path.join(baseDir, '/../../git-wiki-to-html/bin/git-wiki-to-html');
        let result = shell.exec('node ' + pathBin + ' --template=markdown', {silent: true}).stdout;
        if (result.match(/done/g)) {
            myConsole.log('_Sidebar.md generated.');
        } else {
            myConsole.log('Error generating _Sidebar.md: ' + result);
        }
    }

    if (doClean) {
        debug('Removing temporary options.json file');
        shell.exec('rm ' + optionFilePath);
    }

    if (doGit) {
        debug('Pushing updates to git');
        shell.exec('git add .');
        shell.exec('git commit -am "Automatic update of _Sidebar.md from github-wiki-sidebar"');
        shell.exec('git push origin master');
    }

    debug('Job done.');
};

debug('Executing job %s', action);

switch (action) {
case 'help':
    myConsole.log(`
NAME:
    github-wiki-sidebar

SYNOPSIS
    github-wiki-sidebar [--action=run|help|init|tutorial] [--separator=: ] [-link-template=%s] [--menu-template=%s] 
        [--git-commit]

DESCRIPTION
    action

        run         Default action builds the sidebar file based on the files from curent folder.

        init        Generates a local options.json file based with user step by step input. Not generating _Sidebar.md

        tutorial    Executes the run job based on step by step user input
    
    separator       Customizes only the separator to be used for multilevel items 
                    ex: 
                        ': ' will transform 'Faq:-Details.md' in FAQ -> Details
                        ' # ' will transform 'Faq-#-Details.md' in FAQ -> Details 
                    Note spaces are replaced by '-'.

    link-template   Chose a different format for your link template (ex: absolute path)

    menu-template   Add content around your generated menu (ex: Logo image)

    git-push        Updates repository before running job and push updates automatically at the end.
        `);
    break;
case 'tutorial':
case 'init': {
    myConsole.log('Customizing the github-wiki-ssidebar options:');
    let questions = [
        {
            type: 'input',
            name: 'separator',
            message: 'Customize the separator character(s) for multi-level menu:',
            default: defaultOptions['separator']
        },
        {
            type: 'input',
            name: 'linkTemplate',
            message: 'Customize the internal links format:',
            default: defaultOptions['linkTemplate']
        },
        {
            type: 'input',
            name: 'category-1',
            message: 'Select the _Sidebar.md content template:',
            default: '%s'
        }
        // TODO add order 1-10 needs extension on parent module
    ];

    inquirer.prompt(questions).then(answers => {
        // Use user feedback for... whatever!!
        let options = Object.assign({}, defaultOptions);
        options['separator'] = answers['separator'].replace(/ /g, '-');
        options['linkTemplate'] = answers['linkTemplate'];
        options['menu']['category-1'] = answers['category-1']
            .replace(/\\n/g, '\n')
            .replace('%s', defaultOptions['menu']['category-1']);
        // execute job
        buildSidebar(action === 'tutorial', action === 'tutorial', options, doGit);
    });
    break;
}

default: {
    // default run markdown to local files
    let options = {};
    // TODO basic validation
    if (argv['separator']) options['separator'] = argv['separator'].replace(/ /g, '-');
    if (argv['link-template']) options['linkTemplate'] = argv['linkTemplate'];
    if (argv['menu-template']) options['menu']['category-1'] = argv['menu-template']
        .replace(/\\n/g, '\n')
        .replace('%s', defaultOptions['menu']['category-1']);

    options = Object.keys(options).length !== 0 ? options : null;
    buildSidebar(true, options !== null, options, doGit);
}
}
