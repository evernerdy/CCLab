let dancer1;
function setup() {
    let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  dancer1 = new eversdancer(400, 250);
}

function draw() {
  background(220);
  dancer1.update();
  dancer1.display();
}

class eversdancer
  {
    constructor (startX, startY)
    {
      this.x = startX;
      this.y = startY;
      this.scaleFactor = 2;
      
    }
    update()
    {
      let dance = false;
      let movement = 2*sin(0.01*frameCount);
      if (movement>= 1.8 || movement <= -1.8)
        {
      this.dance = false;
      this.x = this.x+movement;
        }
      else
        {
          this.dance = true;
        }
    }
    display()
    {
      push();
      translate(this.x, this.y);
      scale (this.scaleFactor);
      this.body();
      this.saliva();
    }
    body()
    {
      push();
      strokeWeight(0);
      //eyeball rotate
      let rotateA;
      let rotateB;
      //leg rotate
      let rotateC;
      let rotateD;
      //body shake
      let shake1;
      let shake2;
      //arms shake
      let shake3;
      let shake4;
      if (this.dance == true)
        {
        //color
        let rA = random (100, 255);
        let rB = random (100, 255);
        let rC = random (100, 255);
        fill(rA, rB, rC);
        stroke (rA, rB, rC);
        rotateA = -14+5*sin(0.1*frameCount);
        rotateB = -5 +5*cos(0.1*frameCount);
        rotateC = random (-5, 5);
        rotateD = random (-5);
        //mouth shake
        shake1 = random (-3, 3);
        shake2 = random (-3, 3);
        shake3 = random (-10, 10);
        shake4 = random (-10, 10);
  
        }
      else
        {
        fill (0);
        stroke(0);
         rotateA = -16;
         rotateB = -10;
          rotateC = 5*sin(0.1*frameCount);
          rotateD = 5*cos(0.1*frameCount);
        shake1 = random (-1, 1);
        shake2 = random (-1, 1);
        shake3 = 0;
        shake4 = 0;
        }
      translate (shake1, shake2);
      //body
      ellipse (0, 30, 70, 40);
      //face
      circle (0, 0, 50);
      //arms
      triangle (-45+shake3, 0+shake4+rotateD, -55+shake4, 33+shake3+rotateD, -15+shake3, 20+shake4+rotateD);
      rect (25+rotateC, 15+shake3, 20+shake4, 30+shake3);
      //legs
      strokeWeight(20);
      point (-30+rotateC,40+rotateD);
      point (25-rotateC, 45-rotateD);
      //eyes
      strokeWeight(0);
      fill (255);
      circle (-14, -5, 20);
      circle (14, 5, 20);
      //eyeball
      fill (0);
      circle (rotateA, rotateB, 10);
      circle (-rotateA, -rotateB, 10);
      //mouth
      fill (255, 120, 120);
      ellipse (0, 15, 8, 20);
      pop();
    }
    saliva()
    {
      push();
      let salivaShake = random (-10, 10);
      strokeWeight (5);
       stroke(180, 180, 255);
      if (this.dance == false)
        {
        let shake1 = random (-1, 1);
          let shake2 = random (-1, 1);
        line(2+shake1, 22+shake2, 2+shake1, 40+shake2);
        }
      else
        {
        let shake1 = random (-3, 3);
        let shake2 = random (-3, 3);
        line(2+shake1, 22+shake2, 2+shake1+100*sin(0.3*frameCount), 80+shake2+100*cos(0.3*frameCount));
        }
    }
  }