#!/usr/bin/env bash

# Script: lint.sh
# Description: This program runs all types of lints to ensure the program functions correctly.
# - ESLINT: Verifies opinionated styles defined in eslint.config.mjs
# - TSLINT: Verifies types are correct

# Function to format and display a header
echo_header() {
    echo -e "\n\033[1;33m###############################\033[0m"
    echo -e "\033[1;33m# $1\033[0m"
    echo -e "\033[1;33m###############################\033[0m\n"
}

# Function to format and display a description
echo_description() {
    echo -e "\033[0;37m$1\033[0m\n"
}

# Example usage of headers and descriptions
echo_header "Step 1: Running eslint linter"
echo_description "This step verifies and attempts to fix opinionated styles to ensure a coherent developer experience."
pnpm run lint

if [ $? -ne 0 ]; then
    echo_header "Steps Failed"
    echo_description "Please fix the above linting issues before continuing."
    exit 1
fi

echo_header "Step 2: Running typescript type checker"
echo_description "This step ensures that no typescripts types are mismatched. This step ensures the long build process doesn't fail due to type checking."
pnpm run lint:type

if [ $? -ne 0 ]; then
    echo_header "Steps Failed"
    echo_description "Please fix the above linting issues before continuinng."
    exit 1
fi

# End script message
echo_header "All Steps Completed"
echo_description "You have successfully followed all the instructions. Linting has passed successfully."
