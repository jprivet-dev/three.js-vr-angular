#!/usr/bin/env bash

# Load aliases:
# $ . .bash_aliases

alias reload=". .bash_aliases"
alias ng="docker-compose exec --user 1000:1000 node ng"
alias npm="docker-compose exec --user 1000:1000 node npm"

echo -e '\033[1;42mangular-threejs-earth: aliases loaded\033[0m'
