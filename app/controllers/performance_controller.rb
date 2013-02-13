class PerformanceController < ApplicationController
  protect_from_forgery

  before_filter 'find_performance', :only => :show

  def play
    performance = Performance.create
    uuid = performance.uuid

    redirect_to '/' + uuid
  end

  def watch
    performance = Performance.first

    redirect_to '/' + performance.uuid + '/watch'
  end

  def show
    Pusher[@uuid].trigger('note-received', {'note' => 53})
  end

  private
  def find_performance
    @uuid = params[:uuid]

    @performance = Performance.where(:uuid => @uuid)
  end
end
