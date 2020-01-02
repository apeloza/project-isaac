#VIEW ROUTES ARE NOT LOCATED HERE. VIEW ROUTES ARE LOCATED IN JAVASCRIPT/ROUTES/INDEX.JSX

Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'sessions', registrations: 'registrations'} 
  get 'items/index'
  get 'items/search'
  get '/users/check_for_user', to: 'users#check_for_user'
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
