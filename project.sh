#!/bin/bash

# Parsing args
while (( "$#" )); do
    case "$1" in
        -c|--config)

            shift 3
            ;;
        --)
            shift
            break
        -*|--*=)
            echo "Unknown flag: $1" >&2
            exit 1
            ;;
        *)
            shift
            ;;
    esac
done
