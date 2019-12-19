class ItemsController < ApplicationController
  def index
    @items = Item.all.order(name: :asc)
  end

  def show
  end
end
