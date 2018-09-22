# Project tools

A small utility for creating, opening and maintaining projects and project files.

## Setup
Add this line to your ~/.bashrc file:

    alias project='/path/to/the/project/source/folder/app.js'
<br>
Create a file in *~/.config* named *project_tools.json* and use the template in *templates/config_template.json*.

## Usage
    project [command] [project] [options]
There are three global options:

    -v, --verbose 		enables verbose output
    -V, --version 		outputs the script's version
    -h, --help			prints the script's help
<br>
To create a project, use:

    project create [project] [options]
 The options here are:

    -g, --git			create a git repository
    -s, --sync			create the git repository in your synced folder
    -e, --editor		opens the project in your favorite editor(atom)
    -t, --terminal		opens an xfce4-terminal at the project location
    -h, --help			output usage information
<br>
To open a project, use:

    project open [project] [options]
The options here are:

    -e, --editor		opens the project in your favorite editor(atom)
    -t, --terminal		opens an xfce4-terminal at the project location
    -h, --help			output usage information
