class RegistrationsController < Devise::RegistrationsController  
  clear_respond_to
  respond_to :json #Necessary so that Devise knows we are working with json
end  