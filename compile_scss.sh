#!/bin/bash

# Set up nvm
echo "Setting up nvm"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Variables
echo "Variables"
fileName=$1
fileNameWithoutExtension=$(sed -E 's/^(.*)\..*$/\1/gm;t' <<< "$1")

# Process file
echo "Processing file"
# shellcheck disable=SC2086
sass $fileName:$fileNameWithoutExtension.css --style compressed --no-source-map

# Autoprefix
echo "Autoprefixing file"
# shellcheck disable=SC2086
postcss $fileNameWithoutExtension.css --replace --use autoprefixer --no-map