function pad(x, y, index) {
  this.element = document.createElement('div');
  document.body.appendChild(this.element);

  this.on = false;
  this.waiting = false;

  this.sound = null;
  this.x = x + 7;
  this.y = y + 7;
  this.index = index;
  var self = this;
  this.l = height / n;
  this.alert = createP("No sound loaded");
  this.alert.elt.style = "position: absolute; left: " + (this.x + this.l / 2 - 50) + "px; top: " + (this.y + this.l / 2 - 20) + "px; background: #808080";

  this.element.style = createStyle(this.x, this.y, this.l, this.l, true);
  this.element.setAttribute('ondrop', 'drop(event)');
  this.element.setAttribute('ondragover', "allowDrop(event)");
  this.element.setAttribute('id', 'drop' + index);
  this.element.setAttribute('src', '');
  this.element.addEventListener("click", this, false);
  this.element.addEventListener("drop", this, false);

  this.load = function(s) {
    console.log('loaded:' + s);
    this.sound = loadSound(s);
    this.alert.hide();
  }

  this.toggle = function() {
    if (this.hasSound()) {
      if (this.on) {
        this.sound.stop();
      } else {
        this.sound.loop(0, 0, 0, 0, 8);
      }
      this.on = !this.on;
      this.waiting = false;
    }
  }

  this.cue = function(clicked) {
    self.waiting = !self.waiting;
    if (clicked) {
      var data = {
        index: this.index
      }
      socket.emit('cueS', data);
      console.log("cue sent");
    }
    else{
      console.log("cue received");
    }
  }

  this.render = function() {
    if (this.waiting) {
      noStroke();
      fill(100, 0, 200);
      ellipse(this.x + this.l / 2, this.y + this.l / 2, 30, 30);
    } else if (this.on) {
      noStroke();
      fill(255, 0, 100);
      ellipse(this.x + this.l / 2, this.y + this.l / 2, 30, 30);
    }
  }

  this.hasSound = function() {
    return this.sound != null;
  }
}

pad.prototype.handleEvent = function(e) {
  switch (e.type) {
    case "click":
      {
        this.cue(true);
        break;
      }
    case "drop":
      {
        if (this.on) {
          this.toggle();
        }
        this.load(this.element.getAttribute("src"));
        break;
      }
    default:
      {
        console.log("Unbound Operation");
        break
      }
      // add other event types if needed
  }
}
