class ItemsController < ApplicationController
  before_action :authenticate_user!, only: [:update]

  def index
    @items = Item.all.order(name: :asc)
  end

  def search
    @items = Item.search params[:q], fields: [:name], match: :word_start
  end

  def show
  end

  def update
  end
end
