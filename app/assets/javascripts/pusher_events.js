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
  var noteChannel = pusher.subscribe("private-" + UUID);
  var channel = pusher.subscribe(UUID);

  channel.bind("note-received", function(data) {
    delayNote(data.note, 0);
  });

  noteChannel.bind("client-note-received", function(data) {
    delayNote(data.note, 0);
  });

  generateKeyboards();

  doc.keypress(function(e) {
    if (e.shiftKey) {
      $("#keyboard-normal").hide();
      $("#keyboard-shift").show();

    } else {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }

    noteChannel.trigger("client-note-received", {"note": e.charCode});
  });

  doc.keyup(function(e) {
    if (!e.shiftKey) {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }
  });
});
