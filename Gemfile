source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

gem 'apollo_upload_server', '~> 2.0'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'cssbundling-rails', '~> 1.1'
gem 'devise-i18n'
gem 'devise'
gem 'graphql-batch'
gem 'graphql'
gem 'jsbundling-rails'
gem 'pg', '>= 0.18', '< 2.0'
gem 'propshaft'
gem 'puma'
gem 'pundit'
gem 'rack-cors'
gem 'rails-i18n'
gem 'rails'
gem 'seed-fu'
gem 'sentry-ruby'
gem 'sentry-rails'
gem 'sentry-sidekiq'
gem 'slim-rails'
gem 'sidekiq'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'gimei'
  gem 'graphql-autotest'
  gem 'guard-rspec'
  gem 'guard'
  gem 'pry-byebug'
  gem 'pry-rails'
  gem 'rspec-rails'
end

group :test do
  gem 'database_rewinder'
  gem 'rspec_junit_formatter'
end

group :development do
  gem 'annotate'
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'foreman'
  gem 'letter_opener'
  gem 'letter_opener_web'
  gem 'listen', '~> 3.2'
  gem 'rails-erd'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'spring'
  gem 'web-console', '>= 3.3.0'
end

gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
