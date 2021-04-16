class ApplicationController < ActionController::Base
  before_action :set_sentry_context if ENV['SENTRY_DSN'].present?

  def set_sentry_context
    if user_signed_in?
      Sentry.set_user(id: current_user.id, email: current_user.email)
    end
    Sentry.set_extras(params: params.to_unsafe_h, url: request.url)
  end
end
