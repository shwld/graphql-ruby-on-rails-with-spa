Rails.application.config.generators do |g|
  g.orm :active_record, primary_key_type: :uuid
  g.javascripts false
  g.stylesheets false
  g.helper false
  g.system_tests false
  g.test_framework :rspec,
    fixtures: true,
    view_specs: false,
    helper_specs: false,
    request_specs: false,
    routing_specs: false,
    controller_specs: false,
    model_specs: false
  g.fixture_replacement :factory_bot, dir: "spec/factories"
end
