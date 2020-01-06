class SessionsController < Devise::SessionsController  
  clear_respond_to
  respond_to :json #Tell Devise we are working with json
  after_action :set_csrf_headers, only: [:create, :destroy]

  #these would be used to set a redirect url for a successful login
  #since React is handling that these need to be here to keep Devise from having issues
  private
  def users_url 
  end

  def user_url (resource)
  end

  protected
  def set_csrf_headers # Needed because we must refresh CSRF headers after ajax login
    # Add the newly created csrf token to the response headers
    response.headers['X-CSRF-Token'] = "#{form_authenticity_token}"
    response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}"
  end
end