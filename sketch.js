var grid;
// var menu;
var files;

var n = 4;

function setup(){
  createCanvas(600, 400);

  files = ['assets/Bass.wav', 'assets/Chords.wav', 'assets/CloseHat.wav', 'assets/kick.wav', 'assets/OpenHat.wav', 'assets/Snare.wav']

  grid = new Array();

  for (var i = 0; i < n*n; i++){
    var tmpP = new pad(200 + i%n * (width - 200)/n, floor(i/n)*height/n, i);
    grid.push(tmpP);
  }
  //versao valida pra lista toda de arquivos de entrada
  for (var i = 0; i < files.length; i++){
    var tmpP = createP(files[i].substring(7, files[i].length-4));
    tmpP.position(30, 40 + 25*i);
    tmpP.attribute("draggable", "true");
    tmpP.attribute("src", files[i]);
    tmpP.attribute('ondragstart',  'drag(event)');
    tmpP.attribute('id', 'drag' + i);
    tmpP.style('color', '#909090');
    tmpP.style('padding', '5px');
    tmpP.style('background-color', 'powderblue');
  }

}

function draw(){
  background(51);
  stroke(255);
  line(200, 0, 200, 400);
  if (floor(millis())%2000 < 16){
    //console.log("CLOCK");
    for (var i = 0; i < grid.length; i++){
      if(grid[i].waiting) grid[i].toggle();
    }
  }
  for (var i = 0; i < grid.length; i++){
    grid[i].render();
  }
  noStroke();
  fill(180);
  textSize(22);
  text("Samples", 10, 25);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.getAttribute('src'));//ao invez de passar o id, vou passar o src
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.setAttribute('src', data);
    console.log(ev.target.getAttribute('src'));
}

function createStyle(positionX, positionY, width, height, border){
  var s = "position: absolute; left: " + positionX + "px; top: " + positionY + "px; width:" + width + "px; height:" + height + "px; ";
  if(border) s += "border: 1px solid white;";
  return s;
}
