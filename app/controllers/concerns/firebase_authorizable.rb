require 'net/http'
require 'uri'

module FirebaseAuthorizable
  extend ActiveSupport::Concern

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
    @current_firebase_user ||= User.prepare(firebase_user_params)
  end

  def firebase_user_signed_in?
    current_firebase_user.present?
  end

  def firebase_user_params
    ActionController::Parameters.new(auth_token.first).permit(:sub, :iss, :email).to_h.compact
  end
end
