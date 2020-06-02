class ApplicationController < ActionController::Base
  before_action :set_raven_context if ENV['SENTRY_DSN'].present?

  def set_raven_context
    if user_signed_in?
      Raven.user_context(id: current_user.id, email: current_user.email)
    end
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end
end
