let basket = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  // add one single egg
  // let egg = new Egg(100, 100);
  // basket.push(egg);

  for (let i=0; i <100; i ++)
  {
    let egg = new Egg (100, 100);
    basket.push(egg);
  }
}

function draw() {
  background("lightGreen");
  for (let i=0; i<basket.length; i++)
  {
  basket[i].update();
  basket[i].display();
  }
}

class Egg{
  constructor(startx,starty){
    this.x = startx;
    this.y = starty;
    this.diax = 80;
    this.diay = 130;
    this.speedx = random (-2,2);
    this.speedy = random (-2,2);
    this.scaleFactor = random (0.3,1);
  }
  update(){
    this.x = this.x + this.speedx;
    this.y = this.y + this.speedy;
    if(this.x > 800){
      this.speedx = -this.speedx;
    }
    if(this.x < 0){
      this.speedx = -this.speedx;
    }
    if(this.y > 500){
      this.speedy = -this.speedy;
    }
    if(this.y < 0){
      this.speedy = -this.speedy;
    }
  }
  display(){
    push();
    translate(this.x,this.y);
    scale(this.scaleFactor);
    // fill("yellow");
    noStroke();
    fill(255,200)
    //UPPER HALF
    arc(0,0,this.diax,this.diay,PI,2*PI);

    //LOWER HALF
    arc(0,0,this.diax,this.diax,0,PI);
    pop();
  }
}

function mousePressed(){
  let egg = new Egg (mouseX, mouseY);
  basket.push(egg);
}