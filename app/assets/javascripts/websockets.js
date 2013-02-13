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
    var channel = pusher.subscribe(chanName);
    channel.bind('note-played', function(data) {
      alert("HERE", data);
      new Note(data.key);
    });

    channel.bind('pusher:subscription_error', function(status) {
      console.log("issue", status);
    });

    new Keyboard();
    $(document).keypress(function(e) {
      var note = e.charCode;
      new Note(note + 200);
      var node = $("#letter-" + note);

      node.fadeTo(50, 0.2).fadeTo(50, 1.0);
    });

    /*
    $.getJSON("/play_tune", function(json) {
      var inc = 400;
      var delay = inc;

      $.each(json.notes, function(i, note) {
        setTimeout(function() {
          new Note(note * 5);
        }, delay);
        delay += inc;

      });
    });
    */
  }
});
