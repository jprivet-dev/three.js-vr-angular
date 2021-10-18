FROM node:14.17-alpine

# Avoid "Error: Cannot find module '/usr/src/app/bash'" after `docker-compose up`
# Alpine images doesn't have bash installed out of box. You need to install it separately.
# @see https://stackoverflow.com/questions/63666064/docker-cannot-find-module-bin-bash
RUN apk update && apk add bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install global Angular CLI
# @see https://stackoverflow.com/questions/44525746/global-angular-cli-version-greater-than-local-version
RUN npm install -g @angular/cli@^12.2.2

COPY . .

USER 1000

