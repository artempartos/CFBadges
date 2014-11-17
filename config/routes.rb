require 'sidekiq/web'

Rails.application.routes.draw do

  mount Sidekiq::Web.new, at: '/sidekiq'

  scope module: :web do
    root to: 'welcome#index'
		resources :orders, only: [:new, :create, :show]
  end

  namespace :api do
    resources :generate, only: [:create, :show]
		resources :orders, only: [:get_archive_url]
  end

end
