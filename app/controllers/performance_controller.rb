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
    Pusher[@uuid].trigger('notes', {'message' => 'hello world'})
  end

  def play_tune
    letters = %{a long sentence for the purpose of playing a test song}
    letters = ((0..9).to_a + ('a'..'z').to_a + ('A'..'Z').to_a).join
    notes = letters.split("").map {|l| l[0] }

    render :text => {:notes => notes}.to_json
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
