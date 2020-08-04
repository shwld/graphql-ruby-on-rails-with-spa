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

.PHONY: down
down:
	docker-compose down

.PHONY: console
console:
	docker-compose run --rm app bundle exec rails console

.PHONY: migrate
seed:
	docker-compose run --rm app bundle exec rails db:migrate

.PHONY: seed
seed:
	docker-compose run --rm app bundle exec rails db:seed_fu
