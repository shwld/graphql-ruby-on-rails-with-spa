# graphql-ruby + devise + Single Page Application on Rails

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/shwld/graphql-ruby-on-rails-with-spa)

## Includes

- Ruby on Rails
- graphql-ruby
- Devise authentication
- Single Page Application (Vue.js)

## Install

```
docker-compose build
docker-compose run --rm app yarn
docker-compose run --rm app bundle install
docker-compose run --rm app bundle exec rails db:create db:migrate
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
