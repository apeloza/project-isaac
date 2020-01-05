class SessionsController < Devise::SessionsController  
    clear_respond_to
    respond_to :json
    after_action :set_csrf_headers, only: [:create, :destroy]


    def create
        self.resource = warden.authenticate!(auth_options)
        set_flash_message!(:notice, :signed_in)
        sign_in(resource_name, resource)
        yield resource if block_given?
        respond_with resource
    end

    private
    def users_url #these would be used to set a redirect url for a successful login
                  #since React is handling that these need to be here to keep Devise from having issues
    end

    def user_url (resource)
    end

    protected
    def set_csrf_headers # Needed because we must refresh CSRF headers after ajax login
        # Add the newly created csrf token to the page headers
        # These values are sent on 1 request only
        response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
        response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
    end
end