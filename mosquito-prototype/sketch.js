let Mosquitos = [];
let worldWidth = 2000;
let worldHeight = 1200;
let worldX = 300;
let worldY = 0;
let scaleM = 0.5;
let startGame = 0;
let blood;
let soundRate = 1;
let chapter1 = false;
let transition1 = 0;
let chapter2 = false;
let chapter3 = false;

//chapter2
let stars = [];
let transition2=0;

//chapter3
let endSoundPlay = false;
let num = 4;
let particles = [];
let eyesNum;

function preload()
{
  bgSound = loadSound ("assets/mosquitoSound.wav");
  endSound = loadSound ("assets/distorted.wav");
}
function setup() {
    let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  for (let i = 0; i < 510; i++) {
    Mosquitos[i] = new Mosquito();
  }
}

function draw() {
  if (startGame == false)
    {
      push();
      background(255, 100);
      textAlign(CENTER, CENTER);
      textSize(80);
      strokeWeight(10);
      stroke(0);
      text ("MOSQUITO", 400, 250);
      strokeWeight(5);
      let textS = sin(0.05*frameCount);
      let textC = map (textS, -1, 1, 30, 40);
      textSize (textC);
      text ("CLICK TO START", 400, 350);
      pop();
    }
  if (startGame == true && chapter2 == false &&chapter3 == false)
    {
      chapter1 = true;
    }
  //chapter1
  if (chapter1 == true)
    {
      push();
      bgSound.rate(soundRate);
  soundRate = map (Mosquitos.length, 0, 510, 3, 0.3);
  blood = 255-0.5*Mosquitos.length;
  background(255, 255-blood, 255-blood, 255-blood);
  strokeWeight(1);
  stroke(0);
  text(Mosquitos.length, 20, 20);

  push();
  translate(-mouseX + worldX, -mouseY + worldY);
  scale(scaleM);

  rectMode(CORNER);
  backgroundM();
  rectMode(CENTER);

  // Corrected mouse
  let correctedMouseX = (2*mouseX - worldX) / scaleM;
  let correctedMouseY = (2*mouseY - worldY) / scaleM;
  for (let i = 0; i < Mosquitos.length; i++) {
    Mosquitos[i].update();
    Mosquitos[i].distanceCheck(correctedMouseX, correctedMouseY);
    Mosquitos[i].checkOffCanvas();
    Mosquitos[i].display();
  }

  pop(); // end world transformations

  // Remove dead mosquitos
  for (let i = Mosquitos.length - 1; i >= 0; i--) {
    if (Mosquitos[i].offCanvas == true) {
      Mosquitos.splice(i, 1);
    }
  }
    

  // Navigation keys
  let navigationSpeed = 4;

  if (keyIsDown(65)) { // A
  if (worldX <= 400) {
    worldX += navigationSpeed;
  }
}
if (keyIsDown(87)) { // W
  if (scaleM <= 1.3) {
    scaleM += 0.01;
  }
}
if (keyIsDown(68)) { // D
  if (worldX >= 200) {
    worldX -= navigationSpeed;
  }
}
if (keyIsDown(83)) { // S
  if (scaleM >= 0.5) {
    scaleM -= 0.01;
  }
}

  

  if (Mosquitos.length<=20)
    {
      worldX = random (-100, 100);
      worldY = random (-100, 100);
      transition1+=1;
    }
  if(transition1 >= 200)
    {
      chapter1 = false;
      chapter2 = true;
    }
      console.log (chapter1);
      pop();
}
  if (chapter2 == true)
    {
      background(0 , 10);
    soundRate = 30;

  transition2 += 1;
 stroke("green");
  if (transition2<=200)
  {
  for(let i = 0; i < 1; i++){
    stars.push(new Star()) 
  }
}
  
  for(let i = 0; i < stars.length; i++){
    stars[i].update();
    stars[i].display();
  }

  // clean
  for (let i=stars.length-1;i>=0;i--)
  {
    if(stars[i].s>3)
    {
      stars.splice(i,1);
    }
  }
      if (transition2 >= 350)
        {
          chapter2 = false;
          chapter3 = true;
        }
    }
  //chapter3
  if (chapter3 == true)
    {
      push();
      if (endSoundPlay == false)
      {
      endSound.loop();
      }
      endSoundPlay == true;
      bgSound.stop();
      background(100, 3);
   for (let i=0; i< num; i++)
    {
      for (let j=0; j<num; j++)
        {
  particles.push(new particle(100+200*i, 62.5+125*j))
        }
    }
  
  for (i=0; i<particles.length; i++)
    {
  particles[i].display();
  particles[i].checkOffCanvas();
  particles[i].update();
    }
  for (let i=particles.length-1; i>=0; i--)
    {
  if (particles[i].canvas == false)
    {
      particles.splice (i, 1);
    }
    }
      
      pop();
    }
}




