class PusherController < ApplicationController
  protect_from_forgery :except => [:auth, :event]

  def event
  end

  def auth
    channel_name = params[:channel_name]

    channel = Pusher[channel_name]

    if identity = session[:identity]
      response = channel.authenticate(params[:socket_id], {
        :user_id => session[:session_id],
        :user_info => {
          :gravatar => identity[:gravatar]
        }
      })
      render :json => response

    else
      # We're allowing anonymous users
      response = channel.authenticate(params[:socket_id], {
        :user_id => session[:session_id] || rand(100000),
        :user_info => {}
      })
      render :json => response

    end
  end

end
