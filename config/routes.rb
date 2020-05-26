Rails.application.routes.draw do
  post '/graphql', to: 'graphql#execute'
  devise_for :users

  root to: 'view#show'

  if Rails.env.development?
    post '/schema', to: 'graphql_schema#execute'
    get '/graphiql', to: 'graphiql#show'
  end
end
