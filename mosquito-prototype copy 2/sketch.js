let balls = [];
let num=1;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(20, 20, 50, 10);

  for (i=0;i<num;i++)
    {
    balls.push(new Ball (400, 250))
    }
  
  // display all balls
  for(let i = 0; i < balls.length; i++){
    balls[i].update();
    balls[i].checkOffCanvas();
    balls[i].display();
  }

  for (let i=balls.length-1; i>=0;i--)
  {
    if(balls[i].canvas == false)
    {
      balls.splice(i,1);
    }
  }


  // text on canvas
  fill(255);
  textSize(20)
  text("number of balls in array: " + balls.length, 20, 40)
}

class Ball{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
    this.size = random(20, 50);
    this.canvas = true;
  }
  update(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  checkOffCanvas()
  {
    if (this.x>=800 || this.x<=0 || this.y >=500 || this.y<=0)
    {
      this.canvas = false;
    }
  }
  display(){
    push();
    translate (this.x, this.y);
    rotate (frameCount);
    translate(0, 100);
    stroke(255, 200);
    line(0, 0, 0, this.size);
    pop();
  }

}




