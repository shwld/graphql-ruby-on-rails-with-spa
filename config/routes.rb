Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'
  devise_for :users

  root to: 'view#show'

  if Rails.env.development?
    post '/schema', to: 'graphql_schema#execute'
    get '/graphiql', to: 'graphiql#show'
    mount LetterOpenerWeb::Engine, at: '/letter_opener'
  end

  get '*path' => 'view#show', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
