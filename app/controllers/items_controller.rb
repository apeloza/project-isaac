class ItemsController < ApplicationController
  before_action :authenticate_user!, only: [:update] #Will be used for adding tags to items, must be admin login

  def index
    @items = Item.all.order(name: :asc) #Returns all items sorted by name.
  end

  def search
    @items = Item.search params[:q], fields: [:name], match: :word_start #Searches via name, accepts partials
  end

  def update
  end
end
