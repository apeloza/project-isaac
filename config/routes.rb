Rails.application.routes.draw do
  get 'items/index'
  get 'items/search'
  get 'items/show'
  root 'home#index'
  get '/*path' => 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
