let num = 1;
let particles1 = [];
let particles2 = [];
let speedP=0.03;
function setup() {
    let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(100, 3);
  //particles1
   for (let i=0; i< num; i++)
    {
  particles1.push(new particle1)
    }
  
  for (i=0; i<particles1.length; i++)
    {
  particles1[i].display();
  particles1[i].checkOffCanvas();
  particles1[i].update();
    }
  for (let i=particles1.length-1; i>=0; i--)
    {
  if (particles1[i].canvas == false)
    {
      particles1.splice (i, 1);
    }
    }
  
  //particles2
  if (speedP >= 0.07)
    {
      speedP =0.03;
    }
  else
    {
      speedP += 0.0001;
    }
   for (let i=0; i< num; i++)
    {
  particles2.push(new particle2(speedP))
    }
  
  for (i=0; i<particles2.length; i++)
    {
  particles2[i].display();
  particles2[i].checkOffCanvas();
  particles2[i].update();
    }
  for (let i=particles2.length-1; i>=0; i--)
    {
  if (particles2[i].canvas == false)
    {
      particles2.splice (i, 1);
    }
    }
  
}

class particle1
  {
    constructor()
    {
      //basic
      this.x = -50;
      this.y = random (-50, 550);
      this.size = 1;
      this.darkness = random (0, 100);
      
      //speed
      this.speedx;
      this.speedy;
      this.noiseValue;
      this.noiseSpeed = 0;
      this.randomNoise = random (-10000, 10000);
      this.canvas = true;
      
    }
    update()
    {
      this.weight -= 0.01;
      this.noiseSpeed += 0.1;
      this.noiseValue = noise (this.noiseSpeed+this.randomNoise);
      this.speedy = map (this.noiseValue, 0, 1, -5, 5);
      this.y += this.speedy;
      this.x += 1;
    }
    checkOffCanvas()
    {
      if (this.x >=mouseX-200 || this.x >= 850)
        {
          this.canvas = false;
        }
    }
    display()
    {
      push();
      translate (this.x, this.y);
      stroke (0, this.darkness);
      line (0, 0, -100, 100);
      stroke (255, 255-this.darkness);
      line (0, 0, 100, 100);
      pop();
    }
    
  }

class particle2
  {
    constructor(startSpeed)
    {
      //basic
      this.x = 30;
      this.y = 30;
      this.size = 1;
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
      this.weight = 2;
      this.canvas = true;
      this.speedr = startSpeed;
      this.rotateP = this.speedr*frameCount;
    }
    update()
    {
      this.weight -= 0.01;
      this.noiseSpeed += 0.1;
      this.noiseValue = noise (this.noiseSpeed+this.randomNoise);
      this.speedy = map (this.noiseValue, 0, 1, -5, 5);
      this.y += this.speedy;
      this.x += 1;
    }
    checkOffCanvas()
    {
      if (this.x >= 200)
        {
          this.canvas = false;
        }
    }
    display()
    {
      push();
      translate (mouseX, mouseY);
      rotate(this.rotateP);
      translate (this.x, this.y);
      strokeWeight (this.weight);
      stroke (0, this.darkness);
      line (0, 0, this.a, this.b);
      stroke (255, 255-this.darkness);
      line (0, 0, this.c, this.d);
      pop();
    }
  }
