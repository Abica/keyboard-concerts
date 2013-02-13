var doc = $(document);
doc.ready(function() {
  if (typeof Pusher == "undefined") {
    return;
  }

  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  WEB_SOCKET_DEBUG = true;
  var pusher = new Pusher(PUSHER_KEY);
  var privateChannel = pusher.subscribe("private-" + UUID);
  var channel = pusher.subscribe(UUID);

  channel.bind("user-entered", function(data) {
    console.log("viewer entered");
  });

  privateChannel.bind("client-note-received", function(data) {
    delayNote(data.note, 0);
  });

  generateKeyboards();

  if (location.pathname.length == 37 || location.pathname.indexOf("watch") != -1) {
    return;
  }

  doc.keypress(function(e) {
    if (e.shiftKey) {
      $("#keyboard-normal").hide();
      $("#keyboard-shift").show();

    } else {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }

    var note = e.charCode

    $.post('/' + UUID + '/keys', {'key': note}, function(data) {});

    privateChannel.trigger("client-note-received", {"note": note});

    delayNote(note, 0);
  });

  doc.keyup(function(e) {
    if (!e.shiftKey) {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }
  });
});
