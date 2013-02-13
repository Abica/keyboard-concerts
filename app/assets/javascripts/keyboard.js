function Note(key) {
  var data = [];

  var sampleRateHz = 44100;
  var numNotes = 1000;

  var baseFreq = function(index) {
    var r = 2 * Math.PI * 440.0 * Math.pow(2, (key - 69) / 12.0) / sampleRateHz;
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

    var keyboard = $("#main").append("<div id=\"keyboard-" + state + "\">" + html + "</div>");
  });

  $("#keyboard-shift").hide();
}

function generateKeyboards() {
  new Keyboard();
  $(document).keypress(function(e) {
    if (e.shiftKey) {
      $("#keyboard-normal").hide();
      $("#keyboard-shift").show();

    } else {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }

    var note = e.charCode;
    new Note(note);
    var node = $("#letter-" + note);

    node.fadeTo(50, 0.2).fadeTo(50, 1.0);
  });

  $(document).keyup(function(e) {
    if (!e.shiftKey) {
      $("#keyboard-normal").show();
      $("#keyboard-shift").hide();
    }
  });
}

$(document).ready(function() {
  if (location.pathname.length == 37) {
    generateKeyboards();
  }
});
