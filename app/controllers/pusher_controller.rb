class PusherController < ApplicationController
  protect_from_forgery :except => :auth # stop rails CSRF protection for this action

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

      # You might alternatively want to deny them:
      # render :text => "Not authorized", :status => '403'
    end
  end

end
