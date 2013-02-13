class ApplicationController < ActionController::Base
  protect_from_forgery

  protected

  def find_performance
    @uuid = params[:uuid]

    @performance = Performance.where(:uuid => @uuid).first
  end
end
