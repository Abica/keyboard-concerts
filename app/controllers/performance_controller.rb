class PerformanceController < ApplicationController
  before_filter 'find_performance', :only => :show

  def play
    performance = Performance.create
    uuid = performance.uuid

    channel(uuid).trigger('note-played', {:note => ?b})
    redirect_to '/' + uuid
  end

  def watch
    performance = Performance.first

    redirect_to '/' + performance.uuid
  end

  def show
  end

  private
  def find_performance
    @uuid = params[:uuid]

    @performance = Performance.where(:uuid => @uuid)
  end

  def channel(uuid = @uuid)
    Pusher[uuid]
  end
end
