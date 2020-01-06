class UsersController < ApplicationController
  def check_for_user
    current_user = current_user #return devise's current user
  end
end