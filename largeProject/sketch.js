let paperImg;
let fishImg;
let imgW, imgH;

let particles = [];
let numParticles = 5;

let worldWidth = 1000;
let worldHeight = 600;
let worldX = 0;
let worldY = 0;
function preload(){
  streetVideo = createVideo(['assets/street.mp4']);
  streetVideo.size (800, 500);
  streetVideo.loop();
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for(let i=0; i<numParticles; i++)
  {
   particles.push(new Particle());
}
  mainCharacter = new Fish();
}

function draw() {
  background(220);
  push();
  translate(worldX, worldY);
  image(streetVideo, 0, 0, worldWidth, worldHeight);

  for (let i=0; i<particles.length; i++)
  {
    particles[i].update();
    particles[i].display();
  }
  mainCharacter.display();
  mainCharacter.update();
  pop();



  let navigationSpeed = 2;
  if(keyIsPressed == true)
  {
    if(key == "a")
    {
      //worldX += navigationSpeed;
      mainCharacter.moveLeft();
    }
    else if (key == "d")
    {
      //worldX -= navigationSpeed;
      mainCharacter.moveRight();
    }
    else if (key == "w")
    {
      //worldY += navigationSpeed;
    }
    else if (key == "s")
    {
      //worldY -= navigationSpeed;
    }
  }

}

class Particle{
  constructor(){
    this.x = random(0, width);
    this.y = random(0, height);
    this.speedX = random(-1, 1);
    this.dia = 20
  }
  update(){
    this.x += this.speedX;

    // bounce
    if(this.x > worldWidth-this.dia/2 || this.x < this.dia/2){
      this.speedX = -this.speedX;
    }
  }
  display(){
    push();
    translate(this.x, this.y);

    circle(0, 0, this.dia);

    pop();
  }
}

class Fish{
  constructor(){
    this.x = 200;
    this.y = 200;
    this.speed = 2;
    this.angle = 0;
  }
  update(){

  }
  display(){
    push();
    translate(this.x,this.y);

    rotate(radians(this.angle));
    circle (0, 0, 50);

    fill("red");
    circle(0, 0, 5);
    pop()
  }
  moveRight()
  {
    this.x += this.speed;
    worldX -= this.speed;
    this.angle = 90;
  }
  moveLeft()
  {
    this.x -= this.speed;
    worldX += this.speed;
    this.angle = 270;
  }
}