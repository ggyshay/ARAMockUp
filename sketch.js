var p1, p2, p3, p4;
var p1d, p2d, p3d, p4d;
var grid;
var menu;
var files;
var s1;
var padDiv;

function setup(){
  createCanvas(600, 400);

  files = ['assets/Bass.wav', 'assets/Chords.wav', 'assets/CloseHat.wav', 'assets/kick.wav', 'assets/OpenHat.wav', 'assets/Snare.wav']

  p1 = new pad(300, 100);
  p2 = new pad(500, 100);
  p3 = new pad(300, 300);
  p4 = new pad(500, 300);
  grid = new Array();
  grid.push(p1);
  grid.push(p2);
  grid.push(p3);
  grid.push(p4);

  p1.load('assets/kick.wav');
  p2.load('assets/Snare.wav');
  p3.load('assets/Bass.wav');
  p4.load('assets/Chords.wav');

  //versao valida pra lista toda de arquivos de entrada
  for (var i =0; i < files.length; i++){
    var tmpP = createP(files[i].substring(7, files[i].length-4));
    tmpP.position(30, 40 + 25*i);
    tmpP.attribute("draggable", "true");
    tmpP.attribute("src", files[i]);
    tmpP.attribute('ondragstart',  'drag(event)');
    tmpP.attribute('id', 'drag' + i);
    tmpP.style('color', '#909090');
    //tmpP.style('margin', '200px');
    tmpP.style('padding', '5px');
    tmpP.style('background-color', 'powderblue');


    p1d = createDiv('');
    p2d = createDiv('');
    p3d = createDiv('');
    p4d = createDiv('');

    p1d.position(205, 7);
    p1d.size(180, 180);
    p1d.style('padding', '10px')
    p1d.attribute('onclick', 'p1.cue()');
    padDiv.attribute('ondrop', 'drop(event)');
    padDiv.attribute('ondragover', "allowDrop(event)");
    padDiv.position(10, 410);
    padDiv.style('border','1px solid black');
    padDiv.attribute('id', 'drop1');
    padDiv.attribute('src', '');

    p2d.position(405, 7);
    p2d.size(180, 180);
    p2d.style('padding', '10px')
    p2d.attribute('onclick', 'p2.cue()');

    p3d.position(205, 207);
    p3d.size(180, 180);
    p3d.style('padding', '10px')
    p3d.attribute('onclick', 'p3.cue()');

    p4d.position(405, 207);
    p4d.size(180, 180);
    p4d.style('padding', '10px')
    p4d.attribute('onclick', 'p4.cue()');

    p1d.style('border', '2px solid black');
    p2d.style('border', '2px solid black');
    p3d.style('border', '2px solid black');
    p4d.style('border', '2px solid black');
  }

  //recebe arquivos
  padDiv = createDiv();
  padDiv.attribute('ondrop', 'drop(event)');
  padDiv.attribute('ondragover', "allowDrop(event)");
  padDiv.position(10, 410);
  padDiv.style('border','1px solid black');
  padDiv.attribute('id', 'drop1');
  padDiv.attribute('src', '');


}

function draw(){
  background(51);
  stroke(255);
  line(200, 200, 600, 200);
  line(400, 0, 400, 400);
  line(200, 0, 200, 400);
  if (floor(millis())%2000 < 16){
    console.log("CLOCK");
    for (var i = 0; i < grid.length; i++){
      if(grid[i].waiting)grid[i].toggle();
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

// function mouseClicked(){
//   for(var i = 0; i < grid.length; i++){
//     grid[i].mouseOver(grid[i].cue);
//   }
// }

function pad(x, y){
  this.on = false;
  this.waiting = false;
  this.sound = null;
  this.x = x;
  this.y = y;
  var self = this;
  this.l = 200;

  this.load = function(s){
    this.sound = loadSound(s);
  }
  this.toggle = function(){
    if (this.on){
      this.sound.stop();
      this.waiting = false;
      this.on = false;
    }
    else{
      this.on = true;
      this.sound.loop(0, 0, 0, 0, 8);
      this.waiting = false;
    }
  }
  this.cue = function(){
    if(self.waiting) self.waiting = false;
    else self.waiting = true;
  }
  this.render = function(){
    if(this.waiting){
      noStroke();
      fill(100, 0, 200);
      ellipse(this.x, this.y, 30, 30);
    }
    else if (this.on){
      noStroke();
      fill(255, 0, 100);
      ellipse (this.x, this.y, 30, 30);
    }
  }
  this.mouseOver = function(f){
    if(mouseX < this.x + this.l/2 && mouseX > this.x - this.l/2 && mouseY < this.y + this.l/2 && mouseY > this.y - this.l/2) f();
  }
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
