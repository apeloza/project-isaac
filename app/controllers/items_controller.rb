class ItemsController < ApplicationController
  def index
    @items = Item.all.order(name: :desc)
  end

  def show
  end
end
