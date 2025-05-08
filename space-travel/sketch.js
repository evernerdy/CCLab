let stars = [];
let transition2=0;
function setup() {
  
  let canvas = createCanvas(windowWidth, windowHeight); // fullscreen!
  canvas.parent("p5-canvas-container");
  // p.push(new Poi())
}

function draw() {
  background(0);

  transition2 += 1;
 stroke("green");
 text (transition2, 400, 250);
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
}


class Star{
  constructor(){
    this.s = 0.02
    this.a = random(360)
    this.originX = mouseX;
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
