class ItemsController < ApplicationController
  def index
    @items = Item.all.order(name: :asc)
  end

  def search
    @items = Item.search params[:q]
  end

  def show
  end
end
