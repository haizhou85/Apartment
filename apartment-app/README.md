# README

## Set Up Devise
- $ rails new apartment_app -d postgresql -T
- $ cd apartment_app
- $ bundle add devise
- $ rails generate devise:install
- $ rails generate devise User
- $ rails generate devise:views
- $ rails db:create
- $ rails db:migrate

## Add React
- $ bundle add react-rails
- $ bundle install
- $ rails webpacker:install
- $ rails webpacker:install:react
- $ rails generate react:install
- $ yarn install

## Generate a New React Component
- $ rails g react:component App

## Add a Homepage
- $ rails g controller Home

## Create Homepage
- ./config/routes.rb
```
get '*path', to: 'home#root', constraints: ->(request){ request.format.html? }
root to: 'home#root'
```

- create root.html.erb in ./app/views/home
```
///variables and paths created by Devise, pass to App.js
<%= react_component("App", {
    logged_in: user_signed_in?,
    sign_in_route: new_user_session_path,
    sign_out_route: destroy_user_session_path,
    edit_user_route: edit_user_registration_path,
    current_user: current_user
}) %>
```
- ./app/controllers/home_controller.rb
```
def root
end
```
- ./config/initializers/devise.rb
> change ```config.sign_out_via = :delete```
> to ```config.sign_out_via = :get```

- ./app/javascript/component/App.js
>create react component here

## Add bootstrap
- $ bundle add bootstrap
- $ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss
- Add an import to the "sass" file ```@import 'bootstrap'```
- $ yarn add reactstrap
### Add Bootswatch
- $ npm install bootswatch
- add to app.js
```
import 'bootswatch/dist/litera/bootstrap.min.css'
```


## Model
- $ rails g resource Apartment street:string city:string zipcode:string state:string country:string user_id:integer
- $ rails db:migrate
- app/controllers/apartments_controller.rb
```
///only allow authenticate_user to use create, delete, update method.
before_action :authenticate_user!, only: [:update, :destroy, :create]
skip_before_action :verify_authenticity_token
```
- app/models/apartment.rb
```
belongs_to :user
```
- app/models/user.rb
```
has_many :apartments
```
## Validation
- /app/models/apartment.rb
```
validates :street, :city, :state, :zipcode, :country, presence: true
```
- app/models/user.rb
```
validates :name, :phonenumber, :hours, presence: true
```

## Customize sign up form
- in config/initializers/devise.rb
```
# ==> Scopes configuration
# Turn scoped views on. Before rendering "sessions/new", it will first check for
# "users/sessions/new". It's turned off by default because it's slower if you
# are using only default views.
config.scoped_views = true
```
- add name, phone number and hours to contact to users table
- $ rails g migration add_info_columns_to_users
- in migration file
 ```
def change
  add_column :users, :name, :string
  add_column :users, :phonenumber, :string
  add_column :users, :hours, :string
end
```
- $ rails db:migrate
- Update code in ApplicationController
```
protect_from_forgery with: :exception
before_action :configure_permitted_parameters, if: :devise_controller?
protected
  def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:name, :email, :phonenumber, :hours, :password)}
      devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(:name, :email, :phonenumber, :hours, :password, :current_password)}
  end
```
- create fields in views/devise/registration/new and views/devise/registration/edit
```
<div class="field">
   <%= f.label :name %><br />
   <%= f.text_field :name, autofocus: true %>
</div>
<div class="field">
   <%= f.label :phone_number %><br />
   <%= f.text_field :phonenumber, autofocus: true %>
</div>
<div class="field">
   <%= f.label :hours %><br />
   <%= f.text_field :hours, autofocus: true %>
</div>
```
- create users and add apartments in seed.rb
- $ rails db:seed

## Build controller methods
- in /app/controllers/apartments_controller.rb
- index, create, show, delete, update

## Build Pages
- install react router
$ yarn add react-router-dom
- Components/Header
- Pages/Home
- Pages/About
- Pages/Apartment_Index
- Pages/Apartment_Show
- Pages/New_Apartment
- Pages/My_Listings
- Pages/NotFound
