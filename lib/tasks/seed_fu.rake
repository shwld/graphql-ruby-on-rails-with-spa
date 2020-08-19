require 'seed-fu'

namespace :db do
  task seed_fu: :environment do
    if ENV['FILTER']
      filter = /#{ENV['FILTER'].gsub(/,/, '|')}/
    end

    fixture_paths = ['db/fixtures/shared']

    if ENV['FIXTURE_PATH']
      fixture_paths = ['db/fixtures/shared', ENV['FIXTURE_PATH']]
    end

    SeedFu.seed(fixture_paths, filter)
  end
end
