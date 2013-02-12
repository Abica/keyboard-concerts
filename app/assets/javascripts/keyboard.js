function Note(key) {
  var data = [];
  console.log(key);
  for (var i = 0; i < 1000; i++) {
    data[i] = key;
  }

  var wave = new RIFFWAVE(data);
  var audio = new Audio(wave.dataURI);
  audio.play();
}
