# graphql-ruby + devise + Single Page Application on Rails

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Includes

- Ruby on Rails
- Devise authentication
- Single Page Application (Vue.js)

## Install

```
docker-compose build
docker-compose run --rm app yarn
docker-compose run --rm app bundle install
```

## VSCode

```
code --install-extension ms-vscode-remote.vscode-remote-extensionpack
```

Open folder in container

![remote development](./docs/vscode1.png)

## TODO

- [ ] Client and serverside validation rail
- [ ] Include heroku setting
