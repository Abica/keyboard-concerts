function delayNote(note, delay) {
  setTimeout(function() {
    new Note(note);

    var node = $("#letter-" + note);

    node.fadeTo(50, 0.2).fadeTo(50, 1.0);
  }, delay);
}

function Note(key) {
  var data = [];

  var sampleRateHz = 44100;
  var numNotes = 1000;

  var baseFreq = function(index) {
    var r = 2 * Math.PI * 440.0 * Math.pow(2, key / 12.0) / sampleRateHz;
    return r;
  };

  for (var i = 0; i < numNotes; i++) {
    var l = 2 * sampleRateHz / numNotes;
    data[i] = 64 + 32 * Math.round(Math.sin(baseFreq(Math.round(i / l)) * i));
  }

  var wave = new RIFFWAVE(data);
  wave.header.sampleRate = 44100;
  wave.header.numChannels = 1;

  var audio = new Audio(wave.dataURI);
  audio.play();
}


function Keyboard() {
  var keyboards = {
    normal: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
             ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
             ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
             ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
             [" "]],

    shift:  [["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
             ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"],
             ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\""],
             ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"],
             [" "]]
  };

  $.each(keyboards, function(state, rows) {
    var html = "";

    $.each(rows, function(i, letters) {
      var keys = $.map(letters, function(letter) {
        var id = "letter-" + letter.charCodeAt(0);
        return "<li class=\"letter\" id=\"" + id + "\">" + letter + "</li>";
      });

      html += "<ul class=\"letter-row\">" + keys + "</ul>";
    });

    var keyboard = $("#main").prepend("<div id=\"keyboard-" + state + "\">" + html + "</div>");
  });

  $("#keyboard-shift").hide();
}

function selfPlay() {
  var numNotes = 100;
  var letters = $(".letter:visible");

  var inc = 200;
  var delay = inc;
  for (var i = 0; i < numNotes; i++) {
    var letterIndex = Math.floor(Math.random() * letters.length);
    var letter = $(letters[letterIndex]);
    var note_matches = letter.attr("id").match(/(\d+)/);
    var note = parseInt((note_matches || [])[0], 10);

    if (note) {
      delayNote(note, delay);

      delay += Math.floor(Math.random() * inc) + inc;
    }
  }
}

function generateKeyboards() {
  new Keyboard();

  // no keyboard input in watch mode
  if (location.pathname.indexOf("watch") != -1) {
    selfPlay();
    return;
  }

  $(document).keypress(function(e) {
    if (e.shiftKey) {
      $("#keyboard-normal").hide();
      $("#keyboard-shift").show();

    } else {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }

    delayNote(e.charCode, 0);
  });

  $(document).keyup(function(e) {
    if (!e.shiftKey) {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }
  });
}

$(document).ready(function() {
  if (location.pathname.length == 37 || location.pathname.indexOf("watch") != -1) {
    generateKeyboards();
  }

  var faces = $(".face-button");
  faces.fadeTo(50, 0.2);

  faces.mouseover(function(e) {
    var target = $(e.target);

    target.fadeTo(50, 1.0);
  });

  faces.mouseout(function(e) {
    var target = $(e.target);
    if (!target.data("selected")) {
      target.fadeTo(50, 0.2);
    }
  });

  faces.click(function(e) {
    var target = $(e.target);

    faces.map(function(i, el) {
      var face = $(el);
      if (e.target != el) {
        face.fadeTo(50, 0.2);
        face.data("selected", false);
      }
    });

    target.data("selected", true);

    target.fadeTo(50, 1.0);
  });
});
