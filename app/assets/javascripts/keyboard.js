function Note(key) {
  var data = [];

  console.log(key);
  for (var i = 0; i < 1000; i++) {
    data[i] = key + Math.random() + 128;
    data[i] = 64+Math.round(32*(Math.cos(i*i/2000)+Math.sin(i*i/4000)));
  }

  var wave = new RIFFWAVE(data);
  wave.header.sampleRate = 44100;
  wave.header.numChannels = 2;

  var audio = new Audio(wave.dataURI);
  audio.play();
}


function Keyboard() {
  var rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"],
    ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"]
  ];

  $.each(rows, function(i, keys) {
    console.log(keys);
    var row = $("#main").append("<div></div>").append("<ul></ul>").addClass(".letters-row");
    $.each(keys, function(j, key) {
      var id = "letter-" + key.charCodeAt(0);
      row.append("<li class=\"letter\" id=\"" + id + "\">" + key + "</li>");
      console.log(key);
    });
  });

}
