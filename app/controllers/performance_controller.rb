class PerformanceController < ApplicationController
  protect_from_forgery

  before_filter 'find_performance', :only => [:show, :show_time]

  def play
    performance = Performance.create
    uuid = performance.uuid

    redirect_to show_time_path(performance.id, performance.uuid)
  end

  def watch
    performance = Performance.last

    redirect_to show_path(performance.uuid)
  end

  def show
  end

  def show_time
    unless @performance.id == params["id"].to_i
      redirect_to root_path
    end

    render :show
  end
end
