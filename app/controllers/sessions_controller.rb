class SessionsController < Devise::SessionsController  
    clear_respond_to
    respond_to :json

    def create
        self.resource = warden.authenticate!(auth_options)
        set_flash_message!(:notice, :signed_in)
        sign_in(resource_name, resource)
        yield resource if block_given?
        respond_with resource
    end

    private
    def users_url #this would be used to set a redirect url for a successful login
                  #since React is handling that this needs to be here to keep Devise from having issues
    end
    def user_url (resource)
        byebug
    end
end