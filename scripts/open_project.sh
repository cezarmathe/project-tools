#!/bin/bash

PROJECT_DIR="$1"; shift

PROJECT_PATH="$1"; shift

cd "$PROJECT_DIR/$PROJECT_PATH"

exec bash
