require 'sidekiq/web'

Rails.application.routes.draw do

  mount Sidekiq::Web.new, at: '/sidekiq'

  scope module: :web do
    root to: 'welcome#index'
		resources :load, only: [:index, :new, :create]
    resources :process, only: :index
  end

  namespace :api do
    resources :generate, only: [:create, :show]
  end

end
