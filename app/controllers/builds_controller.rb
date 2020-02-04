class BuildsController < ApplicationController
  def save_build
    @build = current_user.builds.first || current_user.builds.new
    @build.item_ids = params['itemIds']
    @build.save
    head :ok
  end
  
  def load_build
  end
end
