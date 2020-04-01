class ApartmentsController < ApplicationController

  def index
    apartments = Apartment.all
    render json: apartments
  end
  def show
    apartment = Apartment.find(params[:id])
    user = User.find(apartment.user_id)
    render json: { apartment:apartment, user:user }
  end
end
