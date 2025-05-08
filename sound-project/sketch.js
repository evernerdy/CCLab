let bghue;
let instruments = [];

let beep;

let interacted = false;

function preload()
{
beep = loadSound ("assets copy/sounds/beat.mp3")

}
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  colorMode(HSB);

  bghue = random(255);
}

function draw() {
  background(bghue, 180, 30);
  //instruments.push(new Instrument(200, 200));
  if (interacted == true)
  {
  for(let i = 0; i < instruments.length; i++){
    instruments[i].update();
    instruments[i].display();
  }
}
}


class Instrument{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;

    this.possibleSize = [10, 30, 50, 70, 90];
    this.size = random (this.possibleSize);
    this.strokeThickness = this.size;
    this.dia = 1;

    this.diaGoal = 100;
    this.speedX = random(-4, 4);
    this.speedY = random(-4, 4);

    this.myHue = random(0, 50);

    this.myRate = map (this.size, 10, 90, 5, 0.1);
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < this.size/2 || this.x > width+this.size/2){
      this.speedX = -this.speedX;
      beep.rate(this.myRate);
      beep.play();
    }
    if(this.y < this.size/2 || this.y > height+this.size/2){
      this.speedY = -this.speedY;
      beep.rate(this.myRate);
      beep.play();
    }
    
    this.dia = lerp(this.dia, this.diaGoal, 0.2);
  }
  display(){
    push();
    translate(this.x, this.y);
    noFill();
    stroke(this.myHue, 255, 255);
    strokeWeight(this.strokeThickness);

    circle(0, 0, this.dia);

    pop();
  }
  checkIfClicked(){
    let d = dist (this.x, this.y, mouseX, mouseY);
    if (d < this.size/2){
      this.myHue = random(100, 200);
    }


  }
}

function mousePressed()
{


  interacted = true;

  for (let i=0; i<instruments.length; i++)
  {
    instruments[i].checkIfClicked();
  }
}

function keyPressed(){
  if (key == " ")
  {
    if (mouseX >=50 && mouseX <= 750 && mouseY>= 50 && mouseY <= 450)
  {
  interacted = true;
  let a = new Instrument(mouseX, mouseY);
  instruments.push(a);
  }
  }
}