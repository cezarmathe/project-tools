#!/bin/bash


CONFIG_FILE=$HOME/.config/project_tools

# Check if config file exists
if [[ -e $CONFIG_FILE ]]; then
    source $HOME/.config/project_tools
else
    echo "No config file found."
    exit 1
fi

# Parse regular args
parse_regular_args() {
    while (( "$#" )); do
        case "$1" in
            -g|--git)
                GIT="1"
                shift 
                ;;
            --)
                shift
                break
                ;;
            -*|--*)
                echo "Unknown flag: $1" >&2
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}


create() {
    mkdir "$FOLDER"
    cd "$FOLDER"
}

open() {
    cd "$FOLDER"
}

# Parse the operation
case "$1" in
    create)
        OPERATION="CREATE"        
        shift
        ;;
    open)
        OPERATION="OPEN"
        shift
        ;;
    *)
        echo "Unknown operation: $1."
        exit 1
        ;;
esac

PROJECT="$1"; shift
FOLDER="$PROJECTS_DIR/$PROJECT"

if [[ "$OPERATION" == "CREATE" ]]; then
    parse_regular_args
    create
elif [[ "$OPERATION" == "OPEN" ]]; then
    parse_regular_args
    open
fi
