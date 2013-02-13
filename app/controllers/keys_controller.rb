class KeysController < ApplicationController
  before_filter 'find_performance', :only => :create

  def create
    sequence = @performance.sequence
    sequence.keys.create :key => params[:key]

    render :json => {:success => sequence.valid?}
  end
end
