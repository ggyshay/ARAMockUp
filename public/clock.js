class Clock {
  constructor(x, y, r) {
    //position and size
    this.x = x;
    this.y = y;
    this.r = r;

    //time keepers
    this.angle = 0;
    this.time = null;
    this.startTime = null;

    //filter to shine on beats
    this.ints = 1;
  }

  update(t) {
    if (this.time) {
      let x = (t - this.startTime) % this.time;
      x = 4 * x / this.time;
      this.angle = x * HALF_PI - HALF_PI;
    } else {
      alert("clock bpm not set");
    }

    this.ints *= 0.9;
  }

  render() {
    //clock's base
    noStroke();
    fill(100);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);

    //main pie
    noStroke();
    fill(255, 0, 255);
    arc(this.x, this.y, this.r * 2, this.r * 2, -HALF_PI, this.angle, PIE);

    // grey pie over main pie
    fill(100);
    arc(this.x, this.y, this.r, this.r, -HALF_PI, this.angle, PIE);

    //beat keeper
    noStroke();
    fill(100 + 155 * this.ints, 100 - 100 * this.ints, 100 + 155 * this.ints);
    ellipse(this.x, this.y, this.r / 2, this.r / 2);

    //ellipse around beat keeper
    stroke(255, 20);
    noFill();
    ellipse(this.x, this.y, this.r / 2, this.r / 2);

    if ((this.angle + HALF_PI) % HALF_PI < 0.2) {
      this.ints = 1;
    }

  }

  start() {
    this.startTime = millis();
  }

  setBPM(b) {
    this.time = 240000 / b;
  }
}