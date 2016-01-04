Rails.application.routes.draw do

  devise_for :users
  resources :links

  root 'links#index'
  
  get 'tagged' => 'links#tagged', :as => 'tagged'

end
