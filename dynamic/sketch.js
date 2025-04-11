let num = 1;
let particles = [];
function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  
}

function draw() {
  background(100, 3);
   for (let i=0; i< num; i++)
    {
  particles.push(new particle)
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
  
}

class particle
  {
    constructor()
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
      if (this.x >= 400)
        {
          this.canvas = false;
        }
    }
    display()
    {
      push();
      translate (400, 250);
      rotate(0.1*frameCount);
      translate (this.x, this.y);
      strokeWeight (this.weight);
      stroke (0, this.darkness);
      line (0, 0, this.a, this.b);
      stroke (255, 255-this.darkness);
      line (0, 0, this.c, this.d);
      pop();
    }
    
  }