// Mosquito 
class Mosquito {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.size = random(3, 7);
    this.speedM;
    this.rx = random(0, 10000);
    this.ry = random(0, 10000);
    this.posX;
    this.posY;
    this.colorM = 0;
    this.movement = true;
    this.alive = true;
    this.offCanvas = false;
  }

  update() {
    if (this.alive == true) {
      if (this.movement == true) {
        this.speedM = map(Mosquitos.length, 0, 500, 0.01, 0.003);
      } else {
        this.speedM = 0.001;
      }

      let nx = noise(this.rx + this.speedM * frameCount);
      let ny = noise(this.ry + this.speedM * frameCount);

      this.posX = map(nx, 0, 1, 0, worldWidth);
      this.posY = map(ny, 0, 1, 0, worldHeight);

    }
  }

  distanceCheck(mx, my) {
    let distance = dist(this.posX, this.posY, mx, my);
    if (distance < 133) {
      this.movement = false;
      this.colorM = "red";
      if (mouseIsPressed) {
        this.alive = false;
      }
    } else {
      this.movement = true;
      this.colorM = 0;
    }
    if (this.alive == false) {
        this.speedM = 0;
        this.colorM = "red";
        let speedFall = 6;
        this.posY += speedFall;
      }
  }

  checkOffCanvas() {
    if (
      this.posY >= worldHeight-200 ||
      this.posY <= 0 ||
      this.posX >= worldWidth ||
      this.posX <= 0
    ) {
      this.offCanvas = true;
    }
  }

  display() {
    push();
    noStroke();
    fill(this.colorM);
    translate(this.posX, this.posY);
    textSize(this.size);
    text("死", this.x, this.y);
    pop();
  }
}

// Background 
function backgroundM() {
  push();
  fill(0);
  noStroke();
  rect(-800, worldHeight - 200, 4000, 2000);
  pop();
}
//chapter2 stars
class Star{
  constructor(){
    this.s = 0.02
    this.a = random(360)
    this.originX = 0;
   // variable point
  }
  update(){
    this.s *= 1.04
    // keep turning vision
    this.originX = lerp(this.originX, width/2, 0.02);
  }
  display(){
    push()
    translate(this.originX, height/2)
    rotate(radians(this.a))
    scale(this.s)

    //noStroke();
    fill (255);
    stroke(255);
    textSize(10);
    line (0, 100, 0, 200);
    text ("MOSQUITO", 0, 200);
    pop()
  }
}

//chapter3 particles
class particle
  {
    constructor(sX, sY)
    {
      //basic
      this.startX = sX;
      this.startY = sY;
      this.x = 400;
      this.y = 0;
      this.size = 0.4;
      this.darkness = random (0, 100);
      
      //speed
      this.speedx;
      this.speedy;
      this.noiseValue;
      this.noiseSpeed = 0;
      this.randomNoise = random (-10000, 10000);
      //length
      this.a = random (-100, 0);
      this.b = random (0, 100);
      this.c = random (0, 100);
      this.d = random (0, 100);
      this.weight = 3;
      this.canvas = true;
      this.rotateP = 0.07*frameCount + random (0, 2*PI);
      this.speedC = -100;
    }
    update()
    {
      this.speedC += 1;
      this.weight -= 0.01;
      this.noiseSpeed += 0.1;
      this.noiseValue = noise (this.noiseSpeed+this.randomNoise);
      this.speedy = map (this.noiseValue, 0, 1, -5, 5);
      this.y = lerp (this.y, this.speedC, 0.02);
      this.x = lerp (this.x, this.speedC, 0.01);
    }
    checkOffCanvas()
    {
      if (this.speedC >= 50)
        {
          this.canvas = false;
        }
    }
    display()
    {
      push();
      let rotateQ = frameCount;
      translate (this.startX, this.startY);
      rotate(this.rotateP);
      scale(this.size);
      translate (this.x, this.y);
      strokeWeight (this.weight);
      stroke (0, this.darkness);
      line (0, 0, this.a, this.b);
      stroke (255, 255-this.darkness);
      line (0, 0, this.c, this.d);
      let rBlue = random();
      if (rBlue >= 0.99)
        {
          stroke ("blue");
          line (0, 0, this.a, this.b);
        }
      pop();
    }
  }

function mousePressed()
{
  if (startGame == false)
  {
    bgSound.loop();
  }
  startGame = true;
}
