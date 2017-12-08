# github-wiki-sidebar

Multi-level github wiki sidebar menu generator (_Sidebar.md) from the filenames in the wiki repository 

See example of wiki generated sidebar at https://github.com/adriantanasa/github-wiki-sidebar

Starting from a github wiki with the following pages:

```
Home
Installation
Roadmap
Usage
Usage: Command line modifiers
Usage: Init Mode
Usage: Tutorial Mode
```

This tool can automatically generate the sidebar file (_Sidebar.md) with the menu as:

  * [Home](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Home)
  * [Instalation](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Instalation)
  * [Usage](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Usage)
    * [Command line modifiers](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Usage%3A-Command-line-modifiers)
    * [Init mode](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Usage%3A-Init-mode)
    * [Tutorial mode](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Usage%3A-Tutorial-mode)
  * [Roadmap](https://github.com/adriantanasa/github-wiki-sidebar/wiki/Roadmap)


## Installation

We recommend installing the module globally for ease of usage and not poluting your wiki repository with node_modules packages

```
npm install github-wiki-sidebar -g
```

Alternatively you can install the module in your wiki folder and update .gitignore filenames

```
npm install github-wiki-sidebar --save
# using it locally
node ./node_modules/github-wiki-sidebar/bin/github-wiki-sidebar.js
```

## Usage

If installed globally and the npm bin path is in your $PATH variable just call the github-wiki-sidebar from within your local wiki folder:

```
# this will generate _Sidebar.md with default options
github-wiki-sidebar
```

Executing in tutorial mode (step by step) - allow user to generate sidebar with customized settings:

```
github-wiki-sidebar --action=tutorial
```

Executing in init mode (step by step) - allow user to generate an option.json file with customized settings that will be picked up on next execution.

```
github-wiki-sidebar --action=init
```

For more information on the syntax and available parameters run:

```
github-wiki-sidebar --help
```

Debug:

```
export DEBUG=github-wiki-sidebar;github-wiki-sidebar
```

## Recipes

### Working directly with your github wiki repository

```shell
git clone https://github.com/adriantanasa/github-wiki-sidebar.wiki.git
cd github-wiki-sidebar.wiki
github-wiki-sidebar
git add . && git commit -am "Create or Update the _Sidebar.md"
```

Updating from a local cloned github wiki repository manualy

```shell
cd github-wiki-sidebar.wiki
git fetch origin
git pull
github-wiki-sidebar
git add . && git commit -am "Update of the _Sidebar.md"
git push origin master
```

The --git-push modifier allows to execute the job above automatically.

```shell
cd github-wiki-sidebar.wiki
github-wiki-sidebar --git-push
```

### Changing the order of your menu items

Currently you can change the order of the files only manually by editing a option.json file in the root folder

```shell
# generate option.json file with custom parameters
github-wiki-sidebar --action=init
```

Change the order in the options.json file - to match local .md files

```json
{
    ...
    "rules": {
        "order": [
            "Home.md",
            "Instalation.md",
            "Usage:-Tutorial-mode.md",
            "Usage:-Init-mode.md"
        ]
    },
    ...
}

```

Then execute the default job:

```shell
github-wiki-sidebar
# sidebar will have the same order now as in the upper top example
```

*Note:* Specify only the files that should take priority to others. This offers flexibility in case other files are added latter.

## Contribution

Feel free to create issues, fork and create PR to address them!

Check [Roadmap] (https://github.com/adriantanasa/github-wiki-sidebar/wiki/Roadmap) for planned items.

## See also

This module is a helper built on top of [git-wiki-to-html](https://www.npmjs.com/package/git-wiki-to-html).




