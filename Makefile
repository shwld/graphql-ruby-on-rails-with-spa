.PHONY: setup
setup:
	docker-compose build
	docker-compose run --rm app bin/setup

curdir := $(shell pwd)
app_name := $(shell basename ${curdir}_app_1)

.PHONY: up
up:
	docker-compose up -d
	docker attach ${app_name}

.PHONY: up-verbose
up-verbose:
	docker-compose up

.PHONY: attach
attach:
	docker attach ${app_name}

.PHONY: down
down:
	docker-compose down

.PHONY: console
console:
	docker-compose run --rm app bundle exec rails console

.PHONY: migrate
migrate:
	docker-compose run --rm app bundle exec rails db:migrate

.PHONY: seed
seed:
	docker-compose run --rm app bundle exec rails db:seed_fu

.PHONY: generate
generate:
	docker-compose run --rm app yarn generate --watch "app/javascript/graphql/**"

.PHONY: new-component
new-component:
	docker-compose run --rm app yarn hygen fc new

.PHONY: reset-test
reset-test:
	docker-compose run --rm -e RAILS_ENV=test app bundle exec rails db:reset

.PHONY: test-all
test-all:
	docker-compose run --rm test bundle exec rspec

.PHONY: test
test:
	docker-compose run --rm test bundle exec guard --no-bundler-warning --no-interactions

.PHONY: jest
jest:
	docker-compose run --rm test yarn test

.PHONY: lint
lint:
	docker-compose run --rm test yarn check
