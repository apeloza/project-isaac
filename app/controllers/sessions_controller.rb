class SessionsController < Devise::SessionsController  
    clear_respond_to
    respond_to :json

    def create
        byebug
        self.resource = warden.authenticate!(auth_options)
        set_flash_message!(:notice, :signed_in)
        sign_in(resource_name, resource)
        yield resource if block_given?
        respond_with resource
    end
end