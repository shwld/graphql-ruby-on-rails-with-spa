require 'net/http'
require 'uri'

module FirebaseAuthorizable
  extend ActiveSupport::Concern

  def set_sentry_context
    if firebase_user_signed_in?
      Sentry.set_user(id: current_firebase_user.id)
    end
    Sentry.set_extras(params: params.to_unsafe_h, url: request.url)
  end

  private

  def http_token
    if request.headers['Authorization'].present?
      request.headers['Authorization'].split(' ').last
    end
  end

  def auth_token
    verify = ENV['ID_ISSUER'].present?
    options = verify ? {
      algorithm: 'RS256',
      iss: ENV.fetch('ID_ISSUER'),
      verify_iss: true,
      aud: ENV.fetch('ID_API_AUDIENCE'),
      verify_aud: true,
    } : {}
    @auth_token ||= JWT.decode(http_token, nil, verify, options) do |header|
      jwks_raw = Net::HTTP.get URI(ENV.fetch('ID_JWKS_URL'))
      jwks_hash = JSON.parse(jwks_raw)
      signing_input = jwks_hash[header['kid']]
      cert = OpenSSL::X509::Certificate.new(signing_input)
      cert.public_key
    end
  rescue JWT::VerificationError, JWT::DecodeError
    [{}]
  end

  def current_firebase_user
    return nil if firebase_user_params.blank?
    @current_firebase_user ||= FirebaseUser.find_or_create_by(id: firebase_user_params[:sub], issuer: firebase_user_params[:iss])
  end

  def firebase_user_signed_in?
    current_firebase_user.present?
  end

  def firebase_user_params
    ActionController::Parameters.new(auth_token.first).permit(:sub, :iss, :email).to_h.compact
  end
end
