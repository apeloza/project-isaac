class SearchController < ApplicationController
  def index
  end

  def flex
    
    respond_to do |format|
      format.json do
        render json: test_json.to_json
      end
    end
  end
end
