KeyboardConcerts::Application.routes.draw do
  # The priority is based upon order of creation:
  # first created -> highest priority.
  UUID_CONSTRAINTS = { :length => 36, :format => /[a-z0-9-]{36,36}/ }

  root :to => "root#index"
  match '/pusher/auth' => 'pusher#auth', :via => :post
  match '/pusher/event' => 'pusher#event', :via => :post

  match '/play' => 'performance#play', :as => :create_play, :via => :post
  match '/watch' => 'performance#watch', :as => :create_watch, :via => :post

  match '/:uuid/keys' => 'keys#create', :as => :create_key, :via => :post

  match '/:id/:uuid' => 'performance#show_time', :as => :show_time

  match '/:uuid' => 'performance#create',
    :via => :post,
    :as => :create_performance,
    :constraints => UUID_CONSTRAINTS

  match '/:uuid' => 'performance#show',
    :viewing => true,
    :as => :show,
    :via => :get,
    :constraints => UUID_CONSTRAINTS

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
