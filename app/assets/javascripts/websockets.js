$(function() {
  if (typeof Pusher == 'undefined') {
    console.log("Pusher undefined");
    Pusher = function() {};
    Pusher.subscribe = function() {};
  }

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  WEB_SOCKET_DEBUG = true;

  var pusher = new Pusher('9dda803ec1b86517972e');
  var chanName = (location.pathname.match(/([a-z0-9-]+)/) || [])[0];
  if (chanName) {
    console.log(chanName);
    var channel = pusher.subscribe(chanName);
    channel.bind('note-played', function(data) {
      alert("HERE", data);
      new Note(data.key);
    });


    channel.bind('pusher:subscription_error', function(status) {
      console.log("issue", status);
    });


    $.getJSON("/play_tune", function(json) {
      var inc = 200;
      var delay = inc;

      $.each(json.notes, function(i, note) {
        setTimeout(function() {
          new Note(note);
        }, delay);
        delay += inc;

      });
    });
  }
});
