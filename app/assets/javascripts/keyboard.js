function Note(key) {
  var data = [];

  console.log(key);
  for (var i = 0; i < 1000; i++) {
    data[i] = key;
  }

  var wave = new RIFFWAVE(data);
  wave.header.sampleRate = 44100;
  wave.header.numChannels = 2;

  var audio = new Audio(wave.dataURI);
  audio.play();
}


function Keyboard() {
  var keyboards = {
    normal: [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
             ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
             ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
             ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]],

             /*
    shift:  [["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
             ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}"],
             ["A", "S", "D", "F", "G", "H", "J", "K", "L", ":", "\""],
             ["Z", "X", "C", "V", "B", "N", "M", "<", ">", "?"]]
             */
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
}
