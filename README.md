# graphql-ruby + devise + Single Page Application on Rails

[![Github Actions](https://github.com/shwld/graphql-ruby-on-rails-with-spa/workflows/rspec/badge.svg)](https://github.com/shwld/graphql-ruby-on-rails-with-spa/actions)
[![CircleCI](https://circleci.com/gh/shwld/graphql-ruby-on-rails-with-spa.svg?style=svg)](https://circleci.com/gh/shwld/graphql-ruby-on-rails-with-spa)
[![Heroku](https://heroku-badge.herokuapp.com/?app=graphql-ruby-on-rails-with-spa)](https://graphql-ruby-on-rails-with-spa.herokuapp.com)

---

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/shwld/graphql-ruby-on-rails-with-spa)

## Includes

- Ruby on Rails
- graphql-ruby
- Devise authentication
- Single Page Application

more

[日本語](/docs/ja/README.md)

## Install

```
cp .env.example .env
docker-compose setup
docker-compose run --rm app yarn
```

## Server start

```
make up
```

or

```
make up-verbose
```

## Graphql types generate

```
make generate
```

## Database

```
make migrate
make seed
```

see Makefile

## Test

```
make test
make test-all
make jest
```

## Generate component

```
make new-component
```
