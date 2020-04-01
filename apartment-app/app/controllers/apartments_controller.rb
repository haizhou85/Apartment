class ApartmentsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    @apartments = Apartment.all
    @my_apartments = current_user.apartments.all
    render json: { apartments:@apartments, myApartments:@my_apartments}
  end

  def create
    @apartment = current_user.apartments.create(apartment_params)
    if @apartment.valid?
      render json: @apartment
    else
      render json: @apartment.errors, status: :unprocessable_entity
    end
  end


  def show
    @apartment = Apartment.find(params[:id])
    @user = User.find(@apartment.user_id)
    render json: { apartment:@apartment, user:@user }
  end

  private
  def apartment_params
    params.require(:apartment).permit(:street, :city, :state, :zipcode, :country)
  end
end
