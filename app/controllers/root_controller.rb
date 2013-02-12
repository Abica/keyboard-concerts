class RootController < ApplicationController
  def index
    @performance = Performance.first
  end
end